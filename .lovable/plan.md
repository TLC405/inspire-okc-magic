

# Wire Ticker Slowdown + Admin Photo Management + Source Code Download

## 1. Dramatically Slow Down the Wire Ticker

The current speeds are 150s / 90s / 45s. These are way too fast. New values:

| Speed | Current | New |
|---|---|---|
| Slow | 150s | 300s |
| Medium | 90s | 200s |
| Fast | 45s | 120s |

Default speed changes from "medium" to "slow".

**File**: `src/index.css` — update the three `wire-ticker-track[data-speed]` lines.
**File**: `src/components/WireTicker.tsx` — change default speed from `"medium"` to `"slow"`.

## 2. Admin Photo Upload/Change for Hero Slides

The MediaAuditPanel already handles listing photos via URL paste. But the Hero Slide Editor needs a proper photo URL field so admins can change hero carousel images. I'll verify `HeroSlideEditor.tsx` has an image_url input and fix it if missing.

**File**: `src/components/admin/HeroSlideEditor.tsx` — ensure image URL editing works with preview thumbnails.

## 3. Source Code Download in Admin

Add a new "Developer" section in the Admin Operations tab with:
- **Download Source** button that generates a JSON manifest of all key config (site_copy, site_modules, ticker_items, hero_slides) as a downloadable file
- **Integration Guide** panel with copy-paste code snippets showing how to embed the Wire Ticker, Hero Carousel, and Civic Panels into another React app
- **API Endpoints** reference listing all edge function URLs

**File**: `src/pages/Admin.tsx` — add a "Developer / Integration" collapsible section under Operations tab with download and snippet features.

## 4. Comprehensive Functionality Check

Review and fix any broken wiring:
- Verify `HeroSlideEditor` writes to `hero_slides` table and carousel reads from it
- Verify `SiteModulesEditor` toggles actually hide/show homepage sections
- Verify `SiteCopyEditor` values flow to Navbar/Footer
- Verify ticker reads from `ticker_items` table

This is a code review pass — I'll fix any disconnects found.

## Files Modified

| File | Change |
|---|---|
| `src/index.css` | Triple the animation durations |
| `src/components/WireTicker.tsx` | Default to "slow" speed |
| `src/components/admin/HeroSlideEditor.tsx` | Verify/fix image URL editing |
| `src/pages/Admin.tsx` | Add Developer/Integration section with source download + integration snippets |

