

# Fix Hero Visibility + Photo-Rich Homepage + Image Cache Check

## Problems

1. **Hero/masthead not visible** — The hero section with "INSPIRE Oklahoma City" may be cut off or hard to see depending on viewport. The gradient overlay and text sizing need to be more prominent and the hero needs to be taller on mobile.

2. **No real photos on the homepage listings** — The three-column broadsheet teasers are text-only with numbered lists. Each listing item should show a small thumbnail from the image cache (181 cached images exist in DB across fitness, volunteer, discover, singles).

3. **Image cache has quality issues** — Many cached images point to the same generic OKC.gov banner or Wikipedia file pages (not direct images). These need to be identified and flagged.

## Changes

### 1. Make Hero Dominant (Index.tsx)
- Increase hero height: `h-[340px] md:h-[500px]` (was 280/420)
- Make "INSPIRE" text larger: `text-5xl md:text-8xl` with stronger text-shadow
- Add "Oklahoma City" as a larger sub-masthead
- Ensure the gradient overlay is strong enough: `from-black/70 via-black/50 to-background`
- Add the uploaded OKC images as a rotating hero or collage strip below the masthead

### 2. Add Photo Thumbnails to Every Teaser Item (Index.tsx)
- Each numbered item in the 3-column broadsheet gets a small `ListingImage` thumbnail (48x48 rounded) next to the text
- This uses the existing `ListingImage` component which auto-fetches from `image_cache` or triggers the AI image agent
- Layout changes from `flex items-baseline` to a row with image + text

### 3. Add Photo Grid Showcase Section (Index.tsx)
- New section above the broadsheet: a masonry-style grid of 6-8 real venue photos from the image cache
- Uses `ListingImage` for top-rated cached images across all categories
- Creates the "newspaper photo spread" feel

### 4. Uploaded Images as Homepage Assets
- Copy the user-uploaded OKC images (skyline, cartoon character, etc.) to `src/assets/`
- Use them as accent images in the hero area and section dividers
- The cartoon character images become part of the site personality

### 5. Image Cache Audit (Admin Panel)
- Add an "Image Cache" tab to the Admin panel showing:
  - Total cached images by category (fitness: 119, volunteer: 29, discover: 27, singles: 6)
  - Flagged duplicates (same URL used for multiple listings)
  - Broken/generic images (Wikipedia file pages, tiny banners)
  - Button to re-fetch flagged images

### 6. Mobile Hero Fix
- On the 690px viewport, ensure hero takes at least 50% of initial viewport
- Make quick-nav cards show photos more prominently
- Increase the hero image height on mobile from `h-16` to `h-24` in quick-nav cards

## Files

| Action | File | Details |
|---|---|---|
| Modify | `src/pages/Index.tsx` | Taller hero, photo thumbnails in teasers, photo grid section, uploaded images |
| Modify | `src/pages/Admin.tsx` | Add Image Cache audit tab |
| Modify | `src/index.css` | Larger masthead sizing, photo grid styles |

No new dependencies. No database changes. Uses existing `ListingImage` component and `image_cache` table.

