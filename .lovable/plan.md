

# AI-Powered Image Search + Agent Upgrades

## What Changes

1. **AI Image Agent** — A new edge function that uses Lovable AI to find high-quality, real image URLs for every listing (fitness spots, singles events, volunteer orgs, discover items) by searching for venue/event-specific photos and returning direct image URLs from the web.

2. **Image-Rich Cards Across All Pages** — Every directory card (Fitness, Singles, Volunteering, Discover) gets a thumbnail image pulled by the AI agent. Cards become visual-first with real photos of the actual venues, events, and organizations.

3. **Firecrawl Integration for Deep Search** — Connect Firecrawl to scrape real venue websites and extract hero images, logos, and photos automatically. This powers both the singles verification pipeline and the fitness/volunteering image enrichment.

4. **Enhanced Singles AI with Multi-Source Discovery** — Upgrade the existing `singles-ai` edge function to use multiple search strategies: Lovable AI for knowledge-based discovery, plus Firecrawl for scraping Eventbrite, Meetup, and forum pages to find and verify real events.

5. **AI Image Cache in Database** — Store fetched image URLs in a new table so we don't re-fetch every page load. Images get associated with listing IDs and cached with timestamps.

## Architecture

```text
User loads page
  → Frontend checks image cache (Supabase table)
  → Cache miss → calls edge function "image-search"
  → Edge function uses Lovable AI to generate search queries
  → Firecrawl scrapes venue websites for real photos
  → Returns best image URL → stored in cache → displayed in card
```

## Implementation Steps

### Step 1: Connect Firecrawl
Firecrawl connector needs to be linked to enable real web scraping for images and event verification.

### Step 2: Create `image-search` Edge Function
- Accepts: listing name, category, location, optional website URL
- Uses Firecrawl to scrape the venue's actual website for hero images
- Falls back to Lovable AI to suggest search terms, then Firecrawl web search for photos
- Returns: array of image URLs ranked by quality/relevance

### Step 3: Create `image_cache` Database Table
```
image_cache
- id (uuid)
- listing_type (text: 'fitness' | 'singles' | 'volunteer' | 'discover')
- listing_id (text)
- image_url (text)
- source_url (text)
- fetched_at (timestamptz)
- quality_score (integer)
```

### Step 4: Add `imageUrl` Field to All Data Interfaces
Update `FitnessSpot`, `SinglesEvent`, `VolunteerOrg` interfaces to include optional `imageUrl` field.

### Step 5: Create `useListingImage` Hook
React hook that checks cache first, then triggers the edge function on cache miss. Returns the image URL for a given listing.

### Step 6: Upgrade All Directory Cards
- Fitness cards: venue photo thumbnails (gym interiors, trail photos, studio shots)
- Singles cards: event/venue photos
- Volunteering cards: org logos or activity photos
- Discover cards: architectural photos, skyline shots

### Step 7: Upgrade Singles AI with Firecrawl
Enhance the existing `singles-ai` edge function:
- Add Firecrawl web search for "Oklahoma City singles events 2026"
- Scrape Eventbrite and Meetup pages for structured event data
- Cross-reference AI knowledge with scraped results for triple verification
- Extract event images from scraped pages

### Step 8: Batch Image Enrichment
Add a "Refresh Images" button (admin-only concept) that triggers batch image fetching for all listings that don't have cached images yet.

## Files

| Action | File | Details |
|---|---|---|
| Create | `supabase/functions/image-search/index.ts` | AI + Firecrawl image discovery agent |
| Create | `src/hooks/useListingImage.ts` | Cache-aware image fetcher hook |
| Modify | `src/data/fitnessSpots.ts` | Add optional `imageUrl` to interface |
| Modify | `src/data/singlesEvents.ts` | Add optional `imageUrl` to interface |
| Modify | `src/data/volunteerOrgs.ts` | Add optional `imageUrl` to interface |
| Modify | `src/pages/Workouts.tsx` | Image thumbnails on cards |
| Modify | `src/pages/Singles.tsx` | Image thumbnails on cards |
| Modify | `src/pages/Volunteering.tsx` | Image thumbnails on cards |
| Modify | `src/pages/Discover.tsx` | Image thumbnails on cards |
| Modify | `supabase/functions/singles-ai/index.ts` | Add Firecrawl scraping for deeper event discovery |
| Create | DB migration | `image_cache` table with RLS |

## Prerequisite

Firecrawl connector must be linked to the project first. I'll prompt you to connect it before proceeding with implementation.

