import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.4";
import { corsHeaders } from "https://esm.sh/@supabase/supabase-js@2.49.4/cors";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // Get IP from headers
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
               req.headers.get("cf-connecting-ip") ||
               req.headers.get("x-real-ip") ||
               "unknown";

    const body = await req.json().catch(() => ({}));
    const { page_path, referrer } = body;

    // Geo lookup via free API
    let geo: { city?: string; region?: string; country?: string; lat?: number; lon?: number } = {};
    if (ip !== "unknown" && ip !== "127.0.0.1") {
      try {
        const geoRes = await fetch(`http://ip-api.com/json/${ip}?fields=city,regionName,country,lat,lon`);
        if (geoRes.ok) {
          const g = await geoRes.json();
          geo = { city: g.city, region: g.regionName, country: g.country, lat: g.lat, lon: g.lon };
        }
      } catch { /* skip geo */ }
    }

    await supabase.from("visitor_logs").insert({
      ip_address: ip,
      city: geo.city || null,
      region: geo.region || null,
      country: geo.country || null,
      latitude: geo.lat || null,
      longitude: geo.lon || null,
      user_agent: req.headers.get("user-agent") || null,
      page_path: page_path || null,
      referrer: referrer || null,
    });

    return new Response(JSON.stringify({ ok: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
