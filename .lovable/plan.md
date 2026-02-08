

# INSPIRE OKC — World-Class Brutalist Overhaul Built with TLC.

This is a major upgrade touching every page: a 3D logo reveal on the homepage, three professional theme modes (Light, Dark, Thunder), a community-data-driven feel with real OKC info, and a gated Men-Talk OKC section requiring access code `73507`. The reference screenshot shows massive stacked "INSPIRE / OKC" typography with a cinematic quote block and accent sidebar — that energy drives the whole redesign.

---

## 1. Homepage: Static Photo + Blueprint Layout

The homepage becomes a single full-viewport composition. No scrolling. Your OKC photo is fixed behind everything.

### 3D Logo Title Reveal

On page load, "INSPIRE" and "OKC" animate in using Framer Motion with a cinematic sequence:
- Letters scale from 1.5x down to 1x with blur-to-sharp (filter blur transition)
- "INSPIRE" slides in from left, "OKC" from right, both with staggered letter reveals
- A vertical accent bar (terracotta) wipes in from top to bottom
- The quote fades up after the logo settles: *"The city is a chassis. We are the architects."*
- Total animation: ~2.5 seconds, then the rest of the UI fades in

### Layout Structure (single viewport, no scroll)

```text
+----------------------------------------------------------+
|  INSPIRE OKC [logo]     STORY  PROGRAMS  INFO  [theme]   |
|                                                          |
|         I N S P I R E                                    |
|              O K C        (3D reveal animation)          |
|                                                          |
|  |  "The city is a chassis.                              |
|  |   We are the architects."                             |
|                                                          |
|  ---- marquee ticker: NO DUES / NO CLUB / OKC METRO --- |
|                                                          |
|  (01) SOCIAL SINGLES OKC    (02) OKC WORKOUTS  (03) VOLUNTEERING OKC |
|  (04) COACH TLC  (05) MEN-TALK OKC                        |
|                                                          |
|  [ BROWSE DIRECTORIES ]                                  |
|                                                          |
|  Community. Connection. Health.          (c) INSPIRE OKC |
+----------------------------------------------------------+
```

Background: `hero-bg.jpg` set as `fixed`, `object-cover`, filling viewport. Dark overlay ~70%.

### OKC Community Data Baked In

Real Oklahoma City data embedded throughout to make it feel rooted:
- Population: 700,000+ (metro 1.4M)
- OKC zip codes in the marquee ticker or reference labels
- "REF: OKC-73507" as a monospaced document reference
- "EST. 2024" or similar structural label
- Neighborhoods/areas mentioned: Midtown, Bricktown, Paseo, Plaza District, NW OKC

---

## 2. Three Theme Modes: Light, Dark, Thunder

A theme toggle in the navbar (sun/moon/zap icons) cycles through three modes. Using `next-themes` (already installed) with a custom provider.

### Light Theme (current warm off-white)
- Background: warm off-white `hsl(40 20% 98%)`
- Foreground: near-black
- Accent: terracotta/rust

### Dark Theme (current)
- Background: `hsl(20 8% 5%)` deep warm black
- Foreground: warm off-white
- Accent: brighter terracotta

### Thunder Theme (new, premium)
- Background: `hsl(230 15% 8%)` — deep navy-charcoal
- Foreground: `hsl(45 20% 90%)` — warm ivory
- Cards: `hsl(230 12% 11%)` — slightly lighter navy
- Accent: `hsl(45 90% 55%)` — electric gold/amber
- Borders: `hsl(230 10% 18%)` — subtle steel blue-gray
- Muted text: `hsl(230 8% 45%)` — cool gray
- Selection: gold tint
- Overall feel: like a luxury sports app or premium editorial — dark but warm with gold accents, sophisticated and bold

All three themes use the same CSS variable system. The Thunder theme is a new `.thunder` class alongside `.dark`.

---

## 3. Men-Talk OKC: Login Code Gate

The ULTIMATE MENS RESOURCE/ page gets a code-entry gate before showing content:
- Full-screen overlay with the heading "MEN-TALK OKC" and a subtitle: "This space requires an access code."
- A single input field for the code (styled brutalist: 2px border, monospaced, large)
- Code: `73507` (hardcoded for now, can move to env/backend later)
- On correct entry: stores in `localStorage` so you don't re-enter each visit
- On wrong code: subtle shake animation, "Invalid code" message
- Once authenticated: shows the Men-Talk content

---

## 4. Creative Quote Block (Reference Screenshot Style)

Inspired by the uploaded reference: a vertical terracotta accent bar on the left with a large italic quote beside it. This pattern appears on:
- Homepage: *"The city is a chassis. We are the architects."*
- Story page: similar structural quote
- Community page: could use *"The problem isn't a lack of people. It's the friction of finding them."*

CSS: a `border-l-4 border-accent pl-8` with `italic text-3xl md:text-5xl font-light` text.

---

## 5. All Pages: Brutalist Polish Pass

Every page gets upgraded typography, spacing, and the theme system applied:

- **Navbar**: Theme toggle button added (cycles light/dark/thunder). On homepage, navbar is transparent over the photo. Theme toggle uses `Sun`, `Moon`, `Zap` icons.
- **Footer**: Tighter, more data-panel styled. Add OKC area code "405" and zip reference.
- **Story page**: Add the cinematic quote block. Keep minimal — hero + quote + footer.
- **Community page**: Push typography harder. Add numbered indices `(01)` through `(05)` on program rows.
- **Info page**: Already solid, just ensure theme variables work on Thunder. i WANT ELOGANT SMALL FONT BUT NOT TOO CURSIVE. 

---

## 6. Technical Implementation

### Files Created
| File | Purpose |
|---|---|
| `src/components/ThemeProvider.tsx` | Custom theme provider wrapping `next-themes` to support 3 themes (light, dark, thunder) |
| `src/components/ThemeToggle.tsx` | Cycle button: Sun -> Moon -> Zap icons |
| `src/components/home/LogoReveal.tsx` | Framer Motion 3D logo animation component |
| `src/components/MenTalkGate.tsx` | Access code input overlay for Men-Talk OKC |

### Files Modified
| File | Change |
|---|---|
| `src/index.css` | Add `.thunder` theme variables (navy/gold palette). Add `@keyframes marquee` for ticker. Add quote-block utility classes. |
| `src/App.tsx` | Wrap with `ThemeProvider` |
| `src/pages/Index.tsx` | Replace with single-viewport blueprint layout using `LogoReveal`, marquee, directory grid, quote block. Remove Navbar/Footer (homepage has its own inline nav). |
| `src/components/home/HeroSection.tsx` | Complete rewrite: full-viewport fixed background, inline header with theme toggle, LogoReveal, quote block, numbered directory grid, marquee ticker, bottom footer line. `h-screen overflow-hidden`. |
| `src/components/Navbar.tsx` | Add `ThemeToggle` component. Hide entirely on homepage (blueprint has its own nav). |
| `src/pages/Podcast.tsx` | Wrap content with `MenTalkGate` — code `73507` required to view |
| `src/pages/Community.tsx` | Add numbered indices `(01)-(05)` to program rows. Add quote block. Ensure Thunder theme works. |
| `src/pages/Story.tsx` | Add cinematic quote block with vertical accent bar. |
| `src/pages/Info.tsx` | Verify all three themes render correctly. |
| `src/components/Footer.tsx` | Add "405" area code reference. Ensure Thunder theme styling. |
| `tailwind.config.ts` | No changes needed — CSS variables handle theming. |
| `index.html` | Add script to prevent flash of unstyled content (FOUC) for theme. |

### OKC Data Points Used
- Population: 700,000+ city / 1.4M metro
- Area code: 405
- Zip reference: 73507 (also the Men-Talk access code — intentional)
- Key neighborhoods: Midtown, Bricktown, Paseo, Plaza District
- State: Oklahoma (OK)
- Nickname: "The Big Friendly"

### Animation Details (LogoReveal)
Using Framer Motion (already installed):
- "INSPIRE" text: `initial={{ x: -100, opacity: 0, filter: "blur(20px)" }}` -> `animate={{ x: 0, opacity: 1, filter: "blur(0px)" }}` with spring physics
- "OKC" text: same but from right, in accent color, delayed 0.3s
- Vertical accent bar: `scaleY` from 0 to 1, origin top
- Quote text: fade up after 1.5s delay
- Directory grid + UI: fade in after 2s delay
- All using `motion.div` with `variants` for orchestration

