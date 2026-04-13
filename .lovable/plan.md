

# Cosmic-Level Build — Realistic Implementation Sprint

This plan takes the most impactful, actually-buildable pieces from the cosmic vision and delivers them in one implementation pass. Everything uses your existing Vite/React/Supabase stack with zero new infrastructure costs.

## What Gets Built

### 1. Persistent City Knowledge Graph (Database)
New tables to power the semantic intelligence layer:
- `entities` — canonical record for every person, place, org, event in OKC (name, type, bio, neighborhood, category, lat/lng, verified flag)
- `entity_aliases` — alternate names for deduplication
- `entity_relationships` — typed edges between entities (hosts, sponsors, located_in, related_to)
- `entity_sources` — evidence trail linking entities to source URLs/documents

Seed the graph from existing static data (singlesEvents, fitnessSpots, volunteerOrgs) via a migration that inserts initial entities.

### 2. Admin Knowledge Graph Editor (New Tab)
New "Graph" tab in `/admin`:
- Search entities by name/type
- Create/edit/delete entities with type, neighborhood, category, bio
- View and manage relationships between entities
- Merge duplicate entities (select two, pick canonical, merge aliases)
- View source evidence for each entity

### 3. AI Newsroom Pipeline
New "Newsroom" tab in `/admin`:
- **Draft generation**: Button calls an edge function that uses Lovable AI to draft a city briefing from recent feed items + entity context
- **Edit/approve/publish flow**: AI draft appears in editor, admin edits, then publishes to briefings table
- **Auto-summary**: Generate one-paragraph city summary from all published briefings for homepage display

New edge function: `supabase/functions/newsroom-draft/index.ts`

### 4. Adaptive Content Moderation System
New tables:
- `moderation_queue` — items flagged for review (content, source, severity, ai_explanation, status)
- `moderation_decisions` — admin actions (approve/reject/redact with reasoning)

New "Moderation" tab in `/admin`:
- Queue of flagged items with severity labels and AI explanations
- Approve/reject/redact actions with audit trail
- Auto-flag logic via edge function that checks new feed items and briefings

New edge function: `supabase/functions/moderate-content/index.ts`

### 5. Homepage Intelligence Upgrades
- **Related Items sidebar**: Use the persistent graph to show "Connected to this" on listing cards
- **City Pulse widget**: Real-time counter showing total entities, active briefings, feed items, moderation queue depth
- **AI Concierge teaser**: Small "Ask about OKC" prompt on homepage that routes to a public-facing search powered by the knowledge graph

### 6. Real-Time Everywhere
Enable Supabase Realtime on: `entities`, `moderation_queue`, `feed_items`
- Admin sees new feed items and moderation flags appear live
- Homepage briefings already have realtime; extend to entity count and feed activity

## Database Migration (Single SQL File)

```sql
-- Entities
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

CREATE TABLE public.entity_aliases (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  entity_id uuid REFERENCES public.entities(id) ON DELETE CASCADE,
  alias text NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE public.entity_relationships (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  source_id uuid REFERENCES public.entities(id) ON DELETE CASCADE,
  target_id uuid REFERENCES public.entities(id) ON DELETE CASCADE,
  relationship_type text NOT NULL DEFAULT 'related_to',
  weight integer DEFAULT 1,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE public.entity_sources (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  entity_id uuid REFERENCES public.entities(id) ON DELETE CASCADE,
  source_url text,
  source_label text,
  created_at timestamptz DEFAULT now()
);

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

CREATE TABLE public.moderation_decisions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  queue_item_id uuid REFERENCES public.moderation_queue(id) ON DELETE CASCADE,
  decision text NOT NULL,
  reason text DEFAULT '',
  user_id uuid NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- RLS + Realtime on all new tables
-- Public read on entities; admin CRUD on everything else
```

## Files Created/Modified

| File | Action |
|---|---|
| Migration SQL | New — 6 tables with RLS |
| `src/components/admin/GraphEditor.tsx` | New — entity CRUD, search, merge, relationships |
| `src/components/admin/NewsroomPanel.tsx` | New — AI draft, edit, publish flow |
| `src/components/admin/ModerationPanel.tsx` | New — queue, decisions, severity labels |
| `supabase/functions/newsroom-draft/index.ts` | New — AI briefing generation |
| `supabase/functions/moderate-content/index.ts` | New — AI content flagging |
| `src/pages/Admin.tsx` | Modified — add Graph, Newsroom, Moderation tabs |
| `src/pages/Index.tsx` | Modified — add City Pulse widget, AI concierge teaser |
| `src/lib/knowledgeGraph.ts` | Modified — add DB-backed query methods alongside in-memory graph |

## Technical Approach
- AI functions use Lovable AI Gateway (LOVABLE_API_KEY already configured)
- All new tables get admin-only RLS for writes, public read for entities
- Moderation uses AI to generate explanations, but all decisions are human-approved
- Graph editor uses optimistic UI with Supabase realtime subscriptions
- Newsroom drafts are stored as unpublished briefings until admin approves

