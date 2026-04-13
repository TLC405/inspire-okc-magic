
-- Search intent cache for AI query interpretations
CREATE TABLE public.search_intent_cache (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  query text NOT NULL,
  query_hash text NOT NULL,
  parsed_intent jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  expires_at timestamptz NOT NULL DEFAULT (now() + interval '7 days')
);

CREATE UNIQUE INDEX idx_search_intent_hash ON public.search_intent_cache (query_hash);
CREATE INDEX idx_search_intent_expires ON public.search_intent_cache (expires_at);

ALTER TABLE public.search_intent_cache ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read cached intents"
  ON public.search_intent_cache FOR SELECT
  USING (true);

CREATE POLICY "Service role can insert intents"
  ON public.search_intent_cache FOR INSERT
  WITH CHECK (auth.role() = 'service_role'::text);

CREATE POLICY "Service role can delete intents"
  ON public.search_intent_cache FOR DELETE
  USING (auth.role() = 'service_role'::text);

-- Admin prompt history for meta-learning feedback
CREATE TABLE public.admin_prompt_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  message_id uuid REFERENCES public.admin_chat_messages(id) ON DELETE CASCADE,
  rating smallint NOT NULL CHECK (rating IN (-1, 1)),
  context text,
  query_text text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_prompt_history_user ON public.admin_prompt_history (user_id);
CREATE INDEX idx_prompt_history_rating ON public.admin_prompt_history (rating);

ALTER TABLE public.admin_prompt_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view own feedback"
  ON public.admin_prompt_history FOR SELECT TO authenticated
  USING (auth.uid() = user_id AND has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can insert own feedback"
  ON public.admin_prompt_history FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id AND has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Service role can delete feedback"
  ON public.admin_prompt_history FOR DELETE
  USING (auth.role() = 'service_role'::text);
