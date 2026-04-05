CREATE TABLE public.image_cache (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  listing_type text NOT NULL,
  listing_id text NOT NULL,
  image_url text NOT NULL,
  source_url text,
  quality_score integer DEFAULT 50,
  fetched_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_image_cache_listing ON public.image_cache (listing_type, listing_id);
CREATE INDEX idx_image_cache_fetched ON public.image_cache (fetched_at);

ALTER TABLE public.image_cache ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view cached images"
ON public.image_cache
FOR SELECT
USING (true);

CREATE POLICY "Service role can manage images"
ON public.image_cache
FOR ALL
USING (true)
WITH CHECK (true);