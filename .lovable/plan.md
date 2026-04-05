

# Discover Page: Social Feed with Rolling Events

## What Changes

Transform the Discover page from a static card grid into a **social media-style scrolling feed** that aggregates events and content from multiple Oklahoma City sources — styled like a Visit OKC / OKC Metro / Instagram discovery feed.

## Architecture

The Discover page keeps its existing 100-item city showcase data but gains a new **"What's Happening" feed** at the top — a vertically scrolling, visually rich timeline that mixes:

1. **Singles & Date Night events** (pulled from `singlesEvents` data)
2. **City showcase highlights** (from `cityShowcase` data)  
3. **Fitness happenings** (from `fitnessSpots` data)
4. **Volunteer opportunities** (from `volunteerOrgs` data)

Each feed item is styled as a social-media-style card with venue photo, source attribution badge (Visit OKC, OKC Metro, Meetup, etc.), timestamp, and category tag.

## Changes

### 1. Add Feed Data Aggregator (new file: `src/lib/discoverFeed.ts`)
- Pulls from all four data sources: singles events, fitness spots, volunteer orgs, city showcase
- Normalizes into a unified `FeedItem` type with: title, description, image (via ListingImage), source name, source icon, category, link, neighborhood
- Sorts by a weighted relevance score (verified events first, Date Nights boosted, seasonal items prioritized)
- Each item gets a "source" badge: "Visit OKC", "OKC Metro", "Meetup", "Community", etc. based on the source URL domain

### 2. Rebuild Discover Page Layout (modify: `src/pages/Discover.tsx`)
- **Top section**: "What's Happening in Oklahoma City" scrolling feed — large photo cards in a single-column timeline layout (mobile-first)
- Each feed card: full-width venue photo via `ListingImage`, source badge (e.g. "via Visit OKC" with colored pill), category chip, title, short description, neighborhood tag, "View →" link
- **Bottom section**: Existing city showcase grid (100 facts) stays but collapses behind a "Explore 100 Facts" expandable section
- Category filter chips apply to BOTH the feed and the facts grid
- Search searches across everything

### 3. Feed Card Styles (modify: `src/index.css`)
- `.feed-card` — large photo top (200px), rounded corners, subtle shadow, source attribution overlay
- `.feed-source-badge` — colored pill showing source name (blue for Visit OKC, orange for OKC Metro, green for Meetup)
- `.feed-timestamp` — relative time display ("2h ago", "Today", "This week")
- Mobile-optimized: single column, full-bleed photos, swipeable feel

### 4. Source Attribution Mapping
Map real source URLs to recognizable brand names:
- `visitokc.com` → "Visit OKC" (blue badge)
- `oklahoman.com` → "The Oklahoman" (red badge)
- `meetup.com` → "Meetup" (red badge)
- `eventbrite.com` → "Eventbrite" (orange badge)
- `famok.org`, `scissortailpark.org`, etc. → "Community" (green badge)
- Default → domain name extracted from URL

## Files

| Action | File | Details |
|---|---|---|
| Create | `src/lib/discoverFeed.ts` | Aggregates all data sources into unified feed items with source badges |
| Modify | `src/pages/Discover.tsx` | Social feed layout at top, collapsible facts grid below, feed cards with photos |
| Modify | `src/index.css` | Feed card styles, source badge colors, timeline layout |

No new dependencies. No database changes. Uses existing `ListingImage` for all venue photos.

