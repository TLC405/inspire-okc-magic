## Singles Integrity + AI Search Rebuild

### What I found

- The problem is real: the current Singles page includes broken external source URLs.
- `Single Awareness Dinner` is pointing to a broad Eventbrite search page, not a stable event detail page.
- The `Ermantourage` organizer link currently returns Eventbrite “Whoops” / not found.
- The `Jigsaw Dating` organizer link also returns Eventbrite “Whoops” / not found.
- So the app is currently publishing listings that are not atomically verified source-by-source.
- CREATE AI THAT TRIPLE VERIFIES AND AI THAT SEARCHES ALL SOCIAL MEDIA AND USE AN 10 OUTSIDE SORUCES ON GITHUB TO MAKE THIS A PP GRANDER. 

## Plan

### 1. Hard-stop content integrity on Singles

- Remove or suppress any singles listing whose source fails verification.
- Treat forum mentions and broad search pages as discovery signals only, not publishable proof.
- Keep only events with at least one direct, working source page.
- Add a strict status model:
  - `verified`
  - `stale`
  - `broken`
  - `conflict`
  - `unverified`

### 2. Rebuild Singles data model around evidence

Replace the current flat event shape with source-aware metadata:

- event core info
- multiple source URLs per event
- verification status
- last checked timestamp
- confidence score
- evidence notes
- optional venue/image metadata

That lets the UI show what is confirmed instead of pretending everything is equally reliable.

### 3. Massively upgrade Singles search

Build a real search layer instead of plain text matching:

- weighted ranking across event name, organizer, venue, tags, neighborhood, and source text
- “verified only” enabled by default
- filters for category, frequency, neighborhood, age bracket, price, source provider
- sort by relevance, newest verification, and strongest confidence
- “why this matched” highlights in results

### 4. Upgrade Singles display into a verification-first UI

Redesign cards so users can see trust instantly:

- verification badge
- last checked time
- source chips
- confidence meter
- richer tags
- expandable evidence drawer per event
- clearer empty states when no triple-verified events exist

### 5. Add AI-powered discovery and verification pipeline

Implement backend support so the app can actually keep up with real event data:

- Use Lovable AI for normalization, extraction, deduping, categorization, and summaries
- Use Firecrawl for scraping candidate pages and source content
- Optionally use Perplexity for broader discovery, but never as sole publication proof
- Forums/social/search pages can suggest leads, but direct source pages must still verify the listing before it shows publicly

### 6. Add admin/operator controls for Singles

Create an admin workflow for you to manage quality:

- review candidate events
- inspect all evidence for an event
- approve/reject/override
- mark broken links
- trigger re-verification
- pin featured events
- hide stale listings without deleting history

### 7. Improve visuals without fake imagery

- Show only real event/venue/source imagery when available
- Prefer official source images or captured source previews over decorative stock
- Add visual source panels/screenshots so you can see what the verifier found

### 8. QA and safety standard

- No listing appears publicly unless source verification passes
- Broken links auto-fail
- Conflicting source data gets flagged, not published as fact
- If a source disappears, the card downgrades from `verified` to `stale` or `broken`

## Technical details

### Frontend

- Rewrite `src/pages/Singles.tsx` to support:
  - trust-first result cards
  - evidence panel/drawer
  - ranking + advanced filtering
  - verified-only default behavior
- Replace the current flat card rendering with result states tied to verification metadata

### Data / types

- Replace the current `src/data/singlesEvents.ts` shape with verification-aware fields
- If backend is introduced, move Singles data from hardcoded TS into Supabase-backed records and keep only typed interfaces in the frontend

### Backend

Create a live verification stack with:

- edge function for discovery
- edge function for verification
- edge function for re-checking existing events
- edge function for AI-assisted extraction/normalization

### Suggested schema

```text
singles_events
- id
- title
- organizer
- venue
- neighborhood
- category
- frequency
- price
- age_range
- description
- verification_status
- confidence_score
- last_verified_at
- primary_source_url
- hero_image_url

event_sources
- id
- event_id
- provider
- url
- status
- checked_at
- title
- extracted_payload

event_verification_logs
- id
- event_id
- result
- notes
- checked_at
```

## Files likely affected

- `src/pages/Singles.tsx`
- `src/data/singlesEvents.ts`
- `src/components/...` new Singles search / evidence / badge components
- `src/lib/...` search ranking helpers
- `supabase/functions/...` new AI + verification functions
- `supabase/migrations/...` new tables for live verified singles data

## Implementation order

1. Stop publishing broken Singles entries
2. Add verification-aware event model
3. Upgrade Singles UI/search locally
4. Add AI discovery + verification backend
5. Add admin review tools
6. Re-populate only with verified events