

# Atomic Homepage Overhaul — Background, Typography, Spacing, Light Theme

## What's Wrong Now
- Background is flat/boring across all themes — just a solid color, no texture or depth
- Light theme feels washed out and lifeless
- Nameplate header ("INSPIRE") is too small with no breathing room
- Text across the homepage lacks hierarchy and visual weight
- No newspaper-like paper texture or warmth
- Homepage sections feel cramped and monotone

## What Gets Fixed

### 1. Rich Newspaper Backgrounds
- **All themes**: Add a visible paper-grain SVG noise overlay on `body` (bump opacity from 0.03 to 0.08 for dark, 0.12 for light)
- **Light theme**: Add a warm parchment radial gradient behind the grain — subtle cream-to-ivory vignette
- **Dark theme**: Add a deep ink-wash gradient — subtle dark blue-to-black vignette
- **Thunder/Comets**: Add team-tinted radial gradient overlays for depth
- Add a subtle horizontal fold-line across the mid-page (CSS `::after` on main) for newspaper realism

### 2. Light Theme Enhancement
- Warmer background: shift from `38 20% 92%` to `42 25% 94%` (warmer cream)
- Card backgrounds: richer ivory `42 22% 98%`
- Accent: deeper ink blue `210 85% 30%`
- Muted foreground: warmer `30 8% 45%` instead of neutral gray
- Border: warmer `40 12% 78%`
- Paper grain opacity increased to 0.12

### 3. Bigger Nameplate with Space
- Increase INSPIRE font-size from `clamp(2rem, 7vw, 4.5rem)` to `clamp(2.5rem, 9vw, 6rem)`
- Add more vertical padding: `py-4 md:py-8` (up from `py-2 md:py-4`)
- Increase max-height for collapse animation from `max-h-40` to `max-h-60`
- Widen the decorative rule lines flanking "Est. 2026" and "Oklahoma City"
- Add letter-spacing variation on hover for tactile feel

### 4. Homepage Section Spacing Overhaul
- Front page headline block: increase `pt-6 pb-5` (more breathing room)
- Section headers: bigger text `text-xl md:text-2xl`, thicker top rule `h-[3px]`
- Broadsheet columns: increase vertical padding `py-6 md:py-14` (from `py-4 md:py-10`)
- Photo grid: taller rows `160px` desktop (from `140px`)
- Pull quote: more vertical padding `py-10` (from `py-6`)
- Civic panels section: `py-8 md:py-12` (from `py-4 md:py-8`)
- Stats bar: more padding `p-6 md:p-10` (from `p-4 md:p-6`)
- FolioLine separators: more vertical padding `py-5` (from `py-3`)

### 5. Typography Upgrades
- Front page headline "Your Guide to Oklahoma City": bump to `clamp(2rem, 6vw, 3.8rem)`
- Section headers: add `text-ink-press` class for letterpress depth
- Body text on cards: slightly larger `text-[15px]` with better line-height
- Datelines and mono text: slightly warmer color in light theme
- Pull quote: bigger `clamp(1.1rem, 2.5vw, 1.5rem)`

### 6. Hero Carousel Enhancement
- Increase height from `h-[340px] md:h-[500px]` to `h-[380px] md:h-[560px]`
- Headline text bump: `clamp(1.8rem, 6vw, 3.5rem)` (from `clamp(1.5rem, 5vw, 3rem)`)

## Files Modified

| File | Changes |
|---|---|
| `src/index.css` | Paper-grain overlay boost, light theme color warmth, body background gradients, section spacing utilities |
| `src/components/Navbar.tsx` | Bigger nameplate size + padding, wider decorative lines, larger max-h for collapse |
| `src/pages/Index.tsx` | Spacing increases on every section, bigger headline, typography class upgrades |
| `src/components/HeroCarousel.tsx` | Taller hero, bigger headline text |

No new dependencies. Pure CSS and className changes.

