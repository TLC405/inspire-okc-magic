DROP POLICY "Service role can manage images" ON public.image_cache;

CREATE POLICY "Only service role can insert images"
ON public.image_cache
FOR INSERT
WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "Only service role can update images"
ON public.image_cache
FOR UPDATE
USING (auth.role() = 'service_role');

CREATE POLICY "Only service role can delete images"
ON public.image_cache
FOR DELETE
USING (auth.role() = 'service_role');