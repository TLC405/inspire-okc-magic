import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    // Verify admin
    const authHeader = req.headers.get("Authorization");
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const anonKey = Deno.env.get("SUPABASE_ANON_KEY")!;

    const supabaseAdmin = createClient(supabaseUrl, serviceKey);

    // Check auth if not a cron call
    const isCron = req.headers.get("x-cron-secret") === serviceKey;
    if (!isCron) {
      if (!authHeader) throw new Error("Unauthorized");
      const token = authHeader.replace("Bearer ", "");
      const userClient = createClient(supabaseUrl, anonKey);
      const { data: { user }, error: authErr } = await userClient.auth.getUser(token);
      if (authErr || !user) throw new Error("Unauthorized");
      const { data: roles } = await supabaseAdmin.from("user_roles").select("role").eq("user_id", user.id).eq("role", "admin");
      if (!roles || roles.length === 0) throw new Error("Admin required");
    }

    const { action, categories } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

    if (action === "scan") {
      // Gather real data for AI analysis
      const { count: imageCount } = await supabaseAdmin.from("image_cache").select("*", { count: "exact", head: true });
      const { count: visitorCount } = await supabaseAdmin.from("visitor_logs").select("*", { count: "exact", head: true });
      const { data: recentVisitors } = await supabaseAdmin.from("visitor_logs").select("ip_address, city, country, page_path, user_agent").order("created_at", { ascending: false }).limit(20);
      const { count: profileCount } = await supabaseAdmin.from("profiles").select("*", { count: "exact", head: true });
      const { count: roleCount } = await supabaseAdmin.from("user_roles").select("*", { count: "exact", head: true });

      const context = `
App: Inspire Oklahoma City - community discovery platform
Database stats:
- image_cache: ${imageCount ?? 0} entries
- visitor_logs: ${visitorCount ?? 0} total visits
- profiles: ${profileCount ?? 0} users
- user_roles: ${roleCount ?? 0} role assignments
Recent visitor IPs: ${recentVisitors?.map(v => v.ip_address).join(", ") || "none"}
Recent pages: ${recentVisitors?.map(v => v.page_path).filter(Boolean).join(", ") || "none"}
User agents: ${[...new Set(recentVisitors?.map(v => v.user_agent?.substring(0, 60)))].slice(0, 5).join("; ") || "none"}

Security features: RLS on all tables, RBAC with admin roles, JWT auth, service-role-only writes.
Tables: image_cache (public read), profiles (own only), user_roles (own+admin read, service write), visitor_logs (admin read, service write), scan_results (admin read, service write), email_send_log, email_send_state, email_unsubscribe_tokens, suppressed_emails.
`;

      if (!LOVABLE_API_KEY) {
        // Return basic scan without AI
        const findings = {
          security: [{ severity: "info", title: "RLS Active", detail: "All tables have row-level security enabled" }],
          content: [{ severity: "info", title: "Static data", detail: "Events data is hardcoded - consider database migration" }],
          links: [{ severity: "info", title: "Image cache", detail: `${imageCount ?? 0} cached images` }],
          events: [{ severity: "info", title: "Data source", detail: "Events loaded from static TypeScript files" }],
        };
        await supabaseAdmin.from("scan_results").insert({ scan_type: "full", findings });
        return new Response(JSON.stringify({ findings }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }

      const aiResp = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
        method: "POST",
        headers: { Authorization: `Bearer ${LOVABLE_API_KEY}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "google/gemini-3.1-pro-preview",
          messages: [
            { role: "system", content: "You are a security and quality auditor for a web app. Analyze the provided context and return findings using the tool." },
            { role: "user", content: `Scan this app for issues:\n${context}\n\nCheck: security gaps, content issues, broken links/images, event data quality. Return 2-4 findings per category with severity (critical/warning/info).` },
          ],
          tools: [{
            type: "function",
            function: {
              name: "report_findings",
              description: "Report scan findings grouped by category",
              parameters: {
                type: "object",
                properties: {
                  security: { type: "array", items: { type: "object", properties: { severity: { type: "string", enum: ["critical", "warning", "info"] }, title: { type: "string" }, detail: { type: "string" } }, required: ["severity", "title", "detail"] } },
                  content: { type: "array", items: { type: "object", properties: { severity: { type: "string", enum: ["critical", "warning", "info"] }, title: { type: "string" }, detail: { type: "string" } }, required: ["severity", "title", "detail"] } },
                  links: { type: "array", items: { type: "object", properties: { severity: { type: "string", enum: ["critical", "warning", "info"] }, title: { type: "string" }, detail: { type: "string" } }, required: ["severity", "title", "detail"] } },
                  events: { type: "array", items: { type: "object", properties: { severity: { type: "string", enum: ["critical", "warning", "info"] }, title: { type: "string" }, detail: { type: "string" } }, required: ["severity", "title", "detail"] } },
                },
                required: ["security", "content", "links", "events"],
              },
            },
          }],
          tool_choice: { type: "function", function: { name: "report_findings" } },
        }),
      });

      if (!aiResp.ok) {
        const status = aiResp.status;
        if (status === 429) return new Response(JSON.stringify({ error: "Rate limited, try again later" }), { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } });
        if (status === 402) return new Response(JSON.stringify({ error: "AI credits exhausted. Add funds in Settings > Workspace > Usage." }), { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } });
        throw new Error(`AI error: ${status}`);
      }

      const aiData = await aiResp.json();
      const toolCall = aiData.choices?.[0]?.message?.tool_calls?.[0];
      const findings = toolCall ? JSON.parse(toolCall.function.arguments) : { security: [], content: [], links: [], events: [] };

      await supabaseAdmin.from("scan_results").insert({ scan_type: "full", findings });
      return new Response(JSON.stringify({ findings }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });

    } else if (action === "upgrades") {
      const cats = categories || ["homepage", "discover", "dating", "operations"];

      if (!LOVABLE_API_KEY) {
        return new Response(JSON.stringify({ error: "AI not configured" }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }

      const aiResp = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
        method: "POST",
        headers: { Authorization: `Bearer ${LOVABLE_API_KEY}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "google/gemini-3.1-pro-preview",
          messages: [
            { role: "system", content: "You are a product advisor for Inspire Oklahoma City, a community discovery platform covering singles events, fitness, volunteering, date nights, and city highlights in OKC. Suggest specific, actionable upgrades." },
            { role: "user", content: `Generate exactly 5 upgrade ideas for each of these categories: ${cats.join(", ")}. Each idea should be specific to this OKC community app. Include difficulty levels.` },
          ],
          tools: [{
            type: "function",
            function: {
              name: "suggest_upgrades",
              description: "Return upgrade ideas grouped by category",
              parameters: {
                type: "object",
                properties: {
                  categories: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        name: { type: "string" },
                        ideas: {
                          type: "array",
                          items: {
                            type: "object",
                            properties: {
                              title: { type: "string" },
                              description: { type: "string" },
                              difficulty: { type: "string", enum: ["easy", "medium", "hard"] },
                            },
                            required: ["title", "description", "difficulty"],
                          },
                        },
                      },
                      required: ["name", "ideas"],
                    },
                  },
                },
                required: ["categories"],
              },
            },
          }],
          tool_choice: { type: "function", function: { name: "suggest_upgrades" } },
        }),
      });

      if (!aiResp.ok) {
        const status = aiResp.status;
        if (status === 429) return new Response(JSON.stringify({ error: "Rate limited, try again later" }), { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } });
        if (status === 402) return new Response(JSON.stringify({ error: "AI credits exhausted. Add funds in Settings > Workspace > Usage." }), { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } });
        throw new Error(`AI error: ${status}`);
      }

      const aiData = await aiResp.json();
      const toolCall = aiData.choices?.[0]?.message?.tool_calls?.[0];
      const upgrades = toolCall ? JSON.parse(toolCall.function.arguments) : { categories: [] };

      await supabaseAdmin.from("scan_results").insert({ scan_type: "upgrades", upgrade_ideas: upgrades });
      return new Response(JSON.stringify(upgrades), { headers: { ...corsHeaders, "Content-Type": "application/json" } });

    } else {
      return new Response(JSON.stringify({ error: "Invalid action. Use 'scan' or 'upgrades'" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }
  } catch (e) {
    console.error("admin-scanner error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: e instanceof Error && e.message === "Unauthorized" ? 401 : 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
