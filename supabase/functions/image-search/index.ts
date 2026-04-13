import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const EXTERNAL_TIMEOUT_MS = 12000;
const AI_TIMEOUT_MS = 20000;

async function fetchWithTimeout(url: string, init: RequestInit, timeoutMs: number) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    return await fetch(url, { ...init, signal: controller.signal });
  } finally {
    clearTimeout(timeoutId);
  }
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const body = await req.json().catch(() => ({}));
    const { name, category, location, listingType, listingId, websiteUrl } = body as {
      name?: string;
      category?: string;
      location?: string;
      listingType?: string;
      listingId?: string;
      websiteUrl?: string;
    };

    if (!name || !listingType || !listingId) {
      return new Response(JSON.stringify({ error: "name, listingType, listingId required" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Check cache first
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data: cached } = await supabase
      .from("image_cache")
      .select("image_url, source_url, quality_score")
      .eq("listing_type", listingType)
      .eq("listing_id", listingId)
      .order("quality_score", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (cached) {
      return new Response(JSON.stringify({ success: true, imageUrl: cached.image_url, source: "cache" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Try Firecrawl first if we have a website URL
    const FIRECRAWL_API_KEY = Deno.env.get("FIRECRAWL_API_KEY");
    let imageUrl: string | null = null;
    let sourceUrl: string | null = null;

    if (FIRECRAWL_API_KEY && websiteUrl) {
      try {
        console.log("Scraping website for images:", websiteUrl);
        const scrapeRes = await fetchWithTimeout(
          "https://api.firecrawl.dev/v1/scrape",
          {
            method: "POST",
            headers: { "Authorization": `Bearer ${FIRECRAWL_API_KEY}`, "Content-Type": "application/json" },
            body: JSON.stringify({ url: websiteUrl, formats: ["links", "screenshot"], onlyMainContent: true }),
          },
          EXTERNAL_TIMEOUT_MS
        );

        if (scrapeRes.ok) {
          const scrapeData = await scrapeRes.json();
          const links: string[] = scrapeData.data?.links || scrapeData.links || [];
          const imgLinks = links.filter((l: string) =>
            /\.(jpg|jpeg|png|webp)/i.test(l) && !/logo|icon|favicon|sprite|banner-ad/i.test(l)
          );
          if (imgLinks.length > 0) {
            imageUrl = imgLinks[0];
            sourceUrl = websiteUrl;
          }
        }
      } catch (e) {
        console.error("Firecrawl scrape error:", e);
      }
    }

    // Fallback: Use Firecrawl web search for images
    if (!imageUrl && FIRECRAWL_API_KEY) {
      try {
        const searchQuery = `${name} ${location || "Oklahoma City"} ${category || ""} photo`;
        console.log("Firecrawl search for:", searchQuery);
        const searchRes = await fetchWithTimeout(
          "https://api.firecrawl.dev/v1/search",
          {
            method: "POST",
            headers: { "Authorization": `Bearer ${FIRECRAWL_API_KEY}`, "Content-Type": "application/json" },
            body: JSON.stringify({ query: searchQuery, limit: 5 }),
          },
          EXTERNAL_TIMEOUT_MS
        );

        if (searchRes.ok) {
          const searchData = await searchRes.json();
          const results = searchData.data || [];
          for (const r of results) {
            if (r.markdown) {
              const imgMatch = r.markdown.match(/!\[.*?\]\((https?:\/\/[^\s)]+\.(jpg|jpeg|png|webp)[^\s)]*)\)/i);
              if (imgMatch) {
                imageUrl = imgMatch[1];
                sourceUrl = r.url;
                break;
              }
            }
          }
        }
      } catch (e) {
        console.error("Firecrawl search error:", e);
      }
    }

    // Final fallback: Use Groq AI to suggest a known image URL
    if (!imageUrl) {
      const GROQ_API_KEY = Deno.env.get("GROQ_API_KEY");
      if (GROQ_API_KEY) {
        try {
          const aiRes = await fetchWithTimeout(
            "https://api.groq.com/openai/v1/chat/completions",
            {
              method: "POST",
              headers: { Authorization: `Bearer ${GROQ_API_KEY}`, "Content-Type": "application/json" },
              body: JSON.stringify({
                model: "meta-llama/llama-4-scout-17b-16e-instruct",
                messages: [
                  { role: "system", content: "You find real, publicly accessible image URLs for businesses and places. Return ONLY a direct image URL (jpg/png/webp) that is publicly accessible. If you cannot find one with high confidence, return NONE." },
                  { role: "user", content: `Find a real photo URL for: ${name} in ${location || "Oklahoma City, OK"}. Category: ${category || "business"}. ${websiteUrl ? `Website: ${websiteUrl}` : ""}` },
                ],
              }),
            },
            AI_TIMEOUT_MS
          );

          if (aiRes.ok) {
            const aiData = await aiRes.json();
            const content = aiData.choices?.[0]?.message?.content?.trim() || "";
            if (content && content !== "NONE" && /^https?:\/\/.+\.(jpg|jpeg|png|webp)/i.test(content)) {
              imageUrl = content;
              sourceUrl = "ai-suggested";
            }
          }
        } catch (e) {
          console.error("AI fallback error:", e);
        }
      }
    }

    // Cache the result
    if (imageUrl) {
      await supabase.from("image_cache").insert({
        listing_type: listingType,
        listing_id: listingId,
        image_url: imageUrl,
        source_url: sourceUrl,
        quality_score: sourceUrl === "ai-suggested" ? 30 : sourceUrl === websiteUrl ? 80 : 60,
      });
    }

    return new Response(JSON.stringify({
      success: true,
      imageUrl: imageUrl || null,
      source: imageUrl ? "fresh" : "none",
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("image-search error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
