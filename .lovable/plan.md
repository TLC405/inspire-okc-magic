
# INSPIRE OKC -- Live Data Ticker + World-Class UI Polish

The marquee ticker currently shows static text like "NO DUES" and "405 AREA CODE." This upgrade transforms it into a **live data feed** pulling real OKC information, and overhauls every visual detail across the entire site to eliminate anything that feels cheap or template-like.

---

## 1. Live Data Ticker on Homepage

Replace the static ticker items with a **real-time feed** that rotates through live OKC data. Since we don't have a backend yet, we'll build a smart client-side system that pulls from free public APIs and displays rotating categories.

### Data Sources (Free, No API Key Required)

| Category | Source | Example Output |
|---|---|---|
| Weather | Open-Meteo API (free, no key) | "72 F PARTLY CLOUDY" |
| Thunder NBA | NBA free data endpoint / static schedule | "THUNDER VS LAKERS -- FEB 14" |
| Time | Browser local time | "2:34 PM CST" |
| OKC Facts | Rotating static pool of 20+ real facts | "FOUNDED 1889 -- LAND RUN" |

The ticker will show a **mix** of live and curated items, cycling through: current weather, current time, Thunder game info, city facts, neighborhood callouts, and community stats. Items tagged with category labels like `[WEATHER]` or `[THUNDER]` in accent color before the data.

### New Component: `LiveTicker.tsx`

A dedicated component that:
- Fetches weather from Open-Meteo API on mount (latitude/longitude for OKC: 35.4676, -97.5164)
- Maintains a pool of 15-20 ticker items mixing live + curated data
- Refreshes weather every 10 minutes
- Uses the existing CSS `marquee-track` animation
- Displays category tags in accent color: `[LIVE]`, `[THUNDER]`, `[WEATHER]`, `[OKC]`

### Curated Data Pool (Real OKC Information)

Static items that rotate alongside live data:
- "FOUNDED APRIL 22, 1889 -- THE LAND RUN"
- "DEVON ENERGY CENTER -- 844 FT -- TALLEST IN OK"
- "SCISSORTAIL PARK -- 70 ACRES DOWNTOWN"
- "PAYCOM CENTER -- HOME OF THE THUNDER"
- "PASEO ARTS DISTRICT -- EST. 1929"
- "BRICKTOWN CANAL -- 1 MILE LOOP"
- "OKC NATIONAL MEMORIAL -- APRIL 19, 1995"
- "BOATHOUSE DISTRICT -- OLYMPIC TRAINING SITE"
- "FACTORY OBSCURA -- IMMERSIVE ART"
- "WHEELER DISTRICT -- NEW URBANISM"
- Mayor/city reference: "MAYOR DAVID HOLT -- SINCE 2018"
- Thunder reference: "OKC THUNDER -- EST. 2008 -- NBA WESTERN CONFERENCE"
- Population and metro stats mixed in

---

## 2. Full UI/UX Overhaul -- Every Page

The current design has the right bones but the execution feels flat. Here's every upgrade:

### Homepage (`HeroSection.tsx`)

**Problems**: Directory grid text is small and gets lost. Quote block floats without enough visual weight. CTA button is thin. Footer line is barely visible. Overall layout feels like a template.

**Fixes**:
- Replace the static ticker with the new `LiveTicker` component
- Add a subtle **gradient overlay** on the background (not just flat black/70 -- use a gradient from black/80 at bottom to black/50 at top) for depth
- Directory grid: add hover states with accent underlines, make each item a clickable link
- CTA button: increase padding, add a subtle arrow icon, stronger hover state with scale
- Footer line: slightly larger text, add a subtle top border
- Header nav links: add active underline indicator, slightly larger hit targets
- Add a subtle **vignette** effect on the background image edges

### Community Page (`Community.tsx`)

**Problems**: Hero section uses same background image as homepage (feels repetitive). Stats bar is visually flat. Program list items lack visual hierarchy. Neighborhoods section feels tacked on.

**Fixes**:
- Hero: use a **solid color block** (bg-primary) instead of the photo -- reserve the photo for homepage only
- Stats bar: add accent-colored top border, bolder number styling with `tabular-nums`
- Program list: add subtle left border accent on hover, icon containers get accent background on hover (not just border change)
- Quote section: increase font size, add more vertical padding
- Neighborhoods: style as a proper grid with hover accent borders, not just inline tags
- CTA section: add a decorative monospaced data line

### Story Page (`Story.tsx`)

**Problems**: Three narrative blocks look identical with no visual variation. Values grid is basic.

**Fixes**:
- Alternate narrative block layouts -- odd blocks get accent left border, even blocks get accent right alignment
- Values grid: add hover lift effect, accent number styling
- Add a closing decorative element before the CTA

### Info Page (`Info.tsx`)

**Problems**: Contact cards are visually identical. FAQ accordion triggers are plain.

**Fixes**:
- Contact cards: alternate accent positions (icon color, border accents)
- FAQ: add subtle left accent bar on the active/open item
- About block: add more typographic weight

### Podcast/Men-Talk Page (`Podcast.tsx`)

**Problems**: Content placeholder section is a dead end visually.

**Fixes**:
- Replace "Content is Coming" placeholder with a more intentional "Sessions launching soon" message with a date reference
- Pillars grid: add hover states with accent fills

### MenTalkGate (`MenTalkGate.tsx`)

**Fixes**:
- Add a subtle background pattern or very faint grid texture
- Increase input field visual weight
- Add a keyboard hint ("Enter your 5-digit code")

### Footer (`Footer.tsx`)

**Fixes**:
- Increase spacing between sections
- Add subtle hover underlines on links
- Neighborhood tags: add hover accent color

### Navbar (`Navbar.tsx`)

**Fixes**:
- Add active route underline indicator (2px accent bar under current page)
- Slightly increase nav height for breathing room
- Mobile menu: add accent border on active link

---

## 3. CSS Upgrades (`index.css`)

- Add a `.vignette` overlay utility for the homepage background
- Add `.ticker-tag` utility for the `[WEATHER]` / `[THUNDER]` category labels
- Refine `.marquee-track` speed -- slow it down slightly for readability with longer live content
- Add subtle `::before` / `::after` decorative elements for section dividers
- Add a `.glass` utility for subtle backdrop-blur effects where appropriate

---

## 4. Technical Implementation

### Files Created
| File | Purpose |
|---|---|
| `src/components/home/LiveTicker.tsx` | Live data ticker: weather API + curated OKC facts + Thunder info |

### Files Modified
| File | Change |
|---|---|
| `src/components/home/HeroSection.tsx` | Replace static ticker with LiveTicker, gradient overlay, vignette, directory hover states, stronger CTA |
| `src/pages/Community.tsx` | Solid color hero (no photo), enhanced stats bar, program hover states, neighborhoods grid |
| `src/pages/Story.tsx` | Alternating narrative layouts, values hover effects |
| `src/pages/Info.tsx` | Contact card accents, FAQ active states, about block polish |
| `src/pages/Podcast.tsx` | Replace placeholder copy, pillar hover states |
| `src/components/MenTalkGate.tsx` | Background texture, input refinements |
| `src/components/Footer.tsx` | Spacing, hover states, link underlines |
| `src/components/Navbar.tsx` | Active route indicator, height increase, mobile polish |
| `src/index.css` | Vignette utility, ticker-tag styling, glass utility, marquee speed tuning |

### Weather API Call (Open-Meteo, completely free)
```text
GET https://api.open-meteo.com/v1/forecast?latitude=35.4676&longitude=-97.5164&current=temperature_2m,weather_code&temperature_unit=fahrenheit&timezone=America/Chicago
```
No API key needed. Returns current temp and weather code which maps to conditions (clear, cloudy, rain, etc.).
