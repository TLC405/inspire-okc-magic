import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { feedItems } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");

    const feedContext = (feedItems || [])
      .map((f: any, i: number) => `${i + 1}. ${f.title}: ${f.content || ""}`)
      .join("\n");

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
            content: `You are a civic journalist for Oklahoma City. Write a city briefing in a warm, editorial broadsheet style. Include:
- A compelling headline
- 2-3 paragraph briefing covering the most interesting items
- Mention specific neighborhoods, venues, or organizations when relevant
- End with a forward-looking note about what's coming up

Return JSON with "title" and "content" fields. The content should be markdown.`,
          },
          {
            role: "user",
            content: `Write a city briefing from these recent items:\n\n${feedContext || "No feed items available. Write a general OKC city update briefing."}`,
          },
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "create_briefing",
              description: "Create a city briefing with title and content",
              parameters: {
                type: "object",
                properties: {
                  title: { type: "string", description: "Compelling headline for the briefing" },
                  content: { type: "string", description: "Markdown content of the briefing, 2-3 paragraphs" },
                },
                required: ["title", "content"],
                additionalProperties: false,
              },
            },
          },
        ],
        tool_choice: { type: "function", function: { name: "create_briefing" } },
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limited. Try again in a moment." }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted. Please add funds." }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI error:", response.status, t);
      throw new Error("AI generation failed");
    }

    const result = await response.json();
    const toolCall = result.choices?.[0]?.message?.tool_calls?.[0];
    if (toolCall?.function?.arguments) {
      const parsed = JSON.parse(toolCall.function.arguments);
      return new Response(JSON.stringify(parsed), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Fallback: try to parse content directly
    const content = result.choices?.[0]?.message?.content || "";
    return new Response(JSON.stringify({ title: "City Briefing", content }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("newsroom-draft error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
