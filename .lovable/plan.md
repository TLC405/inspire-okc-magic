

# INSPIRE OKC -- Fix Routing + Create Directory Pages + Full Polish

## The Problem

Every directory item (01-05) on the homepage and Community page links to `/community#anchor` -- meaning clicking "Social Singles OKC" just scrolls you on the same Community overview page. There are no dedicated pages for each directory. The user wants each one to be its own world-class page.

Additionally, the user's approved plan edits mentioned renaming directories: "InPerson OKC", "Volunteering OKC", "Fitness OKC" -- these need to be reflected and each needs a proper route and page.

---

## What Gets Fixed

### 1. Create 4 New Dedicated Directory Pages

Each directory gets its own route and full-page layout in the brutalist style:

| Route | Page File | Directory |
|---|---|---|
| `/singles` | `src/pages/Singles.tsx` | Social Singles OKC |
| `/workouts` | `src/pages/Workouts.tsx` | Fitness OKC / OKC Workouts |
| `/volunteering` | `src/pages/Volunteering.tsx` | Volunteering OKC |
| `/coaching` | `src/pages/Coaching.tsx` | Coach TLC |
| `/men-talk` | (already exists) | Men-Talk OKC |

Each page follows the same world-class template:
- Dark hero section with directory number, name, accent heading, and subtitle
- Quote block with vertical accent bar
- "What You'll Find" section with 3-4 feature cards (brutalist grid, numbered)
- Neighborhoods section showing relevant OKC areas
- "Coming Soon" or launch-date box (Spring 2026)
- CTA section linking back to other directories
- Navbar + Footer

### 2. Fix All Routing

**`src/App.tsx`** -- Add 4 new routes:
- `/singles`
- `/workouts`
- `/volunteering`
- `/coaching`

**`src/components/home/HeroSection.tsx`** -- Update directory links:
- (01) Social Singles OKC -> `/singles`
- (02) OKC Workouts -> `/workouts`
- (03) Volunteering OKC -> `/volunteering`
- (04) Coach TLC -> `/coaching`
- (05) Men-Talk OKC -> `/men-talk` (already correct)

**`src/pages/Community.tsx`** -- Update program list links to point to dedicated pages instead of `#anchor` self-links.

**`src/components/Footer.tsx`** -- Update directory links in footer to match new routes.

### 3. Fix Console Errors

**`src/components/ScrollReveal.tsx`** -- The `forwardRef` warning comes from framer-motion's `motion.div` receiving refs fine, but React warns when `ScrollReveal` itself is used as a child that receives a ref. This is harmless but noisy -- no action needed since it's a React 18 warning with framer-motion that doesn't affect functionality.

### 4. Community Page Becomes the Hub

The Community page (`/community`) stays as the directory overview/index -- a hub linking out to each individual directory page. The program list items now link to `/singles`, `/workouts`, `/volunteering`, `/coaching`, and `/men-talk` respectively.

### 5. Navbar Update

Add the 5 directory routes to the Navbar's `isHeroPage` check so they get the transparent header treatment on their dark hero sections. This ensures consistent styling when visiting `/singles`, `/workouts`, etc.

---

## New Page Template (applied to all 4 new pages)

Each directory page follows this structure:

```text
+----------------------------------------------------------+
|  INSPIRE OKC    STORY  PROGRAMS  INFO    [theme toggle]   |
|                                                          |
|  [HERO: bg-primary, dark]                                |
|  REF: OKC-SINGLES-001                                    |
|  Directory (01)                                          |
|  Social Singles                                          |
|  OKC                          (accent color)             |
|  Subtitle text about the directory                       |
|                                                          |
|  [QUOTE BLOCK with accent bar]                           |
|  "Quote relevant to this directory"                      |
|                                                          |
|  [WHAT YOU'LL FIND - 3 brutalist cards in grid]          |
|  (01) Feature  (02) Feature  (03) Feature                |
|                                                          |
|  [OKC NEIGHBORHOODS strip]                               |
|  Midtown  Bricktown  Paseo  Plaza  ...                   |
|                                                          |
|  [LAUNCHING box - Spring 2026]                           |
|                                                          |
|  [CTA: Explore Other Directories -> /community]          |
|                                                          |
|  [FOOTER]                                                |
+----------------------------------------------------------+
```

---

## Files Summary

| Action | File | Details |
|---|---|---|
| Create | `src/pages/Singles.tsx` | Social Singles OKC directory page |
| Create | `src/pages/Workouts.tsx` | Fitness / OKC Workouts directory page |
| Create | `src/pages/Volunteering.tsx` | Volunteering OKC directory page |
| Create | `src/pages/Coaching.tsx` | Coach TLC directory page |
| Modify | `src/App.tsx` | Add 4 new routes |
| Modify | `src/components/home/HeroSection.tsx` | Fix directory links to `/singles`, `/workouts`, `/volunteering`, `/coaching` |
| Modify | `src/pages/Community.tsx` | Update program hrefs to dedicated page routes |
| Modify | `src/components/Footer.tsx` | Update directory links to new routes |
| Modify | `src/components/Navbar.tsx` | Add new routes to hero-page detection for transparent header |

