

# World-Class Theme Enhancement + Admin Simplification

## Overview
Three parallel workstreams: (1) elevate each theme with refined colors, unique typography feel, and per-theme accent behaviors; (2) atomic text sweep to eliminate inconsistencies; (3) radically simplify the admin panel from 13 tabs to 5 grouped sections.

---

## 1. Theme Upgrades — Each Gets a Distinct World-Class Identity

### Light (Broadsheet)
- Font: Cormorant Garamond (already set) — refine with lighter weight body, crisper contrast
- Warmer parchment background, subtle sepia tint on cards
- Accent: deep navy `210 85% 28%` — more authoritative
- Paper grain opacity up to 0.14 for tactile feel

### Dark (Night Desk)
- Font: Playfair Display (already set) — tighten tracking, add subtle glow on headings
- True OLED-friendly black: `220 20% 3%` background
- Brighter accent blue `205 100% 50%` for better contrast
- Sharper card borders, subtle blue rim light on hover

### Thunder (Game Day)
- Font: Oswald (already set) — increase weight to 800, all-caps forced on headings via CSS
- True OKC Thunder palette: `--background: 214 100% 8%`, `--accent: 16 100% 50%` (Sunset Orange), `--primary: 200 100% 50%` (Thunder Blue)
- Add `text-transform: uppercase` and `letter-spacing: 0.05em` to `.section-head` and `.headline` in Thunder
- Electric glow effect on accent elements: `box-shadow: 0 0 12px hsl(16 100% 50% / 0.3)`
- Scoreboard-style stat counters with tabular-nums

### Comets (Red/White/Blue)
- Font: Bitter (keep) — add condensed feel
- Correct OKC Comets colors: Primary red `0 85% 45%`, Blue `220 100% 35%`, White accents
- Star accent decorations on section dividers via CSS `::before` content
- Athletic slab-serif energy with bold rule-doubles

### Bricktown (Urban Warmth)
- Font: Change to `'Bitter'` for headings but add a new Google Font — `Archivo` for body to feel more industrial/warehouse
- Import `Archivo` font
- Warm brick orange `18 75% 48%`, iron grey accents `20 5% 35%`
- Exposed-brick texture grain (increase opacity to 0.15)
- Warmer card backgrounds `15 18% 15%`, rust-colored borders
- Industrial divider style: thicker rule-heavy with rust tint

### TLC (Love & Peace)
- Font: Quicksand (keep) — lighter weight 500 for body, softer roundness
- Palette: soft rose `345 25% 94%` bg, dusty mauve `340 35% 40%` primary, sage green `160 25% 45%` positive signal
- Rounded corners increased: `--radius: 0.625rem`
- Softer shadows with warm tint
- Gentle transitions (0.3s ease instead of 0.2s)
- No harsh blacks — darkest foreground is `340 20% 18%`

### Per-Theme CSS Overrides (new block in index.css)
Add theme-specific overrides for:
- `.thunder .section-head, .thunder .headline` → uppercase, wider tracking
- `.thunder .skeuo-card:hover` → electric glow shadow
- `.tlc .skeuo-card` → softer shadow, warmer border
- `.bricktown .rule-heavy` → rust-colored
- `.comets .rule-double` → red/blue alternating borders

---

## 2. Atomic Text Sweep

Scan all components for inconsistencies and standardize:
- **Font size classes**: Normalize all `text-[9px]`, `text-[10px]`, `text-[11px]` to use 3 atomic sizes: `text-[10px]`, `text-xs` (12px), `text-sm` (14px)
- **Tracking**: Standardize `tracking-[0.12em]`, `tracking-[0.15em]` etc to 2 values: `tracking-wider` and `tracking-widest`
- **Uppercase labels**: Ensure all use `.label-caps` or `.dateline` instead of inline combinations
- **ThemePanel descriptions**: Update to match each theme's new identity
- **ThemeToggle colors**: Match the swatch colors to actual CSS variable values

---

## 3. Admin Panel Simplification — 13 Tabs → 5

Current tabs: Briefing, Site Editor, Media, Feeds, Content, Visitors, Security, Audit, Graph, Newsroom, Moderation, AI Scanner, AI/Settings

### New Structure:

| Group | Contains | Icon |
|---|---|---|
| **Editorial** | Briefing + Newsroom + Feeds | Newspaper |
| **Site** | Site Editor + Media + Content | Settings |
| **Intelligence** | Graph + AI Scanner + Moderation | Brain |
| **Operations** | Visitors + Security + Audit | Shield |
| **AI Assistant** | AI Chat + Settings + Theme | Sparkles |

Each group renders as a single tab. Within each tab, the sub-sections stack vertically with collapsible `<details>` elements (using the `Collapsible` shadcn component), so everything is accessible but not overwhelming.

### Admin Header Cleanup
- Remove the 5-stat overview bar (redundant with individual sections)
- Replace with a single-line status: "142 listings · 38 entities · 12 feed items · Last scan 2h ago"
- Cleaner tab bar with just 5 items — no horizontal scroll needed

---

## Files Modified

| File | Change |
|---|---|
| `src/index.css` | Theme variable refinements for all 6 themes, per-theme override classes, add Archivo font import |
| `src/components/admin/ThemePanel.tsx` | Updated descriptions and swatch colors |
| `src/components/ThemeToggle.tsx` | No changes needed |
| `src/pages/Admin.tsx` | Restructure from 13 tabs to 5 grouped sections with collapsible sub-panels |

## Technical Notes
- All changes are CSS/component-level — no database or edge function changes
- Font imports use Google Fonts CDN (already established pattern)
- Per-theme CSS overrides use the existing `.thunder`, `.comets` etc class selectors
- Admin restructure preserves all existing sub-components (GraphEditor, NewsroomPanel, etc.) — only the tab navigation and layout wrapper changes

