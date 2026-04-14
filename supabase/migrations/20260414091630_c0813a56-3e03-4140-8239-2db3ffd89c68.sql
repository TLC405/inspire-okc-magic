
CREATE TABLE public.wire_feed_cache (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  headline text NOT NULL,
  category text NOT NULL DEFAULT 'city',
  generated_at timestamp with time zone NOT NULL DEFAULT now(),
  expires_at timestamp with time zone NOT NULL DEFAULT (now() + interval '6 hours'),
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.wire_feed_cache ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read wire feed cache"
ON public.wire_feed_cache FOR SELECT
TO public USING (true);

CREATE POLICY "Service role can insert wire feed"
ON public.wire_feed_cache FOR INSERT
TO public WITH CHECK (auth.role() = 'service_role'::text);

CREATE POLICY "Service role can delete wire feed"
ON public.wire_feed_cache FOR DELETE
TO public USING (auth.role() = 'service_role'::text);

CREATE INDEX idx_wire_feed_cache_expires ON public.wire_feed_cache (expires_at);
