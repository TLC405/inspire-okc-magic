

# Sprint: Paper Texture, Hero CTAs, Navbar Collapse, Footer, Stats, Polish

## Already Completed (from prior work)
- Mobile broadsheet columns (stacked layout in Index.tsx)
- Bottom tab bar (MobileTabBar.tsx)
- Search scoring system (replaced regex in SearchSurface.tsx)
- Editorial tone on Events page (emojis removed)
- Newsletter email CTA on homepage

## What This Sprint Adds

### 1. Paper-Grain Newsprint Texture
Add a CSS pseudo-element overlay on `body` with a subtle noise/grain pattern using an SVG data-URI. Applied globally across all themes with opacity tuned per mode (Signal: 3%, Editorial: 6%, Raw: 2%).

### 2. Hero Carousel with Section Overlays + CTAs
Each slide gets a headline, subtitle, and "Explore" link that routes to its section. Text fades in sync with image transitions. Mobile-optimized with smaller type.

### 3. Navbar Scroll-Collapse
Add a `useScrollPosition` hook. After scrolling 60px, hide the nameplate/ornaments and keep only the utility bar + nav links sticky. Reclaims ~80px of viewport on scroll.

### 4. Footer Rebuild
Replace the 3-link footer with a full newspaper colophon: brand column with tagline, full sitemap (all 6 sections), trust statement ("All listings triple-verified"), newsletter signup duplicate, and social-ready links.

### 5. Stats Bar — Product-Value Metrics
Replace "700K+ Population" and "405 Area Code" with "Verified Listings", "Categories", "Avg Confidence", and "Updated This Week".

### 6. Remove OKC Character Mascot
Replace the cartoon character section with an editorial colophon-style block that fits the newspaper metaphor.

### 7. Weather Widget on Events Page
Add the same `useWeather()` hook display in the Events hero area.

### 8. Empty State Polish
Replace 🦗 emoji in Events empty state with editorial-toned copy.

### 9. Page Fade-In Animation
Apply `animate-fade-in` class to the main content wrapper on each page for smooth route transitions.

---

## Files to Modify

| Action | File | What |
|---|---|---|
| Modify | `src/index.css` | Add paper-grain texture pseudo-element on body |
| Modify | `src/components/HeroCarousel.tsx` | Add per-slide headline, subtitle, CTA link |
| Modify | `src/components/Navbar.tsx` | Add scroll-collapse behavior for nameplate |
| Modify | `src/components/Footer.tsx` | Full newspaper colophon with sitemap, trust, brand |
| Modify | `src/pages/Index.tsx` | Replace stats bar metrics, remove character mascot, add fade-in |
| Modify | `src/pages/Events.tsx` | Add weather to hero, fix empty state, add fade-in |
| Modify | `src/pages/Singles.tsx` | Add fade-in wrapper |
| Modify | `src/pages/Workouts.tsx` | Add fade-in wrapper |
| Modify | `src/pages/Volunteering.tsx` | Add fade-in wrapper |
| Modify | `src/pages/Discover.tsx` | Add fade-in wrapper |

No database changes needed.

