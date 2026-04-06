
CREATE TABLE public.visitor_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ip_address text NOT NULL,
  city text,
  region text,
  country text,
  latitude double precision,
  longitude double precision,
  user_agent text,
  page_path text,
  referrer text,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.visitor_logs ENABLE ROW LEVEL SECURITY;

-- Edge function (service role) can insert
CREATE POLICY "Service role can insert visitor logs"
  ON public.visitor_logs FOR INSERT
  TO public
  WITH CHECK (auth.role() = 'service_role');

-- Admins can read
CREATE POLICY "Admins can view visitor logs"
  ON public.visitor_logs FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Service role can delete (cleanup)
CREATE POLICY "Service role can delete visitor logs"
  ON public.visitor_logs FOR DELETE
  TO public
  USING (auth.role() = 'service_role');
