

# INSPIRE Oklahoma City — Singles Event Finder + Design Restructure

## What the User Wants

1. **Social Singles is NOT a dating app** — it's a directory/finder for all dating and singles events happening in Oklahoma City. Speed dating, mixers, singles nights, etc.
2. **It needs to actually work NOW** — real event data, researched and hardcoded (no backend yet), with sources
3. **Complete design restructure** — the current UX feels repetitive and template-like. Every page uses the same hero → quote → cards → neighborhoods → launching box pattern
4. **Search needs to work** — the SearchSurface on the homepage should actually filter and navigate to real results

## The Problem

- Every directory page is a carbon copy of the same template with different text
- Singles page says "Launching Spring 2026" — user wants it working NOW
- No real data anywhere — all placeholder
- Search goes to `/explore?q=` but nothing happens with the query
- "Social Singles" description sounds like a dating app, not an event finder
- The Events page is entirely a placeholder with no real events

---

## Plan

### 1. Research & Hardcode Real Oklahoma City Singles Events

Use web search to find real, ongoing singles events in Oklahoma City — speed dating, mixers, singles nights at bars/restaurants, social clubs. Then hardcode 15-20 real events into the Singles page with:
- Event name, venue, neighborhood, date/frequency, price range, source URL
- Category tags: Speed Dating, Mixer, Social, Activity-Based, etc.

### 2. Rebuild Singles Page as a Working Event Finder

Replace the template layout with a functional event directory:

```text
+----------------------------------------------------------+
|  HERO: "Singles Events · Oklahoma City"                   |
|  Subtitle: Find every singles event in the city           |
|                                                          |
|  [FILTER BAR - sticky]                                    |
|  Speed Dating · Mixers · Socials · Activities · All       |
|  Tonight · This Week · This Weekend · Recurring           |
|                                                          |
|  [EVENT LIST - real data]                                 |
|  ┌─────────────────────────────────────────────┐         |
|  │ (01) Speed Dating at [Venue]                │         |
|  │     Bricktown · Every 2nd Friday · $25      │         |
|  │     [Social] [Speed Dating] → source link   │         |
|  └─────────────────────────────────────────────┘         |
|  ┌─────────────────────────────────────────────┐         |
|  │ (02) Singles Mixer at [Venue]               │         |
|  │     Midtown · Monthly · Free                │         |
|  └─────────────────────────────────────────────┘         |
|  ... 15-20 real events                                   |
|                                                          |
|  [NEIGHBORHOODS with event counts]                       |
+----------------------------------------------------------+
```

- Filterable by category and time
- Each event links to its source (external URL)
- No "Coming Soon" or "Launching" messaging — it's live

### 3. Make Search Functional

Update `SearchSurface` and the `/explore` page:
- When a user searches from homepage, navigate to `/explore?q=term`
- On `/explore`, read the `q` param and pre-filter results
- Add the singles events as searchable items alongside directory results

### 4. Design Differentiation Across Pages

Break the cookie-cutter template. Each page type gets a distinct layout:

- **Singles** → Event index with filters (functional, data-rich)
- **Workouts** → Location-based cards with activity types
- **Volunteering** → Opportunity listings with org names
- **Coaching** → Service cards with coach specialties
- **Men-Talk** → Stays gated, minimal and intentional
- **Events** → Aggregate feed from all directories (pulls from Singles, Workouts, Volunteering)
- **Explore** → Hub that surfaces content from all directories with working search

### 5. Events Page Gets Real Content

Instead of an empty placeholder, the Events page aggregates real events from the Singles directory (and eventually others). Shows the same filter architecture but with actual data.

### 6. Remove All "Coming Soon" / "Launching Spring 2026" Language

Replace with active language. The directories are live now — they're finders, not future products.

---

## Files Summary

| Action | File | Details |
|---|---|---|
| Modify | `src/pages/Singles.tsx` | Full rebuild as working event finder with 15-20 real OKC singles events, filter bar, search |
| Modify | `src/pages/Events.tsx` | Aggregate real events from Singles data, remove placeholder |
| Modify | `src/pages/Explore.tsx` | Read `?q=` param, pre-filter, make search functional across all directories |
| Modify | `src/components/SearchSurface.tsx` | Pass query to explore with working navigation |
| Modify | `src/pages/Workouts.tsx` | Remove template layout, add real OKC fitness locations/data, remove "Coming Soon" |
| Modify | `src/pages/Volunteering.tsx` | Remove template layout, add real OKC volunteer orgs, remove "Coming Soon" |
| Modify | `src/pages/Coaching.tsx` | Remove template, unique layout, remove "Coming Soon" |
| Modify | `src/components/home/HeroSection.tsx` | Update directory descriptions to reflect working state |
| Modify | `src/components/Footer.tsx` | Remove "Coming Soon" references |
| Create | `src/data/singlesEvents.ts` | Centralized data file with real OKC singles events (researched) |
| Create | `src/data/fitnessSpots.ts` | Real OKC gyms, trails, fitness classes |
| Create | `src/data/volunteerOrgs.ts` | Real OKC volunteer organizations |

### Data Research Phase

Before building, I'll web-search for:
- Oklahoma City speed dating events
- OKC singles mixers and social events
- Singles groups and recurring meetups in OKC
- Popular venues hosting singles nights

This real data gets hardcoded into `src/data/singlesEvents.ts` with source URLs so users can verify and click through.

