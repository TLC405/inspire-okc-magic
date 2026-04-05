

# Newspaper-Architecture Rebuild — 3 Core Pages Only

## What Changes

Strip the app down to **three content pages** — Singles Events, Fitness, and Volunteering — plus the homepage. Remove all other pages (Coaching, Events aggregate, Stories, Ask, Explore, Info, MyApps, Podcast/Men-Talk). The entire visual language shifts to a **newspaper / broadsheet** aesthetic: columnar layouts, ruled dividers, masthead typography, datelines, and section headers that feel like a printed publication.

Each of the three pages gets comprehensive search and category filtering built directly into it — no separate Explore hub needed.

---

## Architecture

### Routes (after cleanup)

| Route | Page |
|---|---|
| `/` | Homepage — masthead + 3 section teasers |
| `/singles` | Singles Events directory with full search + filters |
| `/fitness` | Fitness directory with full search + filters |
| `/volunteering` | Volunteering directory with full search + filters |

### Deleted Pages
- `/explore` — functionality moves into each directory page
- `/events` — redundant aggregate, gone
- `/stories` — gone
- `/ask` — gone
- `/coaching` — gone
- `/info` — gone
- `/my-apps` — gone
- `/men-talk` — gone

### Deleted Files
`src/pages/Ask.tsx`, `src/pages/Coaching.tsx`, `src/pages/Events.tsx`, `src/pages/Explore.tsx`, `src/pages/Stories.tsx`, `src/pages/Info.tsx`, `src/pages/MyApps.tsx`, `src/pages/Podcast.tsx`

---

## Newspaper Design Language

### Typography
- Masthead: serif-inspired weight using Inter Black at extreme sizes with tight negative tracking — functions as a newspaper nameplate
- Section headers: all-caps with ruled lines above and below, like broadsheet section dividers
- Datelines: mono-data stamps showing "OKLAHOMA CITY · APRIL 2026" on each page
- Body: clean Inter at 15-16px with generous line-height (1.7)
- Column numbers: large bold numerals like newspaper article numbering

### Layout
- **Columnar grid**: 2-3 column layouts on desktop that feel like newspaper columns
- **Ruled dividers**: 2px black horizontal rules between sections, 1px vertical column dividers
- **Masthead bar**: top of each page with section name, dateline, and edition info
- **Sidebar panels**: filter controls in a left sidebar column on desktop (newspaper index style), stacked on mobile
- **Dense but readable**: tighter spacing than current, more content visible per viewport

### Color (newspaper-appropriate)
- Primary surface: near-white (#FAFAF7) with warm newsprint undertone
- Ink: deep black (#0A0A0A)
- Rules/dividers: solid black, 2px
- Accent: Thunder blue (#007DC3) used sparingly for links and active states
- Category badges: black text on light gray backgrounds
- Signal orange (#EF3B24) only for "LIVE" / "NEW" indicators

### Cards → Articles
Each listing becomes a "newspaper article" block:
- Bold headline
- Italic subhead (venue/org name)
- Neighborhood dateline in mono
- Body description
- Tags as small caps below a thin rule
- No card borders — separation via whitespace and horizontal rules only

---

## Page Details

### Homepage (`/`)
```
+----------------------------------------------------------+
|  ═══════════════════════════════════════════════════════  |
|              I N S P I R E                                |
|           OKLAHOMA CITY                                   |
|  ═══════════════════════════════════════════════════════  |
|  APRIL 5, 2026 · SATURDAY EDITION · 39 LISTINGS          |
|  ─────────────────────────────────────────────────────── |
|                                                          |
|  [Full-width search bar]                                 |
|  "Search singles events, fitness, volunteering..."       |
|                                                          |
|  ─── SINGLES ──────────── ─── FITNESS ──────────────── |
|  │ Speed Dating at...    │ │ Scissortail CrossFit     │ |
|  │ Singles Mixer at...   │ │ Lake Hefner Trail         │ |
|  │ → View all 17 events  │ │ → View all 12 spots      │ |
|  ────────────────────────  ────────────────────────────  |
|                                                          |
|  ─── VOLUNTEERING ──────────────────────────────────── |
|  │ Regional Food Bank · Habitat for Humanity · ...    │ |
|  │ → View all 10 organizations                        │ |
|  ─────────────────────────────────────────────────────── |
|                                                          |
|  ═══════════════════════════════════════════════════════  |
|  INSPIRE OKLAHOMA CITY · 405 · EST. 2024                 |
+----------------------------------------------------------+
```

- No splash screen animation (remove it)
- Static masthead, no hero image
- Search bar searches across all three directories, navigates to the matching page with query pre-filled
- 2-3 preview items from each directory in newspaper column layout
- Weather/city data line in the masthead area

### Singles Page (`/singles`)
```
+----------------------------------------------------------+
|  INSPIRE   [Singles] [Fitness] [Volunteering]         ☀  |
|  ═══════════════════════════════════════════════════════  |
|  SINGLES EVENTS                                          |
|  Oklahoma City · 17 Events · Live                        |
|  ─────────────────────────────────────────────────────── |
|                                                          |
|  SEARCH: [____________________________]                  |
|                                                          |
|  CATEGORY  │  FREQUENCY   │  NEIGHBORHOOD                |
|  All       │  All Events  │  All Areas                   |
|  Speed     │  Weekly      │  Bricktown                   |
|  Mixer     │  Monthly     │  Midtown                     |
|  Social    │  Seasonal    │  Paseo Arts                  |
|  Activity  │              │  ...                         |
|  Nightlife │              │                              |
|  ─────────────────────────────────────────────────────── |
|                                                          |
|  15 Results                                              |
|  ─────────────────────────────────────────────────────── |
|  1. Pre-Dating Speed Dating — Ages 24–39                |
|     Bricktown · Monthly · $30–$40                        |
|     Structured rounds, matched results emailed...        |
|     SPEED DATING · 24–39 · structured · popular          |
|     ────────────────────────────────────────────          |
|  2. Social Singles OKC Speed Dating — Ages 25–40        |
|     ...                                                  |
+----------------------------------------------------------+
```

- Full-text search across name, venue, description, tags
- Three filter dimensions: Category, Frequency, Neighborhood
- All filters visible simultaneously (not hidden behind dropdowns)
- Results as newspaper article blocks separated by rules
- Each result links out to source

### Fitness Page (`/fitness`) — same pattern
- Rename route from `/workouts` to `/fitness`
- Filters: Category (CrossFit, Outdoor, Running, Climbing, Gym, Yoga), Neighborhood
- Search across all fields
- Same newspaper article layout

### Volunteering Page (`/volunteering`) — same pattern
- Filters: Category (Food, Environment, Housing, Youth, Community, Homelessness), Neighborhood
- Search across all fields
- Same newspaper article layout

---

## Navigation
Simple top bar on all pages:
- **INSPIRE** masthead-style wordmark (left)
- **Singles · Fitness · Volunteering** (center/right) — plain text links, active state = underline
- Theme toggle stays (Signal/Editorial/Raw modes all get newspaper treatment adapted to their palette)

---

## Search Architecture
Each page has its own search that filters its own data in real-time (already mostly built, just needs text search added to Fitness and Volunteering pages, and neighborhood filtering).

Homepage search navigates to the most relevant page:
- Query contains "dating", "singles", "mixer" → `/singles?q=...`
- Query contains "gym", "crossfit", "run", "trail" → `/fitness?q=...`
- Query contains "volunteer", "food bank", "habitat" → `/volunteering?q=...`
- Otherwise → `/singles?q=...` (default)

---

## Files Summary

| Action | File |
|---|---|
| Rewrite | `src/index.css` — newspaper typography, ruled dividers, columnar utilities |
| Rewrite | `src/pages/Index.tsx` — masthead homepage with 3 section teasers + search |
| Rewrite | `src/pages/Singles.tsx` — full newspaper layout with 3-dimension filters + search |
| Rewrite | `src/pages/Workouts.tsx` → rename to Fitness, newspaper layout + filters + search |
| Rewrite | `src/pages/Volunteering.tsx` — newspaper layout + filters + search |
| Rewrite | `src/components/Navbar.tsx` — minimal masthead nav (3 links only) |
| Rewrite | `src/components/Footer.tsx` — newspaper-style footer rule |
| Rewrite | `src/components/SearchSurface.tsx` — smart routing search |
| Modify | `src/App.tsx` — remove deleted routes, add `/fitness` redirect from `/workouts` |
| Modify | `src/components/home/HeroSection.tsx` — remove or repurpose as masthead |
| Delete | `src/pages/Ask.tsx` |
| Delete | `src/pages/Coaching.tsx` |
| Delete | `src/pages/Events.tsx` |
| Delete | `src/pages/Explore.tsx` |
| Delete | `src/pages/Stories.tsx` |
| Delete | `src/pages/Info.tsx` |
| Delete | `src/pages/MyApps.tsx` |
| Delete | `src/pages/Podcast.tsx` |
| Delete | `src/components/MenTalkGate.tsx` |
| Delete | `src/components/home/LogoReveal.tsx` |
| Delete | `src/components/SplashScreen.tsx` |
| Keep | `src/data/singlesEvents.ts` — unchanged |
| Keep | `src/data/fitnessSpots.ts` — unchanged |
| Keep | `src/data/volunteerOrgs.ts` — unchanged |
| Keep | `src/components/SignalChip.tsx` — restyle as newspaper badges |
| Keep | `src/components/MetricRail.tsx` — restyle as dateline stats |
| Keep | `src/components/ThemeProvider.tsx` — keep 3 modes |
| Keep | `src/components/ThemeToggle.tsx` — keep |

