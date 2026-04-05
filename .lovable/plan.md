

# UI Upgrade: Masthead Visibility, Numbering Fix, Visual Polish

## Problems Found

1. **Masthead text invisible on light theme** — "INSPIRE" and "Oklahoma City" use `text-foreground` over a bright skyline photo with only a subtle gradient overlay. On the editorial (light) theme the dark text blends into the bright sky. Needs a strong dark overlay or white text with text-shadow.

2. **"02" next to Speed Dating** — The homepage Singles column filters for `verified` events and shows indices 01–04, but the first 4 verified events are ALL Speed Dating variants. The numbering itself works correctly (starts at 01, scrolled off screen in the screenshot), but the content lacks diversity. The teaser should show one event per category to give a better representation.

3. **No images in the three-column teaser** — The broadsheet columns are text-only. A newspaper would have at least a lead photo per section.

4. **Overall visual flatness** — Cards in the Discover section and directory teasers lack imagery, depth, and newspaper texture. The gap between the hero and the columns is too large (empty white space).

## Changes

### 1. Fix Hero Masthead Contrast (Index.tsx + index.css)
- Change gradient overlay to `from-black/60 via-black/40 to-background` so the skyline gets a dark wash
- Make masthead text white (`text-white`) with `text-shadow: 0 2px 12px rgba(0,0,0,0.5)` for legibility on any background
- Add a new `.masthead-shadow` utility class in CSS

### 2. Diversify Homepage Singles Teaser (Index.tsx)
- Instead of `singlesEvents.filter(verified).slice(0,4)`, pick one event per unique category (Speed Dating, Mixer, Social, Dance, Activity, Faith) — take the first verified from each, limit to 4
- This prevents 4 identical "Speed Dating" entries and showcases the variety

### 3. Add Lead Images to Each Column (Index.tsx)
- Add a small hero thumbnail at the top of each column using the existing `hero-singles.jpg`, `hero-fitness.jpg`, `hero-volunteer.jpg` assets
- Style as a 160px-tall rounded image with a gradient overlay and category label
- Gives the newspaper "above the fold" photo feel

### 4. Tighten Layout Spacing (Index.tsx)
- Reduce the gap between hero and search card (currently `-mt-8`, change to `-mt-12`)
- Reduce gap