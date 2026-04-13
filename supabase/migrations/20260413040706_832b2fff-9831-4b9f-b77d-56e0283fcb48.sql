
-- ============================================
-- ENTITIES (City Knowledge Graph)
-- ============================================
CREATE TABLE public.entities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  entity_type text NOT NULL DEFAULT 'place',
  bio text DEFAULT '',
  neighborhood text,
  category text,
  lat double precision,
  lng double precision,
  verified boolean DEFAULT false,
  metadata jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE public.entities ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view entities" ON public.entities FOR SELECT USING (true);
CREATE POLICY "Admins can insert entities" ON public.entities FOR INSERT TO authenticated WITH CHECK (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can update entities" ON public.entities FOR UPDATE TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can delete entities" ON public.entities FOR DELETE TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));

CREATE TRIGGER update_entities_updated_at BEFORE UPDATE ON public.entities FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ============================================
-- ENTITY ALIASES
-- ============================================
CREATE TABLE public.entity_aliases (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  entity_id uuid NOT NULL REFERENCES public.entities(id) ON DELETE CASCADE,
  alias text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE public.entity_aliases ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view aliases" ON public.entity_aliases FOR SELECT USING (true);
CREATE POLICY "Admins can insert aliases" ON public.entity_aliases FOR INSERT TO authenticated WITH CHECK (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can update aliases" ON public.entity_aliases FOR UPDATE TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can delete aliases" ON public.entity_aliases FOR DELETE TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));

-- ============================================
-- ENTITY RELATIONSHIPS
-- ============================================
CREATE TABLE public.entity_relationships (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  source_id uuid NOT NULL REFERENCES public.entities(id) ON DELETE CASCADE,
  target_id uuid NOT NULL REFERENCES public.entities(id) ON DELETE CASCADE,
  relationship_type text NOT NULL DEFAULT 'related_to',
  weight integer DEFAULT 1,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE public.entity_relationships ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view relationships" ON public.entity_relationships FOR SELECT USING (true);
CREATE POLICY "Admins can insert relationships" ON public.entity_relationships FOR INSERT TO authenticated WITH CHECK (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can update relationships" ON public.entity_relationships FOR UPDATE TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can delete relationships" ON public.entity_relationships FOR DELETE TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));

-- ============================================
-- ENTITY SOURCES
-- ============================================
CREATE TABLE public.entity_sources (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  entity_id uuid NOT NULL REFERENCES public.entities(id) ON DELETE CASCADE,
  source_url text,
  source_label text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE public.entity_sources ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view sources" ON public.entity_sources FOR SELECT USING (true);
CREATE POLICY "Admins can insert sources" ON public.entity_sources FOR INSERT TO authenticated WITH CHECK (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can update sources" ON public.entity_sources FOR UPDATE TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can delete sources" ON public.entity_sources FOR DELETE TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));

-- ============================================
-- MODERATION QUEUE
-- ============================================
CREATE TABLE public.moderation_queue (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  content_type text NOT NULL DEFAULT 'feed_item',
  content_id uuid,
  content_preview text DEFAULT '',
  severity text NOT NULL DEFAULT 'info',
  ai_explanation text DEFAULT '',
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE public.moderation_queue ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view moderation queue" ON public.moderation_queue FOR SELECT TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can insert moderation items" ON public.moderation_queue FOR INSERT TO authenticated WITH CHECK (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can update moderation items" ON public.moderation_queue FOR UPDATE TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can delete moderation items" ON public.moderation_queue FOR DELETE TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Service role can insert mod items" ON public.moderation_queue FOR INSERT WITH CHECK (auth.role() = 'service_role'::text);
CREATE POLICY "Service role can update mod items" ON public.moderation_queue FOR UPDATE USING (auth.role() = 'service_role'::text);

CREATE TRIGGER update_moderation_queue_updated_at BEFORE UPDATE ON public.moderation_queue FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ============================================
-- MODERATION DECISIONS
-- ============================================
CREATE TABLE public.moderation_decisions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  queue_item_id uuid NOT NULL REFERENCES public.moderation_queue(id) ON DELETE CASCADE,
  decision text NOT NULL,
  reason text DEFAULT '',
  user_id uuid NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE public.moderation_decisions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view decisions" ON public.moderation_decisions FOR SELECT TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can insert decisions" ON public.moderation_decisions FOR INSERT TO authenticated WITH CHECK (has_role(auth.uid(), 'admin'::app_role) AND auth.uid() = user_id);
CREATE POLICY "Admins can delete decisions" ON public.moderation_decisions FOR DELETE TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));

-- ============================================
-- REALTIME
-- ============================================
ALTER PUBLICATION supabase_realtime ADD TABLE public.entities;
ALTER PUBLICATION supabase_realtime ADD TABLE public.moderation_queue;

-- ============================================
-- INDEXES
-- ============================================
CREATE INDEX idx_entities_type ON public.entities(entity_type);
CREATE INDEX idx_entities_neighborhood ON public.entities(neighborhood);
CREATE INDEX idx_entities_name ON public.entities(name);
CREATE INDEX idx_entity_aliases_entity ON public.entity_aliases(entity_id);
CREATE INDEX idx_entity_relationships_source ON public.entity_relationships(source_id);
CREATE INDEX idx_entity_relationships_target ON public.entity_relationships(target_id);
CREATE INDEX idx_moderation_queue_status ON public.moderation_queue(status);
