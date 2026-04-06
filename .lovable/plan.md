

# Fix Homepage: Visible Newspaper Headline + Hero Photo

## Problems

1. **Newspaper headline hidden** — The hero content sits behind the sticky navbar. The masthead text ("INSPIRE OKLAHOMA CITY" style headline, date, listings count) is at the bottom of the hero but gets obscured. Need to push the main content below the navbar and add a proper newspaper-style headline section visible immediately on scroll.

2. **OKC skyline photo not prominent enough** — The hero image exists but the gradient is too dark and the photo doesn't feel like the centerpiece. Need to make it more prominent and ensure the full skyline sunset is visible.

## Changes

### 1. Add Newspaper Front Page Section Below Hero (src/pages/Index.tsx)
- Add a full-width newspaper "front page" section below the hero with:
  - A bold **headline** in Playfair Display (e.g., "Your Guide to Oklahoma City" or the day's edition tagline)
  - **Subheadline** with date, edition info, listing count — classic broadsheet style
  - Decorative rules (heavy top, thin bottom) framing the headline
- This gives the user the "full newspaper" feel they're asking for — a visible, readable headline block

### 2. Fix Hero Overlap (src/pages/Index.tsx)
- Lighten the gradient overlay from `from-black/60` to `from-black/40` so the skyline sunset photo is more vivid
- Keep the hero height at `340px` mobile / `500px` desktop
- Move the dateline/listings count info from the hero overlay into the new newspaper headline section below, so nothing competes with the photo

### 3. Make Hero Photo the Centerpiece
- Remove the text overlay from the hero entirely — let the OKC skyline sunset photo speak for itself as a full-bleed image
- The newspaper headline section directly below serves as the "front page" masthead content

## Files

| Action | File | Details |
|---|---|---|
| Modify | `src/pages/Index.tsx` | Remove hero text overlay, lighten gradient, add newspaper headline section below hero |

No database changes. No new dependencies.

