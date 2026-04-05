

# Events & Date Nights + Real Photo Showcase + AI Atmosphere

## What We're Building

A new **Events & Date Nights** section integrated across the app, with real AI-fetched photos embedded everywhere, creating an immersive showcase experience.

## Changes

### 1. Add "Date Night" Category to Singles Events Data
- Add `"Date Night"` to the `SinglesEvent` category type union
- Add 8 verified OKC date night entries with real source URLs:
  - Factory Obscura immersive art (factoryobscura.com — verified)
  - Scissortail Park sunset kayaking (scissortailpark.org — verified)  
  - Wheeler District waterfront dinner (wheelerdistrict.com — verified)
  - Paseo First Friday gallery walk (thepaseo.org — verified)
  - OKC Riversport adventure date (riversportokc.org — verified)
  - Automobile Alley cocktail crawl (automobilealley.org — verified)
  - First Americans Museum evening (famok.org — verified)
  - Painting with a Twist (already exists, reclassify as Date Night)
- Update `singlesCategories` to include "Date Night"

### 2. New Events & Date Nights Page (`/events`)
- Dedicated page at `/events` route showing all events + date nights
- Visual-first layout: large hero cards with AI-fetched venue photos via `ListingImage`
- Category tabs: "All", "Date Night", "Speed Dating", "Mixer", "Social", "Dance", "Activity", "Faith"
- Each card shows: venue photo (full-width top), event name, venue, neighborhood, price, frequency, verification badge
- Date Night cards get a warm rose-gold accent border and heart icon
- "Tonight" / "This Weekend" / "This Month" quick-filter pills based on frequency

### 3. Embed Real Photos Everywhere with AI Image Agent
- Every card across Fitness, Singles, Volunteering, Discover, and Events pages uses `ListingImage` component (already built) to auto-fetch real venue photos
- Homepage column teasers: add small thumbnail next to each numbered item using `ListingImage`
- Discover cards: add hero image area at top of each card
- Make the `image-search` edge function prioritize venue-specific photos over generic stock

### 4. Homepage "Events & Date Nights" Section
- Add a new section between the 3-column broadsheet and the Discover section
- Horizontal scroll of 4-6 date night cards with large venue photos
- Each card: full photo background, gradient overlay, event name + venue + price overlay text
- "View All Events" CTA linking to `/events`

### 5. Navigation Update
- Add "Events" to the Navbar between "Singles" and "Fitness"
- Update redirect: `/events` route now points to the new Events page instead of redirecting to `/`

### 6. Visual Atmosphere Upgrades
- All listing cards site-wide get a photo header area (using existing `ListingImage` hook)
- Cards without images show a gradient placeholder with category icon instead of blank space
- Subtle parallax effect on homepage hero
- Date Night cards glow with warm accent shadow on hover

## Files

| Action | File | Details |
|---|---|---|
| Modify | `src/data/singlesEvents.ts` | Add "Date Night" to category union, add 8 verified date night entries |
| Create | `src/pages/Events.tsx` | Visual-first events + date nights page with photo cards |
| Modify | `src/App.tsx` | Add `/events` route, remove old redirect |
| Modify | `src/components/Navbar.tsx` | Add "Events" nav link |
| Modify | `src/pages/Index.tsx` | Add Events & Date Nights horizontal showcase section |
| Modify | `src/components/ListingImage.tsx` | Improve fallback with category-colored gradient + icon |

No new dependencies. Uses existing `ListingImage` + `useListingImage` hook + `image-search` edge function for real photos.

