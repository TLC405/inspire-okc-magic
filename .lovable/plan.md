
## Comprehensive Roadmap Plan — Realistic Version for a Solo Builder at ~$40/month

### What I found in the current app
- You already have strong foundations:
  - editable admin for briefings, hero slides, ticker, themes
  - live briefings on the homepage
  - an in-memory semantic layer via `src/lib/knowledgeGraph.ts`
  - AI-powered admin chat and semantic search via backend functions
  - image enrichment pipeline with cache via `image_cache` + `image-search`
- The biggest current gaps relative to your vision:
  - the “knowledge graph for the city” is still static/in-memory, not a persistent city graph
  - no true real-time external event ingestion pipeline yet
  - image coverage is fragile because listing cards depend on lazy on-demand lookup instead of a managed media workflow
  - admin can edit content, but not yet operate the entire site as a true newsroom/CMS/control center
  - advanced hardware integrations, drones, smart billboards, gaze control, and automated journalism are far beyond a solo $40/month phase-one scope

## Core recommendation
Do not attempt the full 4-year vision all at once. Build a durable “city intelligence platform” in layers.

```text
Layer 1: Fix the current product so it feels complete
Layer 2: Build a real content/feeds/media operating system
Layer 3: Add persistent city graph + moderation + newsroom AI
Layer 4: Add premium hardware and immersive interfaces
```

## Priority build sequence

### Phase 1 — Stabilize and complete the current product
Goal: make the site look finished, editable, and reliable.

#### 1. Admin Site Control Center
Upgrade `/admin` into a true site operator console:
- homepage section toggles, ordering, and visibility
- editable homepage headline/dek/dateline blocks
- editable navbar/nameplate copy and theme-specific taglines
- editable section headers, pull quotes, footer copy, newsletter copy
- reusable “site settings” records instead of hardcoded text

#### 2. Real image coverage fix
Current issue: cards are missing images across the app.
Plan:
- add an admin media audit panel showing items with no image, weak image, or broken image
- support manual image override per listing
- preserve AI/image-search fallback, but stop relying on it as the only path
- prefill cards with deterministic fallback artwork by category until real media exists
- add image status metadata so cards can distinguish:
  - verified manual image
  - auto-enriched image
  - fallback placeholder

#### 3. Better real-time feeds
Build a “Live Feeds” system for homepage and admin:
- event feed table for incoming external items
- newsroom queue for review/publish/ignore
- source labels, freshness, timestamps, confidence
- homepage “latest updates” rail fed from live data instead of mostly static content

### Phase 2 — Persistent city graph and editable intelligence
Goal: turn the current static intelligence into a real backend model.

#### 4. Persistent OKC semantic graph
Convert the current in-memory graph into backend tables:
- entities
- entity_aliases
- entity_relationships
- entity_mentions
- source_documents
- canonical event/place/org records

This enables:
- one canonical record per person/place/org/event
- aliases and deduplication
- relationship browsing in admin
- “related items” and “why this is connected” on the public site
- future journalism, moderation, search, and analytics all using the same graph

#### 5. AI-assisted entity resolution
Use backend AI functions to:
- resolve duplicate venues/orgs/events
- propose merges for admin approval
- auto-tag neighborhoods, categories, orgs, and related entities
- generate confidence/explanation trails

#### 6. Admin graph editor
New admin capabilities:
- search entities
- merge duplicates
- inspect source evidence
- approve/reject AI-suggested links
- edit canonical names, tags, neighborhoods, and relationships

## Phase 3 — Newsroom, moderation, and automation
Goal: make it operate like a civic newsroom, not just a directory.

#### 7. Automated journalism with human oversight
Add a newsroom pipeline:
- ingest source items
- AI drafts briefing/news summary/Q&A
- admin reviews, edits, publishes
- published stories feed homepage and archives

Important:
- AI should draft, summarize, and structure
- publishing should remain explicitly human-approved in this phase

#### 8. Adaptive moderation system
For future user submissions/posts/images/events:
- flag risky content
- redact sensitive fields when needed
- assign severity
- explain why it was flagged
- route items into moderation queues

This should include:
- moderation tables
- admin moderation dashboard
- explainable labels, not black-box accept/reject only

#### 9. Real event ingestion pipeline
Instead of scraping ad hoc at render time:
- scheduled source collection
- normalization into feed tables
- dedupe against graph entities
- editorial review queue
- publish to briefings, events, and timeline modules

## Phase 4 — Ambitious advanced systems
Goal: only after the above is stable.

#### 10. Accessibility expansion
High-value first:
- keyboard-first interaction audit
- screen-reader landmarks and editorial navigation
- reduced motion tuning
- higher-contrast theme variants
- optional voice control for search/navigation

Defer for later:
- sip-and-puff
- gaze tracking
These are possible long-term, but not good first budget priorities.

#### 11. Dynamic designer-driven UI system
Build a theme architecture that supports:
- section-specific mood presets
- editorial vs sports vs civic presentation modes
- component tokens per theme
- controlled motion language, not flashy random effects

Avoid early:
- arbitrary 3D transitions everywhere
- morphing layouts on all screens
Those are expensive, brittle, and likely to hurt accessibility.

#### 12. Hardware integrations
Only after the software platform is mature:
- billboard API connectors
- livestream ingest endpoints
- ops dashboard for public screens
- curated sensor/event overlays

Drones and IoT should be treated as separate future programs, not core MVP scope.

## What is realistic on your budget
With just you and about $40/month total, the realistic near-term target is:

### Realistic now
- stronger admin CMS
- reliable image management
- better live event/news feeds
- persistent city graph v1
- newsroom drafting workflow
- moderation queue foundation

### Not realistic now
- custom live drone platform
- smart billboard fleet integrations
- citywide IoT ingestion at scale
- “semantic graph of every person/place/org/event in OKC” fully completed in one pass
- advanced gaze/sip hardware accessibility stack
- infinitely scaling automated journalism with no operational cost

## 4-year timeline recommendation

### Year 1
- complete admin operating system
- fix images permanently
- launch live feeds + newsroom queue
- create persistent entity graph v1
- improve search and related-item intelligence

### Year 2
- add source ingestion automation
- add AI-assisted story drafting
- add graph merge/review tools
- add moderation system for submissions/events/media

### Year 3
- public knowledge graph experiences
- timeline/history/context modules
- richer newsroom analytics
- structured civic topic pages for neighborhoods, orgs, issues, venues

### Year 4
- immersive interfaces
- public display surfaces
- external hardware integrations
- advanced accessibility controls
- selective live sensor/media integrations

## Files/systems likely involved in the next implementation round
- `src/pages/Admin.tsx`
- `src/components/BriefingEditor.tsx`
- `src/components/admin/ThemePanel.tsx`
- `src/components/HeroCarousel.tsx`
- `src/components/WireTicker.tsx`
- `src/components/ListingImage.tsx`
- `src/hooks/useListingImage.ts`
- `src/lib/knowledgeGraph.ts`
- `supabase/functions/image-search/index.ts`
- `supabase/functions/admin-chat/index.ts`
- `supabase/functions/smart-search/index.ts`

And likely new backend tables for:
- site settings / homepage modules
- media overrides / media audit
- feed sources / feed items / ingestion jobs
- entities / aliases / relationships / mentions / documents
- moderation queues / flags / decisions
- article drafts / article revisions / publishing state

## Best next build order I recommend
1. Admin control center for editing more of the site
2. Image reliability overhaul across all cards
3. Real-time event/news feed infrastructure
4. Persistent city graph v1
5. AI newsroom drafting with approval flow
6. Moderation queue foundation

## Technical notes
- The current AI stack already supports backend AI features, but the existing functions use Groq directly. Future work should standardize AI orchestration and keep prompts server-side.
- The current knowledge graph is useful as a prototype, but it must move to backend tables to support persistent city intelligence.
- The current image pipeline is useful, but it needs auditability, overrides, and precomputation.
- Realtime is already present for briefings; the same pattern can extend to feeds, moderation queues, and newsroom operations.
- Your strongest path is not “build everything futuristic now,” but “build a premium civic operating system first, then attach advanced interfaces later.”
