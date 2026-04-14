
-- Create listing_overrides table for admin content edits
CREATE TABLE public.listing_overrides (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  listing_type text NOT NULL,
  listing_id text NOT NULL,
  field_overrides jsonb NOT NULL DEFAULT '{}'::jsonb,
  updated_by uuid NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE(listing_type, listing_id)
);

-- Enable RLS
ALTER TABLE public.listing_overrides ENABLE ROW LEVEL SECURITY;

-- Admin-only policies
CREATE POLICY "Admins can view all overrides"
ON public.listing_overrides FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert overrides"
ON public.listing_overrides FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin') AND auth.uid() = updated_by);

CREATE POLICY "Admins can update overrides"
ON public.listing_overrides FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete overrides"
ON public.listing_overrides FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Public read for applying overrides on frontend
CREATE POLICY "Anyone can read overrides for display"
ON public.listing_overrides FOR SELECT
TO public
USING (true);

-- Trigger for updated_at
CREATE TRIGGER update_listing_overrides_updated_at
BEFORE UPDATE ON public.listing_overrides
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();
