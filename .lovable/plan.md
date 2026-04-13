

# Install Momento Mori App Natively + Enhance It

## Overview
Port the full **Memento Mori** quest/map app from the OKC Street Stories project directly into this codebase as a standalone page at `/momento-mori`. No iframe -- the full app runs natively with all its interactive SVG map, quest system, city markers, and quest detail panels.

## What the App Is
A "tactical quest map" of the Great Plains region (OK, TX, CO, KS, AR, MO, NM) with:
- A hand-drawn parchment-style SVG map with mountains, rivers, forests, roads, state borders
- Interactive city markers and quest star markers
- 20 quests across 5 tiers (Legendary → Standard) with images, briefings, objectives, intel
- Quest detail panel with scrollable content
- Compass rose, scale bar, title cartouche, legend

## Plan

### 1. Copy all assets (20 quest images) from OKC Street Stories
Copy all 20 `src/assets/quests/*.jpg` files into this project at `src/assets/momento-mori/quests/`.

### 2. Create data files
- `src/data/momento-mori/cities.ts` -- 24 cities with map positions
- `src/data/momento-mori/quests.ts` -- 20 quests with tier system, updated image imports
- `src/data/momento-mori/districts.ts` -- 13 OKC districts with street legends

### 3. Create map components
Under `src/components/momento-mori/map/`:
- `MapDefs.tsx` -- SVG filters (parchment noise, hand-drawn, ink bleed)
- `MapBackground.tsx` -- Parchment gradient with age spots and vignette
- `StateBorders.tsx` -- Dashed state boundary lines
- `Rivers.tsx` -- Arkansas, Red, Canadian, Rio Grande, etc.
- `Mountains.tsx` -- Rockies, Wichitas, Ouachitas, etc.
- `Forests.tsx` -- Tree clusters for forest regions
- `Roads.tsx` -- Route 66, I-35, I-40, etc.
- `StateLabels.tsx` -- State names and geographic region labels
- `CompassRose.tsx` -- Cardinal direction compass
- `TitleCartouche.tsx` -- "THE GREAT PLAINS" banner
- `ScaleBar.tsx` -- Distance scale
- `MapFrame.tsx` -- Double border with corner ornaments
- `MapLegend.tsx` -- Quest tier and settlement legends
- `CityMarkers.tsx` -- Interactive city dots
- `QuestMarkers.tsx` -- Star-shaped quest markers with tooltips

### 4. Create main components
Under `src/components/momento-mori/`:
- `RegionalMap.tsx` -- Assembles all map layers + interactive markers
- `QuestPanel.tsx` -- Quest detail panel with image header, briefing, objectives, intel

### 5. Rebuild the MomentoMori page (`src/pages/MomentoMori.tsx`)
Replace the current placeholder/iframe page with the full native app:
- Header with skull icon, "MEMENTO MORI" title, back-to-Inspire link, quest list toggle
- Full-viewport SVG map with all interactive elements
- Quest panel sidebar when a quest is selected
- Mobile sheet menu for quest list
- Footer motto bar

### 6. Add Momento Mori CSS variables
Add the parchment/ink/tier/map CSS variables and font imports (Cinzel, Orbitron, Roboto Condensed) to the page's scoped styles, plus tactical utility classes (`.tactical-glow`, `.tier-*` badges).

### 7. Enhancements over the original
- **Smoother map interactions**: Add zoom/pan with CSS transforms
- **Better mobile UX**: Full-screen map with bottom sheet for quests instead of sidebar
- **TLC branding integration**: Add a "TLC Presents" badge in the title cartouche
- **Animated quest markers**: Subtle pulse animation on legendary quest stars
- **Back navigation**: Clean "← Back to Inspire" link in header

### 8. Header flicker fix (already done in previous edit)
The Navbar scroll-collapse was already fixed by removing opacity transitions. Will verify it's still working.

## Files Created/Modified

| File | Action |
|---|---|
| `src/assets/momento-mori/quests/*.jpg` (20 files) | Copy from OKC Street Stories |
| `src/data/momento-mori/cities.ts` | Create |
| `src/data/momento-mori/quests.ts` | Create |
| `src/data/momento-mori/districts.ts` | Create |
| `src/components/momento-mori/map/*.tsx` (15 files) | Create |
| `src/components/momento-mori/RegionalMap.tsx` | Create |
| `src/components/momento-mori/QuestPanel.tsx` | Create |
| `src/pages/MomentoMori.tsx` | Rewrite (replace placeholder) |
| `src/index.css` | Add scoped Momento Mori CSS variables |

## Technical Notes
- All dependencies (lucide-react, shadcn/ui components) already exist in this project
- Fonts loaded via Google Fonts CSS import (Cinzel, Orbitron, Roboto Condensed)
- Map uses custom Tailwind color classes scoped via CSS variables
- No new npm packages needed
- The Momento Mori page is self-contained -- no interference with the rest of Inspire OKC

