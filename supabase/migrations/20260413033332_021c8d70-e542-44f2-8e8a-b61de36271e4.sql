
CREATE TABLE public.briefings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL DEFAULT '',
  category TEXT NOT NULL DEFAULT 'city',
  published BOOLEAN NOT NULL DEFAULT true,
  pinned BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.briefings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view published briefings"
ON public.briefings FOR SELECT
USING (published = true);

CREATE POLICY "Admins can view all briefings"
ON public.briefings FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert briefings"
ON public.briefings FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin') AND auth.uid() = user_id);

CREATE POLICY "Admins can update briefings"
ON public.briefings FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete briefings"
ON public.briefings FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_briefings_updated_at
BEFORE UPDATE ON public.briefings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

ALTER PUBLICATION supabase_realtime ADD TABLE public.briefings;
