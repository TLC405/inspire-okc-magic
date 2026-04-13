

# Theme Overhaul + Header Flicker Fix

## Summary
Replace the 3-theme system (Signal/Editorial/Raw) with 4 themes: Light, Dark, Thunder, and Comets. Fix the header flickering on scroll across all pages.

---

## 1. Header Flicker Fix

**Root cause**: The nameplate collapse uses `transition-all duration-300` which transitions `max-h`, `opacity`, and every other property simultaneously. Combined with `sticky top-0`, this causes layout thrashing and visual flicker on every scroll frame.

**Fix**:
- Replace `transition-all` with specific `transition-[max-height,opacity]` on the collapsible nameplate div
- Add `will-change-[max-height,opacity]` to hint the browser to optimize
- Debounce the scroll handler with `requestAnimationFrame` to prevent excessive state updates
- File: `src/components/Navbar.tsx`

---

## 2. Remove Old Themes, Add New Ones

**Current**: Signal (dark), Editorial (light), Raw (mono) — 3 themes
**New**: Light, Dark, Thunder, Comets — 4 themes

### Theme Definitions (in `src/index.css`)

**Light** (replaces Editorial):
- Warm paper background, dark text, clean readability
- Based on current Editorial palette but refined

**Dark** (replaces Signal):
- Enhanced version of current Signal mode
- Deeper blacks, crisper contrast, better accent visibility

**Thunder** (new, replaces Raw):
- Primary: `#007DC3` (Thunder Blue)
- Secondary: `#EF3B24` (Sunset Orange)
- Accent: `#FDBB30` (Signal Yellow)
- Background: `#002D62` (Navy)
- Foreground: white/light
- Full Thunder branding feel

**Comets** (new):
- Primary: `#6B3FA0` (Purple — NWSL OKC Comets brand)
- Secondary: `#00C9A7` (Teal accent)
- Accent: `#FFD700` (Gold)
- Background: `#1A0A2E` (Deep purple-black)
- Foreground: light lavender

### Files Changed
- `src/index.css` — Remove `:root` (Signal), `.editorial`, `.raw` blocks; add `.light`, `:root` (dark default), `.thunder`, `.comets`
- `src/components/ThemeProvider.tsx` — Update themes array to `["light", "dark", "thunder", "comets"]`, default to `"dark"`
- `src/components/ThemeToggle.tsx` — Update modes array with 4 entries and appropriate icons (Sun, Moon, Zap/bolt for Thunder, Star for Comets)

---

## 3. Files Modified

| File | Change |
|---|---|
| `src/index.css` | Replace 3 theme blocks with 4 new ones (Light, Dark, Thunder, Comets) |
| `src/components/ThemeProvider.tsx` | Update themes list and default |
| `src/components/ThemeToggle.tsx` | 4-mode cycle with new icons/labels |
| `src/components/Navbar.tsx` | Fix transition specificity + RAF debounce on scroll |

