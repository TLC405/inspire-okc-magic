

# Intelligent Search and AI Enhancement — Practical Implementation

## Context

The user requested five advanced AI/ML capabilities: entity disambiguation, contextualized embeddings, probabilistic modeling, causal inference, and meta-learning. These are research-grade concepts. Within the constraints of this stack (React + Supabase Edge Functions + Groq LLM), here is how each maps to a concrete, buildable feature.

---

## What Gets Built

### 1. Entity Disambiguation — Smart Search with NER

**Current problem**: Search is basic substring matching across datasets. "Midtown" matches a neighborhood string but doesn't understand it's a place. "OKC Thunder" doesn't connect to sports context.

**Implementation**:
- Create `src/lib/entityResolver.ts` — a lightweight entity resolution layer
- Build an entity registry mapping aliases to canonical entities (e.g., "Thunder" → "OKC Thunder" → sports; "Paseo" → "Paseo Arts District" → neighborhood; "MAPS 4" → city initiative)
- Integrate entity types: `person`, `place`, `organization`, `event`, `category`
- Upgrade `SearchSurface.tsx` to run queries through entity resolution before dataset scoring — so "yoga downtown" resolves "downtown" to the Downtown neighborhood and "yoga" to the Yoga category
- Upgrade `singlesSearch.ts` to boost scores when entity matches are found
- Add entity metadata display in search results (e.g., show "Place: Paseo Arts District" badge)

### 2. Contextualized Search — AI-Powered Semantic Understanding

**Current problem**: `discoverFeed.ts` and `singlesSearch.ts` use keyword matching. "romantic evening out" won't find "Date Night at The Jones Assembly."

**Implementation**:
- Create a new edge function `supabase/functions/smart-search/index.ts`
- On complex queries (3+ words or no keyword matches), call Groq to interpret intent and return structured filters via tool calling: `{ categories: ["Date Night"], neighborhoods: ["Bricktown"], mood: "romantic", timePreference: "evening" }`
- Frontend: Add an "AI Search" toggle to `SearchSurface.tsx` that activates semantic search when keyword results are poor (zero or very few matches)
- Cache AI interpretations in a `search_intent_cache` table to avoid repeated calls for similar queries

### 3. Probabilistic Confidence — Enhanced Verification Scoring

**Current problem**: Confidence scores are static numbers (e.g., 88%). No representation of uncertainty or data freshness decay.

**Implementation**:
- Create `src/lib/confidenceModel.ts` with a decay function: confidence drops over time since last verification
- Add `freshnessScore` calculation: `baseScore * decay(daysSinceVerified)` with configurable half-life
- Display confidence as a range (e.g., "78-92%") instead of a point estimate on listing cards
- Add a "Freshness" indicator (green/yellow/red) based on days since verification
- Update `singlesSearch.ts` to factor freshness-adjusted confidence into ranking
- Update the admin scanner to flag listings where confidence has decayed below threshold

### 4. Causal Relationship Mapping — Event/Venue Intelligence

**Current problem**: No understanding of relationships between entities. The app doesn't know that "Speed Dating at The Jones Assembly" connects a category, venue, and neighborhood.

**Implementation**:
- Create `src/lib/knowledgeGraph.ts` — build a lightweight in-memory graph from existing data
- Nodes: venues, neighborhoods, categories, organizers, tags
- Edges: "hosts" (venue→event), "located_in" (venue→neighborhood), "organized_by" (organizer→event), "related_to" (tag→tag)
- Use the graph to power a "Related" section on listing cards: "Also at this venue", "More in Bricktown", "By this organizer"
- Add a "Connections" visualization in the Discover page showing how OKC entities relate
- Upgrade admin-chat system prompt to include graph context so INSPIRE Intelligence can answer relationship queries ("What events happen in Paseo?")

### 5. Meta-Learning — Adaptive AI Prompts

**Current problem**: AI prompts are static. The scanner and chat don't learn from previous interactions or adapt to admin preferences.

**Implementation**:
- Create `admin_prompt_history` table to store successful prompt patterns and admin feedback (thumbs up/down on AI responses)
- Add thumbs up/down buttons to chat messages and scanner results in `Admin.tsx`
- When calling Groq in `admin-chat` and `admin-scanner`, prepend recent high-rated exchanges as few-shot examples
- Store admin's custom instructions (already in `admin_settings`) and auto-append topic-specific context based on the current tab/section being discussed
- Add a "Learning" indicator in the AI panel showing how many feedback signals have been collected

---

## Technical Details

### New Files
| File | Purpose |
|---|---|
| `src/lib/entityResolver.ts` | Entity registry, alias mapping, NER-lite resolution |
| `src/lib/knowledgeGraph.ts` | In-memory relationship graph from static data |
| `src/lib/confidenceModel.ts` | Freshness decay, confidence ranges |
| `supabase/functions/smart-search/index.ts` | AI-powered semantic query interpretation via Groq |

### Database Changes
| Table | Purpose |
|---|---|
| `search_intent_cache` | Cache AI query interpretations (query, parsed_intent, created_at) |
| `admin_prompt_history` | Store feedback on AI responses (message_id, rating, context) |

### Modified Files
| File | Changes |
|---|---|
| `src/components/SearchSurface.tsx` | Entity-aware search, AI fallback toggle, entity badges |
| `src/lib/singlesSearch.ts` | Entity boost scoring, freshness-adjusted ranking |
| `src/lib/discoverFeed.ts` | Knowledge graph "related" items, entity-tagged feed items |
| `src/pages/Admin.tsx` | Feedback buttons on AI responses, learning indicator |
| `supabase/functions/admin-chat/index.ts` | Few-shot examples from feedback history |
| `supabase/functions/admin-scanner/index.ts` | Freshness decay alerts, adaptive prompts |
| Listing card components | Confidence ranges, freshness badges, "Related" sections |

### No External Dependencies Required
All implementations use existing Groq API, static data, and in-memory computation. No vector databases, no ML frameworks, no additional API keys needed.

---

## Implementation Order

1. Entity resolver + knowledge graph (foundation layer)
2. Confidence model with freshness decay
3. Upgrade search surface with entity awareness
4. Smart search edge function (AI semantic fallback)
5. Admin feedback system + adaptive prompts
6. Related items and connection displays across pages

