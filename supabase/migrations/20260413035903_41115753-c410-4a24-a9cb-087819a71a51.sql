
-- Site modules: homepage section visibility and ordering
CREATE TABLE public.site_modules (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  section_key text NOT NULL UNIQUE,
  label text NOT NULL,
  visible boolean NOT NULL DEFAULT true,
  sort_order integer NOT NULL DEFAULT 0,
  config jsonb NOT NULL DEFAULT '{}'::jsonb,
  updated_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.site_modules ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view visible modules" ON public.site_modules FOR SELECT USING (visible = true);
CREATE POLICY "Admins can view all modules" ON public.site_modules FOR SELECT TO authenticated USING (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can insert modules" ON public.site_modules FOR INSERT TO authenticated WITH CHECK (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update modules" ON public.site_modules FOR UPDATE TO authenticated USING (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete modules" ON public.site_modules FOR DELETE TO authenticated USING (has_role(auth.uid(), 'admin'));
CREATE TRIGGER update_site_modules_updated_at BEFORE UPDATE ON public.site_modules FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Site copy: editable text blocks
CREATE TABLE public.site_copy (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  copy_key text NOT NULL UNIQUE,
  copy_value text NOT NULL DEFAULT '',
  context text NOT NULL DEFAULT 'general',
  updated_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.site_copy ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read site copy" ON public.site_copy FOR SELECT USING (true);
CREATE POLICY "Admins can insert copy" ON public.site_copy FOR INSERT TO authenticated WITH CHECK (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update copy" ON public.site_copy FOR UPDATE TO authenticated USING (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete copy" ON public.site_copy FOR DELETE TO authenticated USING (has_role(auth.uid(), 'admin'));
CREATE TRIGGER update_site_copy_updated_at BEFORE UPDATE ON public.site_copy FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Media overrides: manual image management per listing
CREATE TABLE public.media_overrides (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  listing_type text NOT NULL,
  listing_id text NOT NULL,
  image_url text NOT NULL,
  status text NOT NULL DEFAULT 'manual',
  notes text,
  updated_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(listing_type, listing_id)
);
ALTER TABLE public.media_overrides ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view media overrides" ON public.media_overrides FOR SELECT USING (true);
CREATE POLICY "Admins can insert overrides" ON public.media_overrides FOR INSERT TO authenticated WITH CHECK (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update overrides" ON public.media_overrides FOR UPDATE TO authenticated USING (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete overrides" ON public.media_overrides FOR DELETE TO authenticated USING (has_role(auth.uid(), 'admin'));
CREATE TRIGGER update_media_overrides_updated_at BEFORE UPDATE ON public.media_overrides FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Feed sources: external data sources
CREATE TABLE public.feed_sources (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  source_url text,
  source_type text NOT NULL DEFAULT 'manual',
  active boolean NOT NULL DEFAULT true,
  last_fetched_at timestamptz,
  config jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.feed_sources ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins can view feed sources" ON public.feed_sources FOR SELECT TO authenticated USING (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can insert feed sources" ON public.feed_sources FOR INSERT TO authenticated WITH CHECK (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update feed sources" ON public.feed_sources FOR UPDATE TO authenticated USING (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete feed sources" ON public.feed_sources FOR DELETE TO authenticated USING (has_role(auth.uid(), 'admin'));
CREATE TRIGGER update_feed_sources_updated_at BEFORE UPDATE ON public.feed_sources FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Feed items: incoming content for editorial review
CREATE TABLE public.feed_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  source_id uuid REFERENCES public.feed_sources(id) ON DELETE SET NULL,
  title text NOT NULL,
  content text NOT NULL DEFAULT '',
  external_url text,
  status text NOT NULL DEFAULT 'pending',
  published_at timestamptz,
  raw_data jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.feed_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view published feed items" ON public.feed_items FOR SELECT USING (status = 'published');
CREATE POLICY "Admins can view all feed items" ON public.feed_items FOR SELECT TO authenticated USING (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can insert feed items" ON public.feed_items FOR INSERT TO authenticated WITH CHECK (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update feed items" ON public.feed_items FOR UPDATE TO authenticated USING (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete feed items" ON public.feed_items FOR DELETE TO authenticated USING (has_role(auth.uid(), 'admin'));
CREATE POLICY "Service role can insert feed items" ON public.feed_items FOR INSERT WITH CHECK (auth.role() = 'service_role');
CREATE TRIGGER update_feed_items_updated_at BEFORE UPDATE ON public.feed_items FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Enable realtime for feed items
ALTER PUBLICATION supabase_realtime ADD TABLE public.feed_items;
