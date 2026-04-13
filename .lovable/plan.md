

# Masthead Enhancement + Static Images + Every-Page Layout

## What Gets Built

### 1. Enhanced Masthead — Richer, More Interactive, on Every Page

The current Navbar already has City Guide, Vol/Issue, weather, time, and edition — but it needs to be denser, more interactive, and appear consistently across all pages.

**Enhancements:**
- Add the section label to the utility bar that changes per page (e.g., "Section B: The Singles Beat" on `/singles`, "Section C: The Lifestyle Report" on `/fitness`)
- Add a live reader count or entity count from the knowledge graph inline
- Add a "Today's Focus" micro-headline that rotates based on time of day (morning/afternoon/evening recommendations)
- Make the weather ornament clickable — expands to show a 3-day mini-forecast (still using open-meteo, no API key)
- Add a subtle animated separator between utility bar items using CSS `::after` pseudo-elements
- Ensure the `Navbar` component receives the current page context via `useLocation` to display the correct section label

### 2. Static Images Embedded in App — Zero Loading

Replace the dynamic `useListingImage` hook and edge function approach with a static image map embedded directly in the codebase. This eliminates all loading states, network requests, and CORS failures.

**Approach:**
- Create `src/data/listingImages.ts` — a static map of `listingId → imageUrl` using free, open-licensed image URLs from Unsplash (via their static CDN — no API key, just direct URLs like `https://images.unsplash.com/photo-xxx?w=400&q=80`)
- Curate ~50 category-specific images: CrossFit boxes, yoga studios, food banks, dance halls, parks, etc.
- For organizations without a specific match, use a curated category fallback (e.g., all "CrossFit" listings share a CrossFit gym photo, all "Food" volunteer orgs share a food bank photo)
- Update `ListingImage.tsx` to check the static map first — if found, render immediately with no loading state; only fall back to the edge function if no static match exists
- This means cards render instantly with real photos, zero shimmer/skeleton states

### 3. Creative Unique Layout in Masthead — Per-Page Personality

Each page gets a unique masthead treatment below the main Navbar:
- **Homepage**: Full hero carousel (already exists) + broadsheet headline block
- **Singles**: Inline "The Singles Beat" dateline banner with a mini-stat bar (verified count, event count)
- **Fitness**: "The Lifestyle Report" with district count and category breakdown inline
- **Volunteering**: "The Civic Report" with org count and commitment breakdown
- **Events**: "The Events Desk" with tonight's count
- **Date Nights**: "The Social Scene" with curated picks count
- **Discover**: "The Metro" with neighborhood count

These are small, dense, section-header-style blocks (not full hero images) that reinforce the newspaper section identity.

## Files Created/Modified

| File | Action |
|---|---|
| `src/data/listingImages.ts` | New — static image URL map for all listings by category |
| `src/components/ListingImage.tsx` | Modified — check static map first, instant render |
| `src/components/Navbar.tsx` | Modified — add per-page section labels, interactive weather, denser utility bar |
| `src/components/SectionHeader.tsx` | New — reusable per-page section masthead with stats |
| `src/hooks/useWeather.ts` | Modified — add 3-day forecast data from open-meteo |
| `src/pages/Singles.tsx` | Modified — add SectionHeader |
| `src/pages/Workouts.tsx` | Modified — add SectionHeader |
| `src/pages/Volunteering.tsx` | Modified — add SectionHeader |
| `src/pages/Events.tsx` | Modified — add SectionHeader |
| `src/pages/DateNights.tsx` | Modified — add SectionHeader |
| `src/pages/Discover.tsx` | Modified — add SectionHeader |

## Technical Notes
- Unsplash static URLs (`images.unsplash.com/photo-xxx?w=400&q=80`) are free, no API key needed, and served from a global CDN
- Category-based fallback images mean even new listings added later get a relevant photo instantly
- The static map can be overridden by the existing `media_overrides` table for admin-curated images
- No database or edge function changes needed
- Weather forecast uses the same open-meteo API, just adds `&daily=temperature_2m_max,temperature_2m_min,weather_code&forecast_days=3`

