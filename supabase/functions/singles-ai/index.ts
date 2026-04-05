import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { action, query } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    if (action === "discover") {
      // AI-powered discovery of singles events in OKC
      const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-3-flash-preview",
          messages: [
            {
              role: "system",
              content: `You are a research assistant specialized in finding real, verified singles events in Oklahoma City. 
              
Your job:
1. Search your knowledge for real singles events, speed dating, mixers, social gatherings in Oklahoma City
2. Only return events you have high confidence are real and currently active
3. Include source URLs that can be verified
4. Return structured JSON

Return a JSON array of objects with these fields:
- name: event name
- organizer: who runs it
- venue: where it happens
- neighborhood: area of OKC
- frequency: how often (Weekly, Monthly, etc.)
- price: cost range
- category: one of "Speed Dating", "Mixer", "Social", "Dance", "Activity", "Faith"
- ageRange: if applicable
- description: 2-3 sentences
- sourceUrl: direct URL to verify
- sourceProvider: website name
- confidenceScore: 0-100 your confidence this is real and active
- evidenceNotes: why you believe this is real

Be extremely strict. If you're not sure something exists, set confidenceScore below 50.`,
            },
            {
              role: "user",
              content: query || "Find all active singles events, speed dating, mixers, and social gatherings currently running in Oklahoma City, OK. Include Meetup groups, Eventbrite events, church singles nights, dance socials, and any other singles-focused gatherings.",
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

      if (!response.ok) {
        const status = response.status;
        if (status === 429) {
          return new Response(JSON.stringify({ error: "Rate limited. Please try again in a moment." }), {
            status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
          });
        }
        if (status === 402) {
          return new Response(JSON.stringify({ error: "Credits exhausted. Add funds at Settings > Workspace > Usage." }), {
            status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
          });
        }
        throw new Error(`AI gateway error: ${status}`);
      }

      const data = await response.json();
      const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];
      if (toolCall?.function?.arguments) {
        const parsed = JSON.parse(toolCall.function.arguments);
        return new Response(JSON.stringify({ success: true, events: parsed.events }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      return new Response(JSON.stringify({ success: false, error: "No structured response from AI" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (action === "verify") {
      // Verify a specific event by analyzing its source URL
      const { eventName, sourceUrl, organizer } = await req.json();

      const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-3-flash-preview",
          messages: [
            {
              role: "system",
              content: `You are a verification agent. Given an event name, organizer, and source URL, determine if this event is real, active, and the source URL is valid.

Return your assessment as structured data.`,
            },
            {
              role: "user",
              content: `Verify this singles event:
Event: ${eventName}
Organizer: ${organizer}
Source URL: ${sourceUrl}

Is this event real and currently active? Is the source URL likely to be valid?`,
            },
          ],
          tools: [
            {
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
            },
          ],
          tool_choice: { type: "function", function: { name: "verification_result" } },
        }),
      });

      if (!response.ok) {
        const status = response.status;
        if (status === 429) {
          return new Response(JSON.stringify({ error: "Rate limited." }), {
            status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
          });
        }
        if (status === 402) {
          return new Response(JSON.stringify({ error: "Credits exhausted." }), {
            status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
          });
        }
        throw new Error(`AI gateway error: ${status}`);
      }

      const data = await response.json();
      const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];
      if (toolCall?.function?.arguments) {
        const parsed = JSON.parse(toolCall.function.arguments);
        return new Response(JSON.stringify({ success: true, verification: parsed }), {
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
