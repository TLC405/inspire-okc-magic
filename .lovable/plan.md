

# INSPIRE Oklahoma City — 10× System Rebuild

## Current State

The site currently has a "Blueprint Brutalist" aesthetic with 5 directory pages, a community hub, story, info, podcast, and my-apps pages. It uses three themes (light/dark/thunder) with warm terracotta accents. Every page follows the same template: dark hero → quote block → feature cards → neighborhoods → launching box → CTA → footer.

The blueprint demands a fundamentally different product: a **civic intelligence interface** with a search-first homepage, Thunder-derived color system, multiple visual operating modes, and an architecture that supports events, places, maps, stories, and AI-driven planning.

## Scope Decision

The full blueprint describes a $250k product. This implementation focuses on **Phase 1 + Phase 2**: the design system foundation and core experience prototypes that transform the site from a directory listing into a premium operating interface.

---

## What Gets Built

### 1. Thunder-Derived Color System

Replace the current warm terracotta palette with the official Thunder-derived system as CSS custom properties:

- `--bg-0: #06080D` (near-black navy)
- `--bg-1: #0A1020` (midnight navy)  
- `--bg-2: #101827` (primary dark surface)
- `--panel-0: #F7F5F0` (warm editorial paper)
- `--signal-primary: #007DC3` (Thunder blue — navigation, active states)
- `--signal-secondary: #EF3B24` (orange — live activity, energy, featured)
- `--signal-highlight: #FDBB30` (yellow — premium, recommended)
- `--signal-positive: #2DBB7F` (green — positive states)

Three theme modes via CSS classes:
- **Signal** (default): deep navy environment, blue active system, orange energy accents
- **Editorial**: warm paper base, black dividers, magazine typography
- **Raw**: monochrome utility, compressed density

### 2. Typography Overhaul

Maintain Inter but establish strict hierarchy roles:
- `display-hero`: 72–120px desktop / 40–56px mobile, font-black, tight tracking
- `display-section`: 40–64px desktop / 28–36px mobile
- `title`: 24–32px, precise, modern
- `body`: 14–16px, neutral, readable
- `mono/data`: monospaced, 10–12px, for time codes, metrics, tags

### 3. Homepage — Signal Hero Redesign

Transform from directory listing to **city intelligence entry point**:

```text
+----------------------------------------------------------+
|  INSPIRE    [Home] [Explore] [Events] [Stories] [Ask]  ⚡  |
|                                                          |
|  ┌──────────────────────────────────────────────────┐    |
|  │  What are you looking for in Oklahoma City?       │    |
|  │  [________________________________] [Search]      │    |
|  │                                                    │    |
|  │  Tonight · This Weekend · Near Me · Date Night    │    |
|  └──────────────────────────────────────────────────┘    |
|                                                          |
|  ── CITY PULSE ─────────────────────────────────────     |
|  [Live Ticker: weather, time, Thunder, city data]        |
|                                                          |
|  ── DIRECTORIES ────────────────────────────────────     |
|  (01) Singles  (02) Fitness  (03) Volunteer              |
|  (04) Coach    (05) Men-Talk                             |
|                                                          |
|  ── FEATURED ───────────────────────────────────────     |
|  [Large editorial card]  [Signal cards x2]               |
|                                                          |
|  ── NEIGHBORHOODS ──────────────────────────────────     |
|  Midtown · Bricktown · Paseo · Plaza · Deep Deuce       |
+----------------------------------------------------------+
```

Key changes:
- Search/command surface is the **dominant element** (not the logo)
- LogoReveal stays but is repositioned as a cinematic intro that fades into the search surface
- Quick-access chips: Tonight, This Weekend, Near Me, Date Night, Coffee, Fitness, Free
- City Pulse module with live ticker data presented as signal metrics (not just a scrolling marquee)
- Directory grid is secondary, below the fold
- Featured content module (placeholder for future editorial/events)
- Neighborhood heatmap teaser strip

### 4. Navigation Restructure

Replace current nav (Story, Programs, My Apps, Info) with the product navigation:

| Label | Route | Purpose |
|---|---|---|
| Home | `/` | Signal hero + city pulse |
| Explore | `/explore` | Browse-first category discovery (replaces `/community`) |
| Events | `/events` | Event index (new, placeholder) |
| Stories | `/stories` | Editorial journal (replaces `/story`) |
| Ask Inspire | `/ask` | AI conversational planning (new, placeholder) |
| Info | `/info` | FAQ + contact (stays) |

Directory pages (`/singles`, `/workouts`, `/volunteering`, `/coaching`, `/men-talk`) remain accessible but are reached through Explore, not top-level nav.

### 5. Explore Page (replaces Community)

Redesign `/community` → `/explore` as a premium browse interface:

- Category pills at top: Tonight, This Weekend, Fitness, Social, Service, Coaching, Conversations
- Large featured module (not uniform cards)
- Directory items presented as signal objects with energy indicators
- Search integrated at top

### 6. Events Index (Placeholder)

New `/events` page with:
- "Coming Soon" state but structured with the filter rail, date switcher, and modular list layout
- Shows the architecture of what's coming
- Links to directories as current "event sources"

### 7. Ask Inspire (Placeholder)

New `/ask` page with:
- Single dominant input field
- Suggested prompts: "Find something fun tonight", "Best coffee near Scissortail", "Good first date spots"
- "Launching Soon" state with the AI experience architecture visible

### 8. Stories Page (replaces Story)

Rename route `/story` → `/stories`, redesign as editorial journal:
- Hero feature with large image treatment
- Magazine-scale typography
- Sparse metadata and captions
- The manifesto content reorganized as the first "story"

### 9. Directory Pages — Upgrade All 5

Each directory page gets upgraded from the cookie-cutter template to feel distinct:
- **Singles**: warm, social energy, orange accents heavier
- **Fitness**: bold, energetic, movement imagery language
- **Volunteering**: grounded, community-focused, green signal accents
- **Coaching**: refined, personal, structured
- **Men-Talk**: stays gated, tightened

Each gets a "signal strip" showing placeholder metrics (events count, active members, neighborhoods served).

### 10. Component Upgrades

- **Search Surface**: new prominent search component with command-palette styling
- **Signal Chip**: reusable chip component for "LIVE NOW", "FREE", "TRENDING", "NEAR ME"
- **Metric Rail**: horizontal stat display for city pulse data
- **Event Object** (placeholder): card component with title, datetime, neighborhood, category, energy score
- **CTA buttons**: primary (filled), secondary (outlined), tertiary (text-only) hierarchy

### 11. Motion System Refinement

- Signal Motion: pulse points on live data, flowing traces
- Editorial Motion: controlled fades, subtle parallax
- System Motion: snap transitions, panel slides
- Remove any bouncy/toy-like animations

### 12. Footer Redesign

Premium minimal footer matching the operating system aesthetic:
- INSPIRE Oklahoma City wordmark
- Navigation links
- Directory links
- City metadata (405, population, neighborhoods)
- No clutter

### 13. 404 Page

Already solid — minor refinement to use the new color tokens.

### 14. My Apps

Keep at `/my-apps` but remove from primary nav. Accessible via footer or direct URL.

---

## Files Summary

| Action | File | Details |
|---|---|---|
| Modify | `src/index.css` | Thunder-derived color tokens, 3 mode classes (signal/editorial/raw) |
| Modify | `tailwind.config.ts` | Extended tokens, typography utilities, new animation keyframes |
| Modify | `src/components/ThemeProvider.tsx` | Switch themes to signal/editorial/raw |
| Modify | `src/components/ThemeToggle.tsx` | New mode cycling |
| Modify | `src/components/home/HeroSection.tsx` | Full redesign as Signal Hero with search surface |
| Modify | `src/components/home/LogoReveal.tsx` | Repositioned, fades after intro |
| Modify | `src/components/home/LiveTicker.tsx` | Upgraded to signal metrics display |
| Modify | `src/components/Navbar.tsx` | New nav structure (Home, Explore, Events, Stories, Ask) |
| Modify | `src/components/Footer.tsx` | Premium minimal redesign |
| Create | `src/components/SearchSurface.tsx` | Command-palette style search |
| Create | `src/components/SignalChip.tsx` | Reusable signal chip |
| Create | `src/components/MetricRail.tsx` | Horizontal stat display |
| Modify | `src/pages/Index.tsx` | Use redesigned HeroSection |
| Create | `src/pages/Explore.tsx` | Replaces Community as browse hub |
| Create | `src/pages/Events.tsx` | Event index placeholder |
| Create | `src/pages/Ask.tsx` | AI planning placeholder |
| Modify | `src/pages/Story.tsx` | Rename to Stories, editorial redesign |
| Modify | `src/pages/Singles.tsx` | Unique identity, signal strip |
| Modify | `src/pages/Workouts.tsx` | Unique identity, signal strip |
| Modify | `src/pages/Volunteering.tsx` | Unique identity, signal strip |
| Modify | `src/pages/Coaching.tsx` | Unique identity, signal strip |
| Modify | `src/pages/Podcast.tsx` | Minor tightening |
| Modify | `src/pages/Info.tsx` | New color tokens |
| Modify | `src/pages/NotFound.tsx` | New color tokens |
| Modify | `src/pages/MyApps.tsx` | Remove from primary nav, keep page |
| Modify | `src/App.tsx` | New routes: `/explore`, `/events`, `/stories`, `/ask`; redirect `/community` → `/explore`, `/story` → `/stories` |
| Modify | `src/components/SplashScreen.tsx` | Ensure it works with new color system |
| Modify | `src/components/ScrollReveal.tsx` | Tighten motion per doctrine |

---

## What This Does NOT Include (Future Phases)

- Real event/place/person data models (needs Supabase)
- Map integration (needs MapLibre)
- AI chat backend (needs edge functions + AI provider)
- User auth and personalization
- Real search with semantic embeddings
- Admin/operator views
- Content management

These require backend infrastructure and will be Phase 3–5.

