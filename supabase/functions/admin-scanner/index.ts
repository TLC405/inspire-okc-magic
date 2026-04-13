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
    const GROQ_API_KEY = Deno.env.get("GROQ_API_KEY");

    const safeJson = (body: unknown, status = 200) =>
      new Response(JSON.stringify(body), {
        status,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });

    const createFallbackFindings = (imageCount = 0) => ({
      security: [{ severity: "info", title: "RLS Active", detail: "All tables have row-level security enabled" }],
      content: [{ severity: "info", title: "Static data", detail: "Events data is hardcoded - consider database migration" }],
      links: [{ severity: "info", title: "Image cache", detail: `${imageCount} cached images` }],
      events: [{ severity: "info", title: "Data source", detail: "Events loaded from static TypeScript files" }],
    });

    const fallbackUpgrades = {
      categories: (categories || ["homepage", "discover", "dating", "operations"]).map((name: string) => ({
        name,
        ideas: [
          {
            title: `Refine ${name} editorial hierarchy`,
            description: `Tighten the ${name} section with stronger headlines, clearer grouping, and one primary action above the fold.`,
            difficulty: "easy",
          },
          {
            title: `Add ${name} freshness signals`,
            description: `Show verification dates, recent updates, or staff notes so visitors know the content is current and trustworthy.`,
            difficulty: "medium",
          },
          {
            title: `Create ${name} local discovery loops`,
            description: `Link related Oklahoma City neighborhoods, venues, and recurring themes so users keep exploring instead of bouncing.`,
            difficulty: "medium",
          },
          {
            title: `Introduce ${name} save-and-return behavior`,
            description: `Let admins prioritize a shortlist for future productization, such as saved plans, featured lists, or editorial picks.`,
            difficulty: "hard",
          },
          {
            title: `Build a standout ${name} differentiator`,
            description: `Add one distinctive OKC-specific feature for ${name} that competitors are unlikely to copy quickly.`,
            difficulty: "hard",
          },
        ],
      })),
    };

    const handleAiFailure = async (response: Response, fallbackBody: unknown, scanType: "full" | "upgrades") => {
      const errorText = await response.text();
      console.error("admin-scanner AI error:", response.status, errorText);

      const message = response.status === 429
        ? "AI rate limited. Showing fallback results."
        : response.status === 401
          ? "AI provider key is invalid. Showing fallback results."
          : response.status === 402
            ? "AI credits exhausted. Showing fallback results."
            : "AI provider unavailable. Showing fallback results.";

      if (scanType === "full") {
        await supabaseAdmin.from("scan_results").insert({ scan_type: scanType, findings: fallbackBody });
        return safeJson({ findings: fallbackBody, error: message, fallback: true });
      }

      await supabaseAdmin.from("scan_results").insert({ scan_type: scanType, upgrade_ideas: fallbackBody });
      return safeJson({ ...fallbackBody as Record<string, unknown>, error: message, fallback: true });
    };

    if (action === "scan") {
      // Gather real data for AI analysis
      const { count: imageCount } = await supabaseAdmin.from("image_cache").select("*", { count: "exact", head: true });
      const { count: visitorCount } = await supabaseAdmin.from("visitor_logs").select("*", { count: "exact", head: true });
      const { data: recentVisitors } = await supabaseAdmin.from("visitor_logs").select("ip_address, city, country, page_path, user_agent").order("created_at", { ascending: false }).limit(20);
      const { count: profileCount } = await supabaseAdmin.from("profiles").select("*", { count: "exact", head: true });
      const { count: roleCount } = await supabaseAdmin.from("user_roles").select("*", { count: "exact", head: true });
      const fallbackFindings = createFallbackFindings(imageCount ?? 0);

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

      if (!GROQ_API_KEY) {
        await supabaseAdmin.from("scan_results").insert({ scan_type: "full", findings: fallbackFindings });
        return safeJson({ findings: fallbackFindings, error: "AI provider not configured. Showing fallback results.", fallback: true });
      }

      const aiResp = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: { Authorization: `Bearer ${GROQ_API_KEY}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "meta-llama/llama-4-scout-17b-16e-instruct",
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
        return await handleAiFailure(aiResp, fallbackFindings, "full");
      }

      const aiData = await aiResp.json();
      const toolCall = aiData.choices?.[0]?.message?.tool_calls?.[0];
      const findings = toolCall ? JSON.parse(toolCall.function.arguments) : { security: [], content: [], links: [], events: [] };

      await supabaseAdmin.from("scan_results").insert({ scan_type: "full", findings });
      return safeJson({ findings });

    } else if (action === "upgrades") {
      const cats = categories || ["homepage", "discover", "dating", "operations"];

      if (!GROQ_API_KEY) {
        await supabaseAdmin.from("scan_results").insert({ scan_type: "upgrades", upgrade_ideas: fallbackUpgrades });
        return safeJson({ ...fallbackUpgrades, error: "AI provider not configured. Showing fallback results.", fallback: true });
      }

      const aiResp = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: { Authorization: `Bearer ${GROQ_API_KEY}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "meta-llama/llama-4-scout-17b-16e-instruct",
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
        return await handleAiFailure(aiResp, fallbackUpgrades, "upgrades");
      }

      const aiData = await aiResp.json();
      const toolCall = aiData.choices?.[0]?.message?.tool_calls?.[0];
      const upgrades = toolCall ? JSON.parse(toolCall.function.arguments) : { categories: [] };

      await supabaseAdmin.from("scan_results").insert({ scan_type: "upgrades", upgrade_ideas: upgrades });
      return safeJson(upgrades);

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
