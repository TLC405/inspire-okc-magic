import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const GROQ_TIMEOUT_MS = 25000;

const SYSTEM_PROMPT = `You are the Inspire Oklahoma City Concierge — a knowledgeable, editorial-toned guide to Oklahoma City life.

RULES:
- Answer only about Oklahoma City. If a question is off-topic, politely redirect.
- Use the ENTITY CONTEXT provided to ground your answers in real, verified data.
- Newspaper editorial tone: warm, professional, authoritative. No emoji. No slang.
- Keep answers concise — 2-4 paragraphs maximum.
- When referencing specific places, events, or organizations from the context, name them precisely.
- If the context doesn't contain relevant info, say so honestly and suggest what the user might search for on the site.
- Never fabricate details about specific businesses, events, or organizations not in the context.
- Mention neighborhoods when relevant (Bricktown, Midtown, Paseo, Plaza District, Deep Deuce, etc.)
- The site covers: Singles Events, Fitness Spots, Volunteering, Date Nights, Events, and city discovery.`;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { question, history } = await req.json();
    if (!question || typeof question !== "string" || question.trim().length < 2) {
      return new Response(JSON.stringify({ error: "Question too short" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const GROQ_API_KEY = Deno.env.get("GROQ_API_KEY");
    if (!GROQ_API_KEY) {
      return new Response(JSON.stringify({ error: "AI not configured" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Query knowledge graph for context
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, serviceKey);

    // Extract search terms from question
    const searchTerms = question.trim().split(/\s+/).filter((w: string) => w.length > 2).slice(0, 5);

    // Query entities matching any search term
    let entityContext = "";
    if (searchTerms.length > 0) {
      const orFilter = searchTerms.map((t: string) => `name.ilike.%${t}%,bio.ilike.%${t}%,category.ilike.%${t}%,neighborhood.ilike.%${t}%`).join(",");
      const { data: entities } = await supabase
        .from("entities")
        .select("name, entity_type, bio, neighborhood, category, verified")
        .or(orFilter)
        .limit(20);

      if (entities && entities.length > 0) {
        entityContext = "\n\nENTITY CONTEXT (from the City Knowledge Graph):\n" +
          entities.map((e: any) => `- ${e.name} [${e.entity_type}] ${e.category ? `(${e.category})` : ""} ${e.neighborhood ? `in ${e.neighborhood}` : ""} ${e.verified ? "✓verified" : ""} ${e.bio ? `— ${e.bio}` : ""}`).join("\n");

        // Get relationships for matched entities
        const entityIds = entities.map((e: any) => e.name);
        // Also fetch related entities
        const { data: rels } = await supabase
          .from("entity_relationships")
          .select("source_id, target_id, relationship_type, source:entities!entity_relationships_source_id_fkey(name), target:entities!entity_relationships_target_id_fkey(name)")
          .limit(15);

        if (rels && rels.length > 0) {
          entityContext += "\n\nRELATIONSHIPS:\n" +
            rels.map((r: any) => `- ${(r.source as any)?.name} → ${r.relationship_type} → ${(r.target as any)?.name}`).join("\n");
        }
      }
    }

    // Also get a quick summary of what's on the platform
    const [entityCount, briefingCount] = await Promise.all([
      supabase.from("entities").select("id", { count: "exact", head: true }),
      supabase.from("briefings").select("id", { count: "exact", head: true }).eq("published", true),
    ]);

    const platformSummary = `\n\nPLATFORM STATS: ${entityCount.count || 0} entities in knowledge graph, ${briefingCount.count || 0} published briefings. The site covers Singles Events, Fitness Spots, Volunteering opportunities, Date Night ideas, community Events, and 100+ facts about OKC.`;

    // Build messages
    const messages: any[] = [
      { role: "system", content: SYSTEM_PROMPT + entityContext + platformSummary },
    ];

    // Include conversation history (last 6 messages max)
    if (Array.isArray(history)) {
      for (const msg of history.slice(-6)) {
        if (msg.role === "user" || msg.role === "assistant") {
          messages.push({ role: msg.role, content: msg.content });
        }
      }
    }

    messages.push({ role: "user", content: question });

    // Stream from Groq
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), GROQ_TIMEOUT_MS);

    let aiResp: Response;
    try {
      aiResp = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "meta-llama/llama-4-scout-17b-16e-instruct",
          messages,
          stream: true,
          max_tokens: 1024,
          temperature: 0.7,
        }),
        signal: controller.signal,
      });
    } catch (error) {
      clearTimeout(timeoutId);
      if (error instanceof Error && error.name === "AbortError") {
        return new Response(JSON.stringify({ error: "AI timed out" }), {
          status: 504,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      throw error;
    }
    clearTimeout(timeoutId);

    if (!aiResp.ok) {
      const status = aiResp.status;
      if (status === 429) {
        return new Response(JSON.stringify({ error: "Rate limited — please wait a moment and try again." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      console.error("city-concierge Groq error:", status, await aiResp.text());
      return new Response(JSON.stringify({ error: "AI temporarily unavailable" }), {
        status: 502,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Return the SSE stream directly
    return new Response(aiResp.body, {
      headers: {
        ...corsHeaders,
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
      },
    });
  } catch (e) {
    console.error("city-concierge error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
