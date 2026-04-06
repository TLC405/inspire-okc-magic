import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

async function aiDiscover(query: string, apiKey: string) {
  const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "google/gemini-3.1-pro-preview",
      messages: [
        {
          role: "system",
          content: `You are a research assistant specialized in finding real, verified singles events in Oklahoma City. 
Only return events you have high confidence are real and currently active.
Return structured JSON via the tool call.`,
        },
        {
          role: "user",
          content: query || "Find all active singles events, speed dating, mixers, and social gatherings currently running in Oklahoma City, OK.",
        },
      ],
      tools: [
        {
          type: "function",
          function: {
            name: "return_events",
            description: "Return discovered singles events",
            parameters: {
              type: "object",
              properties: {
                events: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      name: { type: "string" },
                      organizer: { type: "string" },
                      venue: { type: "string" },
                      neighborhood: { type: "string" },
                      frequency: { type: "string" },
                      price: { type: "string" },
                      category: { type: "string" },
                      ageRange: { type: "string" },
                      description: { type: "string" },
                      sourceUrl: { type: "string" },
                      sourceProvider: { type: "string" },
                      confidenceScore: { type: "number" },
                      evidenceNotes: { type: "string" },
                    },
                    required: ["name", "organizer", "venue", "category", "description", "sourceUrl", "confidenceScore"],
                  },
                },
              },
              required: ["events"],
            },
          },
        },
      ],
      tool_choice: { type: "function", function: { name: "return_events" } },
    }),
  });

  if (!response.ok) return { events: [], status: response.status };
  const data = await response.json();
  const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];
  if (toolCall?.function?.arguments) {
    return { events: JSON.parse(toolCall.function.arguments).events, status: 200 };
  }
  return { events: [], status: 200 };
}

async function firecrawlSearch(query: string, apiKey: string) {
  try {
    const res = await fetch("https://api.firecrawl.dev/v1/search", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({ query, limit: 10, scrapeOptions: { formats: ["markdown"] } }),
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.data || [];
  } catch (e) {
    console.error("Firecrawl search error:", e);
    return [];
  }
}

async function aiExtractEvents(markdown: string, sourceUrl: string, apiKey: string) {
  try {
    const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "google/gemini-3.1-pro-preview",
        messages: [
          { role: "system", content: "Extract singles events from this webpage content. Only extract real, specific events with dates/venues. Return via tool call." },
          { role: "user", content: `Source: ${sourceUrl}\n\n${markdown.slice(0, 4000)}` },
        ],
        tools: [{
          type: "function",
          function: {
            name: "extract_events",
            description: "Extract events found on page",
            parameters: {
              type: "object",
              properties: {
                events: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      name: { type: "string" },
                      organizer: { type: "string" },
                      venue: { type: "string" },
                      neighborhood: { type: "string" },
                      frequency: { type: "string" },
                      price: { type: "string" },
                      category: { type: "string" },
                      description: { type: "string" },
                      confidenceScore: { type: "number" },
                    },
                    required: ["name", "venue", "description", "confidenceScore"],
                  },
                },
              },
              required: ["events"],
            },
          },
        }],
        tool_choice: { type: "function", function: { name: "extract_events" } },
      }),
    });
    if (!res.ok) return [];
    const data = await res.json();
    const tc = data.choices?.[0]?.message?.tool_calls?.[0];
    if (tc?.function?.arguments) {
      const parsed = JSON.parse(tc.function.arguments);
      return (parsed.events || []).map((e: any) => ({ ...e, sourceUrl, sourceProvider: new URL(sourceUrl).hostname }));
    }
    return [];
  } catch (e) {
    console.error("AI extract error:", e);
    return [];
  }
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { action, query } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    if (action === "discover") {
      const FIRECRAWL_API_KEY = Deno.env.get("FIRECRAWL_API_KEY");

      // Run AI knowledge search and Firecrawl web search in parallel
      const aiPromise = aiDiscover(query, LOVABLE_API_KEY);

      const firecrawlPromise = FIRECRAWL_API_KEY
        ? Promise.all([
            firecrawlSearch("Oklahoma City singles events speed dating 2026", FIRECRAWL_API_KEY),
            firecrawlSearch("OKC mixer social singles meetup events", FIRECRAWL_API_KEY),
          ]).then(([r1, r2]) => [...r1, ...r2])
        : Promise.resolve([]);

      const [aiResult, firecrawlResults] = await Promise.all([aiPromise, firecrawlPromise]);

      if (aiResult.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limited. Please try again in a moment." }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (aiResult.status === 402) {
        return new Response(JSON.stringify({ error: "Credits exhausted. Add funds at Settings > Workspace > Usage." }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      // Extract events from Firecrawl results using AI
      let scrapedEvents: any[] = [];
      if (firecrawlResults.length > 0) {
        const extractPromises = firecrawlResults
          .filter((r: any) => r.markdown && r.url)
          .slice(0, 5)
          .map((r: any) => aiExtractEvents(r.markdown, r.url, LOVABLE_API_KEY));
        const extracted = await Promise.all(extractPromises);
        scrapedEvents = extracted.flat();
      }

      // Merge and deduplicate
      const allEvents = [...(aiResult.events || []), ...scrapedEvents];
      const seen = new Set<string>();
      const deduped = allEvents.filter((e: any) => {
        const key = e.name?.toLowerCase().replace(/\s+/g, "");
        if (!key || seen.has(key)) return false;
        seen.add(key);
        return true;
      });

      return new Response(JSON.stringify({
        success: true,
        events: deduped,
        sources: { ai: aiResult.events?.length || 0, firecrawl: scrapedEvents.length },
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (action === "verify") {
      const { eventName, sourceUrl, organizer } = await req.json();
      const FIRECRAWL_API_KEY = Deno.env.get("FIRECRAWL_API_KEY");

      // Try to actually scrape the source URL with Firecrawl
      let pageContent = "";
      let pageAccessible = false;
      if (FIRECRAWL_API_KEY && sourceUrl) {
        try {
          const scrapeRes = await fetch("https://api.firecrawl.dev/v1/scrape", {
            method: "POST",
            headers: { Authorization: `Bearer ${FIRECRAWL_API_KEY}`, "Content-Type": "application/json" },
            body: JSON.stringify({ url: sourceUrl, formats: ["markdown"], onlyMainContent: true }),
          });
          if (scrapeRes.ok) {
            const scrapeData = await scrapeRes.json();
            pageContent = scrapeData.data?.markdown || scrapeData.markdown || "";
            pageAccessible = true;
          }
        } catch (e) {
          console.error("Verify scrape error:", e);
        }
      }

      // AI verification with page content
      const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
        method: "POST",
        headers: { Authorization: `Bearer ${LOVABLE_API_KEY}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "google/gemini-3.1-pro-preview",
          messages: [
            {
              role: "system",
              content: `You verify singles events. Given an event name, organizer, source URL, and optionally scraped page content, determine if this event is real and active. ${pageAccessible ? "Page was successfully scraped." : "Page could NOT be accessed - likely broken."}`,
            },
            {
              role: "user",
              content: `Event: ${eventName}\nOrganizer: ${organizer}\nSource: ${sourceUrl}\n${pageContent ? `\nPage content:\n${pageContent.slice(0, 3000)}` : "\nPage could not be reached."}`,
            },
          ],
          tools: [{
            type: "function",
            function: {
              name: "verification_result",
              description: "Return verification result",
              parameters: {
                type: "object",
                properties: {
                  isVerified: { type: "boolean" },
                  confidenceScore: { type: "number" },
                  status: { type: "string", enum: ["verified", "stale", "broken", "conflict", "unverified"] },
                  notes: { type: "string" },
                  alternateSourceUrl: { type: "string" },
                },
                required: ["isVerified", "confidenceScore", "status", "notes"],
              },
            },
          }],
          tool_choice: { type: "function", function: { name: "verification_result" } },
        }),
      });

      if (!response.ok) {
        const status = response.status;
        if (status === 429) return new Response(JSON.stringify({ error: "Rate limited." }), { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } });
        if (status === 402) return new Response(JSON.stringify({ error: "Credits exhausted." }), { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } });
        throw new Error(`AI gateway error: ${status}`);
      }

      const data = await response.json();
      const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];
      if (toolCall?.function?.arguments) {
        const parsed = JSON.parse(toolCall.function.arguments);
        return new Response(JSON.stringify({ success: true, verification: parsed, pageAccessible }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      return new Response(JSON.stringify({ success: false, error: "No verification result" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ error: "Unknown action. Use 'discover' or 'verify'." }), {
      status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("singles-ai error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
