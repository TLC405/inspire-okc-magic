
CREATE TABLE public.scan_results (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  scan_type text NOT NULL,
  findings jsonb DEFAULT '[]'::jsonb,
  upgrade_ideas jsonb DEFAULT '[]'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.scan_results ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view scan results"
  ON public.scan_results FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Service role can insert scan results"
  ON public.scan_results FOR INSERT
  TO public
  WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "Service role can update scan results"
  ON public.scan_results FOR UPDATE
  TO public
  USING (auth.role() = 'service_role');

CREATE POLICY "Service role can delete scan results"
  ON public.scan_results FOR DELETE
  TO public
  USING (auth.role() = 'service_role');
