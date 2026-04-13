
-- Hero slides table for editable carousel
CREATE TABLE public.hero_slides (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  subtitle text NOT NULL DEFAULT '',
  cta_text text NOT NULL DEFAULT 'Explore',
  cta_link text NOT NULL DEFAULT '/',
  image_url text NOT NULL DEFAULT '',
  sort_order integer NOT NULL DEFAULT 0,
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.hero_slides ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active hero slides"
  ON public.hero_slides FOR SELECT
  TO public
  USING (active = true);

CREATE POLICY "Admins can view all hero slides"
  ON public.hero_slides FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert hero slides"
  ON public.hero_slides FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update hero slides"
  ON public.hero_slides FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete hero slides"
  ON public.hero_slides FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_hero_slides_updated_at
  BEFORE UPDATE ON public.hero_slides
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Ticker items table for editable wire ticker
CREATE TABLE public.ticker_items (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  headline text NOT NULL,
  link text NOT NULL DEFAULT '/',
  category text NOT NULL DEFAULT 'city',
  active boolean NOT NULL DEFAULT true,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.ticker_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active ticker items"
  ON public.ticker_items FOR SELECT
  TO public
  USING (active = true);

CREATE POLICY "Admins can view all ticker items"
  ON public.ticker_items FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert ticker items"
  ON public.ticker_items FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update ticker items"
  ON public.ticker_items FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete ticker items"
  ON public.ticker_items FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_ticker_items_updated_at
  BEFORE UPDATE ON public.ticker_items
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Enable realtime for both tables
ALTER PUBLICATION supabase_realtime ADD TABLE public.hero_slides;
ALTER PUBLICATION supabase_realtime ADD TABLE public.ticker_items;
