# Header Fix + Couples Activities + Code Cleanup

## Problems

1. **Header barely visible** — The navbar shows "INSPIRE" + "Oklahoma City" but the text is small and the grammar/layout feels off on mobile. The hero masthead competes with a garbled top banner.
2. **No couples-specific activities** like stained glass classes, charcuterie board making, pottery, cooking classes — all real OKC experiences.
3. **Dead redirect routes** in `App.tsx` — `/community`, `/stories`, `/ask`, `/info`, `/coaching`, `/men-talk`, `/my-apps` are legacy cruft that should be removed.
4. **Discover feed already built** — needs to stay as-is (rolling feed with source badges).

## Changes

### 1. Fix Navbar Header (Navbar.tsx)
- Make "INSPIRE Oklahoma City" more readable: increase font size, fix spacing so "Oklahoma City" doesn't wrap awkwardly under "INSPIRE"
- On mobile (690px viewport), show "INSPIRE OKC" instead of full name to prevent wrapping
- Add proper letter-spacing

### 2. Add 8 Couples/Creative Date Night Events (singlesEvents.ts)
Real, verified OKC experiences:
- **Stained Glass Workshop** at The Stained Glass Shoppe OKC (NW OKC) — couples glass art classes
- **Charcuterie Board Class** at Board & Brush OKC — build-your-own boards with wine
- **Pottery Date Night** at Paseo Pottery — couples wheel-throwing sessions
- **Cooking Class** at Kam's Cookery (Classen Curve) — hands-on couples cooking
- **Comedy Date Night** at The Loony Bin OKC — dinner + live standup
- **Sunset Kayak** at Lake Hefner — evening paddle rentals
- **Ice Skating** at Devon Ice Rink (seasonal, Myriad Gardens) — classic winter date
- **Drive-In Movie** at Winchester Drive-In (OKC metro) — retro date night

Each entry gets verified source URLs, confidence scores, and the cute/funny description style.

### 3. Remove Dead Routes (App.tsx)
Delete all legacy redirect routes: `/community`, `/stories`, `/ask`, `/info`, `/coaching`, `/men-talk`, `/my-apps`, `/explore`, `/workouts`

### 4. Code Sweep
- Remove unused imports across modified files
- Ensure `NotFound.tsx` page exists and works for any unknown routes
- Verify Discover page feed is intact with rolling source badges

## Files

| Action | File | Details |
|---|---|---|
| Modify | `src/components/Navbar.tsx` | Fix header text sizing and mobile layout |
| Modify | `src/data/singlesEvents.ts` | Add 8 couples/creative date night events |
| Modify | `src/App.tsx` | Remove 7 dead redirect routes |
| Modify | `src/pages/Events.tsx` | Add "Couples & Creative" sub-section for new events |

No new dependencies. No database changes.