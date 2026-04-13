import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";

const imageMemoryCache = new Map<string, string | null>();
const pendingRequests = new Map<string, Promise<string | null>>();

export function useListingImage(
  listingType: string,
  listingId: string,
  name: string,
  options?: { category?: string; location?: string; websiteUrl?: string }
) {
  const cacheKey = `${listingType}:${listingId}`;
  const [imageUrl, setImageUrl] = useState<string | null>(
    imageMemoryCache.get(cacheKey) ?? null
  );
  const [loading, setLoading] = useState(!imageMemoryCache.has(cacheKey));

  const fetchImage = useCallback(async (): Promise<string | null> => {
    // Check memory cache
    if (imageMemoryCache.has(cacheKey)) {
      return imageMemoryCache.get(cacheKey) ?? null;
    }

    // Dedupe concurrent requests
    if (pendingRequests.has(cacheKey)) {
      return pendingRequests.get(cacheKey)!;
    }

    const promise = (async () => {
      try {
        // Check manual override first
        const { data: override } = await supabase
          .from("media_overrides")
          .select("image_url")
          .eq("listing_type", listingType)
          .eq("listing_id", listingId)
          .maybeSingle();

        if (override?.image_url) {
          imageMemoryCache.set(cacheKey, override.image_url);
          return override.image_url;
        }

        // Check DB cache
        const { data: cached } = await supabase
          .from("image_cache")
          .select("image_url")
          .eq("listing_type", listingType)
          .eq("listing_id", listingId)
          .order("quality_score", { ascending: false })
          .limit(1)
          .maybeSingle();

        if (cached?.image_url) {
          imageMemoryCache.set(cacheKey, cached.image_url);
          return cached.image_url;
        }

        // Call edge function
        const { data, error } = await supabase.functions.invoke("image-search", {
          body: {
            name,
            listingType,
            listingId,
            category: options?.category,
            location: options?.location || "Oklahoma City, OK",
            websiteUrl: options?.websiteUrl,
          },
        });

        if (error) {
          console.error("Image search error:", error);
          imageMemoryCache.set(cacheKey, null);
          return null;
        }

        const url = data?.imageUrl || null;
        imageMemoryCache.set(cacheKey, url);
        return url;
      } catch (e) {
        console.error("Image fetch error:", e);
        imageMemoryCache.set(cacheKey, null);
        return null;
      } finally {
        pendingRequests.delete(cacheKey);
      }
    })();

    pendingRequests.set(cacheKey, promise);
    return promise;
  }, [cacheKey, listingType, listingId, name, options?.category, options?.location, options?.websiteUrl]);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetchImage().then((url) => {
      if (!cancelled) {
        setImageUrl(url);
        setLoading(false);
      }
    });
    return () => { cancelled = true; };
  }, [fetchImage]);

  return { imageUrl, loading };
}
