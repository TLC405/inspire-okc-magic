import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { content, content_type, content_id } = await req.json();
    if (!content) {
      return new Response(JSON.stringify({ error: "Content is required" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");

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
            content: `You are a content moderator for a civic platform about Oklahoma City. Analyze content for:
- Inappropriate language or hate speech
- Misinformation about city services or events
- Spam or promotional content
- Personal information that should be redacted
- Content that could be harmful to the community

Return your assessment as a structured analysis.`,
          },
          {
            role: "user",
            content: `Analyze this content for moderation:\n\n${content.slice(0, 2000)}`,
          },
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "moderate",
              description: "Provide moderation analysis",
              parameters: {
                type: "object",
                properties: {
                  severity: { type: "string", enum: ["info", "warning", "critical"], description: "How severe the issues are" },
                  explanation: { type: "string", description: "Clear explanation of findings" },
                  should_flag: { type: "boolean", description: "Whether this should be added to the moderation queue" },
                },
                required: ["severity", "explanation", "should_flag"],
                additionalProperties: false,
              },
            },
          },
        ],
        tool_choice: { type: "function", function: { name: "moderate" } },
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limited" }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted" }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      throw new Error("AI moderation failed");
    }

    const result = await response.json();
    const toolCall = result.choices?.[0]?.message?.tool_calls?.[0];
    let modResult = { severity: "info", explanation: "No issues found", should_flag: false };

    if (toolCall?.function?.arguments) {
      modResult = JSON.parse(toolCall.function.arguments);
    }

    // If flagged, insert into moderation queue
    if (modResult.should_flag) {
      const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
      const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
      const adminClient = createClient(supabaseUrl, serviceKey);

      await adminClient.from("moderation_queue").insert({
        content_type: content_type || "unknown",
        content_id: content_id || null,
        content_preview: content.slice(0, 500),
        severity: modResult.severity,
        ai_explanation: modResult.explanation,
        status: "pending",
      });
    }

    return new Response(JSON.stringify(modResult), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("moderate-content error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
