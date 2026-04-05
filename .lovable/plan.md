# Massive Fitness Data Expansion + Mobile-Optimized Homepage

## Problems

1. **Missing categories**: The user's research shows 29 fitness categories with 337+ organizations. Current data has only 19 categories and ~100 spots. Missing: Infrared/HOTWORX, BJJ (separate from MMA), Powerlifting/Strongman, Tai Chi/Mind-Body, Senior/Adaptive, Kids/Family/Ninja, Aerial Fitness, Stretch/Recovery (as distinct), Community Rec Centers, Outdoor Fitness Parks, Luxury/Resort-Style, Women-Only, Sports-Specific Training, Strength & Conditioning, Hybrid/Boutique.
2. **No "Districts" concept**: Fitness spots aren't grouped by district/area in a browseable way.
3. **Homepage is cluttered on mobile**: Three-column teasers + 5-column Discover grid + edition bar all stack vertically into a wall of text on small screens.

## Plan

### 1. Expand Fitness Categories & Data (~200+ new entries)

Add 10 new categories to the type and category list:

- `Infrared` (HOTWORX locations)
- `BJJ` (Brazilian Jiu-Jitsu, split from Martial Arts)
- `Powerlifting` 
- `Mind-Body` (Tai Chi, meditation movement)
- `Senior/Adaptive`
- `Kids/Family`
- `Aerial`
- `Stretch`
- `Rec Center` (9 public centers)
- `Sports Training`

Research and add ~200 more verified spots across these categories plus filling gaps in existing ones (more gyms like 10GYM, Crunch, Gold's, Planet Fitness locations; more yoga studios; more dance studios; aquatics/pools).

### 2. Add District Browsing to Fitness Page

Add a "Districts" filter section showing OKC fitness districts as tappable areas:

- **Midtown** — yoga/barre/boutique corridor
- **Automobile Alley** — boxing/CrossFit concentration  
- **Bricktown** — big-box gyms, climbing
- **NW Expressway** — chain gym strip (Planet Fitness, 10GYM, Crunch)
- **Edmond/North** — family fitness, rec centers
- **Moore/South** — martial arts, bootcamps
- **Paseo/Plaza** — dance studios, aerial
- **Downtown** — luxury/resort gyms

These map to neighborhoods already in the data, presented as a horizontal scrollable district bar.

### 3. Mobile-First Homepage Redesign

**Current problem**: On mobile (740px viewport), the 3-column teasers stack into 3 long sections, then the 5-column Discover grid stacks into 5 blocks. Way too much scrolling.

**Fix**:

- **Masthead**: Tighten padding, smaller on mobile
- **Directory teasers**: Show only 1 preview item per section on mobile (not 3), with a compact card layout instead of article blocks
- **Discover section**: Horizontal scrollable row on mobile instead of stacking 5 cards vertically
- **Add a quick-nav row** below search: 3 tappable cards (Singles / Fitness / Volunteering) with counts, replacing the verbose teasers on mobile
- **Bottom edition bar**: Hide on mobile, it's noise

### 4. Fitness Page Category UX Improvement

With 29 categories, the filter chips become overwhelming. Replace with:

- A **scrollable category bar** with icons (horizontal scroll on mobile)
- **Grouped sections**: "Popular" (Gym, CrossFit, Yoga, HIIT), "Combat" (Boxing, MMA, BJJ), "Movement" (Dance, Aerial, Pilates, Barre), "Outdoor" (Running, Cycling, Outdoor, Pickleball, Tennis, Swimming), "Specialty" (Powerlifting, Sports Training, Mind-Body, Senior, Kids, Stretch, Infrared, Rec Center)
- Collapsible group headers so users can drill into what they want

vasa isnt open 24-/7 so always fact check and have ai alwasy check sites information to keep app updated alwyas. add admin section for me to edit the app deirtslla and things and cool stuff in app like send notifiatns, 

## Files


| Action        | File                       | Details                                                                           |
| ------------- | -------------------------- | --------------------------------------------------------------------------------- |
| Major rewrite | `src/data/fitnessSpots.ts` | Add ~200 new entries, 10 new categories, update type union                        |
| Modify        | `src/pages/Workouts.tsx`   | District bar, grouped category filter, mobile-optimized cards                     |
| Modify        | `src/pages/Index.tsx`      | Mobile-first layout: compact teasers, horizontal scroll Discover, quick-nav cards |
| Modify        | `src/index.css`            | Add horizontal-scroll utility, district-chip styles, mobile breakpoint overrides  |
