

# Full Lifestyle City App — Editorial Broadsheet Overhaul

## What This Does
A comprehensive, credit-efficient overhaul that makes every page, every admin panel, and every interaction feel complete, polished, and production-ready. No throwaway rewrites — surgical upgrades to the existing architecture.

## Current State (already working)
- 7 public pages: Home, Singles, Events, Date Nights, Fitness, Volunteering, Discover, Momento Mori
- Admin with 5 tabs (Editorial, Site, Intelligence, Operations, Assistant) and 15+ sub-panels
- 6 themes, live weather, wire ticker, hero carousel, civic panels
- Edge functions: admin-chat, admin-scanner, image-search, smart-search, newsroom-draft, moderate-content
- Full auth with master admin auto-grant

## Plan (grouped for maximum impact per credit)

### 1. Homepage Polish
- Wire up `site_modules` visibility to actually control which sections render (currently the modules table exists but homepage ignores it)
- Wire up `site_copy` values to replace hardcoded headlines/taglines
- Add a "Latest Briefings" section pulling from the `briefings` table
- Improve photo grid with better image fallbacks and hover effects
- Add smooth scroll-reveal animations to each section

### 2. Directory Pages Completion
- **Discover**: Refocus subtitle/hero copy on "Flea Markets, Community Events & Local Happenings" as requested; add community event categories (flea markets, garage sales, farmers markets, art walks, food trucks)
- **All directory pages**: Add consistent empty-state messaging, loading skeletons, and "last verified" timestamps
- **Events/Singles/DateNights**: Ensure category exclusion rules are enforced consistently
- Fix duplicate `/discover` route in App.tsx

### 3. Admin — Homepage Control (fully wired)
- Make `SiteModulesEditor` changes actually toggle homepage sections in real-time (add a context provider that reads modules on page load)
- Make `SiteCopyEditor` changes flow to Navbar nameplate, footer tagline, newsletter CTA, and pull quote
- `HeroSlideEditor` — verify it controls the actual carousel (wire if not)
- `TickerEditor` — verify wire ticker reads from `ticker_items` table

### 4. Admin — Directory Control
- Add CRUD capabilities to the Content Manager for singles, fitness, and volunteer listings
- Currently content is read-only from static files — add "Save Changes" that writes to a `listing_overrides` table so admin edits persist without touching code
- Add bulk status toggle (publish/unpublish/archive)

### 5. Admin — Visitor Intelligence Upgrades
- Add a simple world map visualization using SVG (no extra deps) showing visitor locations
- Add session duration estimation (time between first and last hit per IP)
- Add "Export CSV" button for visitor data
- Add referrer analytics breakdown panel
- Add device/browser distribution charts (bar charts using CSS, no charting lib needed)

### 6. Admin — AI Newsroom Hardening
- Add error boundary around AI chat so failures don't crash the panel
- Add "Retry" button on failed AI responses
- Add chat export (download conversation as markdown)
- Add quick-prompt buttons: "Audit my content", "Generate a briefing", "Suggest upgrades"
- Verify newsroom-draft and moderate-content edge functions are deployed and wired

### 7. TLC Branding Throughout
- Ensure the TLC theme badge shows in the top-left navbar when TLC mode is active (already coded but verify rendering)
- Add "TLC Presents" watermark to the Momento Mori title cartouche
- Add TLC theme option to the admin Theme Panel (already exists)
- Ensure TLC rose/sage colors propagate to all card surfaces, buttons, and section headers

### 8. Header & Navigation Fixes
- Remove duplicate `/discover` route from App.tsx
- Verify header flicker fix is working (grid-rows transition without opacity)
- Ensure Momento Mori link (GitHub icon) is visible and correctly positioned

### 9. Database Migration (if needed)
- Create `listing_overrides` table for admin content edits:
  ```
  listing_overrides: id, listing_type, listing_id, field_overrides (jsonb), updated_by, updated_at
  ```
  with admin-only RLS

## Files Modified

| File | Change |
|---|---|
| `src/App.tsx` | Remove duplicate /discover route |
| `src/pages/Index.tsx` | Wire site_modules visibility + site_copy values + briefings section |
| `src/pages/Discover.tsx` | Refocus on community events, flea markets, local happenings |
| `src/pages/MomentoMori.tsx` | Add TLC branding watermark |
| `src/pages/Admin.tsx` | Error boundaries, quick-prompts, chat export, content CRUD wiring |
| `src/components/admin/VisitorDashboard.tsx` | SVG map, session duration, CSV export, referrer analytics |
| `src/components/admin/SiteModulesEditor.tsx` | Wire to homepage rendering context |
| `src/components/admin/SiteCopyEditor.tsx` | Wire to live site rendering |
| `src/components/admin/FeedManager.tsx` | Verify realtime subscription working |
| `src/components/Navbar.tsx` | Read nameplate from site_copy, verify TLC badge |
| `src/components/Footer.tsx` | Read tagline from site_copy |
| `src/hooks/useSiteConfig.ts` | New — shared context for site_modules + site_copy |
| `src/components/momento-mori/map/TitleCartouche.tsx` | Add TLC branding |
| New migration | `listing_overrides` table with admin RLS |

## Approach
All changes build on the existing 1175-line Admin.tsx and existing component library. No framework changes, no new npm packages, no rewrites. Every edit makes the existing system more complete.

