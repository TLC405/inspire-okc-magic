import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    if (!LOVABLE_API_KEY) {
      return new Response(JSON.stringify({ error: "AI not configured" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // Check if we have fresh cache (less than 6 hours old)
    const { data: cached } = await supabase
      .from("wire_feed_cache")
      .select("id")
      .gte("expires_at", new Date().toISOString())
      .limit(1);

    if (cached && cached.length > 0) {
      return new Response(JSON.stringify({ status: "cached", message: "Wire feed is still fresh" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Clear expired cache
    await supabase.from("wire_feed_cache").delete().lt("expires_at", new Date().toISOString());

    // Generate fresh headlines via AI
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
            content: `You are a wire service editor for Oklahoma City. Generate 20 fresh, realistic news headlines about OKC. Mix categories: THUNDER WIRE, COMET WATCH, CITY HALL, ARTS & CULTURE, BUSINESS, FOOD & DRINK, COMMUNITY, WEATHER DESK, TRANSIT, HEALTH, TECH, EDUCATION, REAL ESTATE, PARKS DESK. Each headline should be 15-30 words, factual-sounding, and specific to Oklahoma City. Use the tool provided to return structured data.`,
          },
          {
            role: "user",
            content: `Generate 20 fresh OKC wire headlines for today, ${new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}.`,
          },
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "publish_headlines",
              description: "Publish wire feed headlines",
              parameters: {
                type: "object",
                properties: {
                  headlines: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        category: { type: "string" },
                        headline: { type: "string" },
                      },
                      required: ["category", "headline"],
                    },
                  },
                },
                required: ["headlines"],
              },
            },
          },
        ],
        tool_choice: { type: "function", function: { name: "publish_headlines" } },
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("AI gateway error:", response.status, errText);
      return new Response(JSON.stringify({ error: "AI generation failed" }), {
        status: 502,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const result = await response.json();
    const toolCall = result.choices?.[0]?.message?.tool_calls?.[0];

    if (!toolCall) {
      return new Response(JSON.stringify({ error: "No headlines generated" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const parsed = JSON.parse(toolCall.function.arguments);
    const headlines = parsed.headlines || [];

    if (headlines.length === 0) {
      return new Response(JSON.stringify({ error: "Empty headlines" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Insert into cache
    const expiresAt = new Date(Date.now() + 6 * 60 * 60 * 1000).toISOString();
    const rows = headlines.map((h: { category: string; headline: string }) => ({
      headline: h.headline,
      category: h.category,
      expires_at: expiresAt,
    }));

    const { error: insertError } = await supabase.from("wire_feed_cache").insert(rows);

    if (insertError) {
      console.error("Insert error:", insertError);
      return new Response(JSON.stringify({ error: "Failed to cache headlines" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(
      JSON.stringify({ status: "ok", count: headlines.length }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (e) {
    console.error("wire-feed error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
