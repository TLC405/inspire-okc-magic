import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const GROQ_TIMEOUT_MS = 25000;

const SYSTEM_PROMPT = `You are INSPIRE Intelligence — the editorial AI for Inspire Oklahoma City.

PLATFORM CONTEXT:
- 6 directories: Singles (Speed Dating & Mixers only), Fitness, Volunteering, Events, Date Nights, Discover
- Events page excludes Date Night, Speed Dating, Mixer categories — those have dedicated pages
- Brand voice: broadsheet journalism — serious, editorial, warm. No emoji in copy. No Gen-Z humor.
- Visual identity: newspaper metaphor with Playfair Display, double-rules, datelines, skeuo cards
- 3 themes: Signal (dark, default), Editorial (warm sepia), Raw (monochrome)
- Triple-verification system with confidence scores on all listings
- All AI calls use Pro models, never Flash

ARCHITECTURE:
- React 18 + Vite 5 + Tailwind CSS v3 + TypeScript 5 + Supabase (Lovable Cloud)
- Static data files for listings: singlesEvents.ts, fitnessSpots.ts, volunteerOrgs.ts, cityShowcase.ts
- Edge functions: admin-scanner (audits), image-search (photos), log-visitor (analytics), singles-ai, process-email-queue, admin-chat (you)
- Tables: visitor_logs, user_roles, profiles, image_cache, newsletter_subscribers, scan_results, admin_chat_messages, admin_settings
- Master admin: inspirelawton@gmail.com (hardcoded, auto-granted)

CONTENT STATS:
- Singles events include Speed Dating and Mixer categories
- Fitness spots span 29+ categories across all OKC districts
- Volunteer orgs cover food banks, shelters, environment, mentoring, arts
- City showcase: 100 facts across architecture, policy, sustainability, culture, growth

RULES:
- Never suggest features that duplicate existing pages
- Always reference real OKC venues and neighborhoods when possible
- Prioritize mobile-first design suggestions
- Focus on creative, non-obvious improvements
- When suggesting copy, match the editorial newspaper voice
- Keep responses focused and actionable
- Use markdown formatting for readability`;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "No authorization header" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Verify admin
    const supabaseUser = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
      { global: { headers: { Authorization: authHeader } } }
    );
    const { data: { user }, error: userError } = await supabaseUser.auth.getUser();
    if (userError || !user) {
      return new Response(JSON.stringify({ error: "Invalid token" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { data: roles } = await supabaseUser.from("user_roles").select("role").eq("user_id", user.id).eq("role", "admin");
    if (!roles || roles.length === 0) {
      return new Response(JSON.stringify({ error: "Admin access required" }), {
        status: 403,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { messages, customInstructions } = await req.json();
    if (!messages || !Array.isArray(messages)) {
      return new Response(JSON.stringify({ error: "messages array required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const GROQ_API_KEY = Deno.env.get("GROQ_API_KEY");
    if (!GROQ_API_KEY) {
      return new Response(JSON.stringify({ error: "AI not configured — GROQ_API_KEY missing" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const systemContent = customInstructions
      ? `${SYSTEM_PROMPT}\n\nADMIN CUSTOM INSTRUCTIONS:\n${customInstructions}`
      : SYSTEM_PROMPT;

    let response: Response;
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), GROQ_TIMEOUT_MS);

      response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "meta-llama/llama-4-scout-17b-16e-instruct",
          messages: [
            { role: "system", content: systemContent },
            ...messages,
          ],
          stream: true,
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        return new Response(JSON.stringify({ error: "AI request timed out. Please try again." }), {
          status: 504,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      throw error;
    }

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limited. Try again in a moment." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted. Add funds in Settings > Workspace > Usage." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("Groq API error:", response.status, t);
      return new Response(JSON.stringify({ error: "AI provider error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("admin-chat error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
