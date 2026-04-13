import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const GROQ_TIMEOUT_MS = 15000;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { query } = await req.json();
    if (!query || typeof query !== "string" || query.trim().length < 3) {
      return new Response(JSON.stringify({ error: "Query must be at least 3 characters" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, serviceKey);

    // Check cache first
    const queryHash = await hashQuery(query.trim().toLowerCase());
    const { data: cached } = await supabase
      .from("search_intent_cache")
      .select("parsed_intent, expires_at")
      .eq("query_hash", queryHash)
      .single();

    if (cached && new Date(cached.expires_at) > new Date()) {
      return new Response(JSON.stringify({ intent: cached.parsed_intent, cached: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const GROQ_API_KEY = Deno.env.get("GROQ_API_KEY");
    if (!GROQ_API_KEY) {
      return new Response(JSON.stringify({ error: "AI not configured", intent: null }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

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
          messages: [
            {
              role: "system",
              content: `You interpret search queries for an Oklahoma City community discovery app. The app has three directories:
1. Singles Events (categories: Speed Dating, Mixer, Social, Dance, Activity, Faith, Date Night, Team Building)
2. Fitness Spots (categories: CrossFit, Gym, Yoga, Outdoor, Running, Climbing, Martial Arts, Boxing, Cycling, Swimming, Dance, Pilates, Barre, HIIT, Bootcamp, Pickleball, Tennis, Personal Training, Recovery, Infrared, BJJ, Powerlifting, Mind-Body, Senior/Adaptive, Kids/Family, Aerial, Stretch, Rec Center, Sports Training)
3. Volunteer Orgs (categories: Food, Environment, Housing, Youth, Community, Homelessness, Animals, Health, Arts, Education, Disaster Relief, Veterans)

OKC neighborhoods: Midtown, Bricktown, Paseo, Plaza District, Downtown, Automobile Alley, Deep Deuce, NW Oklahoma City, South Oklahoma City, Edmond, Norman, Moore, Nichols Hills, Uptown 23rd, Film Row, Wheeler District.

Parse the user's natural language query into structured filters.`,
            },
            { role: "user", content: query },
          ],
          tools: [
            {
              type: "function",
              function: {
                name: "parse_search_intent",
                description: "Parse a search query into structured filters",
                parameters: {
                  type: "object",
                  properties: {
                    categories: {
                      type: "array",
                      items: { type: "string" },
                      description: "Matched categories from the directories",
                    },
                    neighborhoods: {
                      type: "array",
                      items: { type: "string" },
                      description: "Matched OKC neighborhoods",
                    },
                    directories: {
                      type: "array",
                      items: { type: "string", enum: ["singles", "fitness", "volunteer"] },
                      description: "Which directories to search",
                    },
                    mood: {
                      type: "string",
                      description: "Inferred mood/vibe (romantic, energetic, social, casual, competitive)",
                    },
                    keywords: {
                      type: "array",
                      items: { type: "string" },
                      description: "Important keywords not captured by categories or neighborhoods",
                    },
                  },
                  required: ["categories", "neighborhoods", "directories", "keywords"],
                },
              },
            },
          ],
          tool_choice: { type: "function", function: { name: "parse_search_intent" } },
        }),
        signal: controller.signal,
      });
    } catch (error) {
      clearTimeout(timeoutId);
      if (error instanceof Error && error.name === "AbortError") {
        return new Response(JSON.stringify({ error: "AI timed out", intent: null }), {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      throw error;
    }
    clearTimeout(timeoutId);

    if (!aiResp.ok) {
      console.error("smart-search AI error:", aiResp.status);
      return new Response(JSON.stringify({ error: "AI unavailable", intent: null }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const aiData = await aiResp.json();
    const toolCall = aiData.choices?.[0]?.message?.tool_calls?.[0];
    const intent = toolCall ? JSON.parse(toolCall.function.arguments) : null;

    // Cache the result
    if (intent) {
      await supabase.from("search_intent_cache").upsert(
        {
          query: query.trim().toLowerCase(),
          query_hash: queryHash,
          parsed_intent: intent,
          expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        },
        { onConflict: "query_hash" }
      );
    }

    return new Response(JSON.stringify({ intent, cached: false }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("smart-search error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

async function hashQuery(query: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(query);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("").slice(0, 32);
}
