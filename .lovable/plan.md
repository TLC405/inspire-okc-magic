# Security Panel Security Status

Ran full atomic security sweep:

- Database linter: 0 issues
- Security scan: 0 vulnerabilities
- RLS policies: Properly configured (public SELECT, service-role-only writes on `image_cache`)
- No exposed secrets, no missing policies, no auth bypass risks

The app currently has no authentication, so there are no user-facing auth vulnerabilities. The only table (`image_cache`) is correctly locked down.

## What We Will Build

### 1. Admin Panel at `/admin` (password-gated, client-side)

A local admin dashboard with three tabs:

- **Security** -- Shows live security status: RLS policy summary, table count, secret count, edge function health, broken source link count from singles data, image cache stats
- **Events Manager** -- View/filter all singles events with verification status, confidence scores, broken links highlighted in red, ability to trigger AI re-verification
- **Date Nights** -- Curated date night ideas pulled from verified singles events + fitness activities + discover items, formatted as bookable suggestions

Admin access uses a simple PIN code stored in localStorage (not a security boundary -- just a convenience gate since there are no real users yet).

### 2. Date Nights Category Added to Singles Events

Add a new `"Date Night"` category to the `SinglesEvent` type and populate with 6-8 verified OKC date night activities:

- Paint & Sip at Painting with a Twist (already exists as Activity, reclassify)
- Factory Obscura immersive art experience
- Scissortail Park sunset picnic + kayaking
- First Americans Museum evening tours
- Wheeler District dinner + waterfront walk
- Paseo Arts District gallery walk (First Friday)
- OKC Riversport adventure date (zip line, rapids)
- Automobile Alley cocktail crawl

Each entry gets real source URLs, verification status, and confidence scores.

### 3. Events Page Upgrade

- Add "Date Night" to the category filter chips
- Date Night cards get a special warm gradient accent and a heart icon
- Add "Tonight" / "This Weekend" quick filters based on frequency field

## Files


| Action | File                        | Details                                                                 |
| ------ | --------------------------- | ----------------------------------------------------------------------- |
| Modify | `src/data/singlesEvents.ts` | Add "Date Night" to category union, add 6-8 verified date night entries |
| Create | `src/pages/Admin.tsx`       | Three-tab admin panel: Security, Events Manager, Date Nights            |
| Modify | `src/App.tsx`               | Add `/admin` route                                                      |
| Modify | `src/components/Navbar.tsx` | Add subtle admin link (gear icon, far right)                            |
| Modify | `src/pages/Singles.tsx`     | Add "Date Night" to filter chips, warm accent styling                   |


No new dependencies. No database changes needed -- security panel reads from static data and edge function health checks.