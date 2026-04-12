

# Critical UX Fixes: Mobile, Navigation, Search, Tone, and Conversion

## Summary

Five high-impact fixes addressing the biggest usability gaps: invisible mobile content, broken navigation patterns, incorrect search routing, inconsistent brand voice, and zero conversion paths.

---

## 1. Mobile Homepage Content (currently invisible)

**Problem**: The broadsheet columns (lines 207), pull quote (line 340), and stats bar (line 440) all use `hidden md:block` — phone users see only the hero, headline, search, photo grid, quick-nav cards, and date nights.

**Fix**: Create a mobile-specific stacked layout that replaces the 3-column grid with single-column article cards. Each category (Singles, Fitness, Volunteering) gets a compact card showing 2 listings + a "See all" link. The pull quote becomes a smaller centered block. Stats bar becomes a 2x2 grid. All visible on mobile.

---

## 2. Mobile Bottom Tab Bar (replace chevron carousel)

**Problem**: The ChevronLeft/Right carousel nav in the Navbar is non-standard and undiscoverable.

**Fix**: Create a `MobileTabBar` component — a fixed bottom bar with 5 tabs: Home, Singles, Fitness, Volunteer, More (opens a small popover for Events, Date Nights, Discover). Icons + labels, active state highlight. Hide the chevron carousel entirely. The desktop nav stays unchanged.

---

## 3. Fix Search Routing with Unified Search

**Problem**: Regex-based routing sends "yoga class" to /singles. The fallback is always /singles.

**Fix**: Replace the regex approach in `SearchSurface.tsx` with a scoring system that searches across all three datasets (singlesEvents, fitnessSpots, volunteerOrgs) by name/category/tags. Route to whichever category has the highest match count. If no clear winner, show an inline dropdown of grouped results (e.g., "3 Fitness · 1 Singles · 0 Volunteer") letting the user pick.

---

## 4. Consistent Brand Voice

**Problem**: Events page uses casual emoji-heavy copy ("person scrolling alone at 2am. We see you. 👀", "Netflix & Chill gets old 🍿") while Singles page is serious journalism. Two different brands.

**Fix**: Align Events page to the editorial newspaper voice used everywhere else. Remove emoji from taglines and hero copy. Replace with authored, concise descriptions in the same `dateline`/`subheadline` typographic classes. Same treatment for `funTaglines` — rewrite as short, sharp editorial lines without emoji.

---

## 5. Homepage CTA — Email Capture + Submit Event

**Problem**: No conversion path anywhere. Hero carousel converts nothing. No reason to return.

**Fix**: Add two CTA elements:
- **Primary**: A "Get the Weekly Brief" email signup bar below the search section — styled as a newspaper subscription card with email input + submit button. Stores emails in a new `newsletter_subscribers` table.
- **Secondary**: A "Submit Your Event" link in the folio area that opens a simple form (or links to a future form page).

---

## Files to Modify

| Action | File | What |
|---|---|---|
| Modify | `src/pages/Index.tsx` | Mobile stacked columns, stats 2x2, pull quote visible, CTA email bar, submit event link |
| Create | `src/components/MobileTabBar.tsx` | Fixed bottom tab bar with 5 tabs |
| Modify | `src/App.tsx` | Add MobileTabBar to layout |
| Modify | `src/components/SearchSurface.tsx` | Replace regex with scoring across all datasets, inline results dropdown |
| Modify | `src/pages/Events.tsx` | Rewrite hero copy and taglines to editorial voice, remove emoji |
| Create | Migration | `newsletter_subscribers` table (email, created_at) with anon insert policy |

## Technical Details

- **MobileTabBar**: Uses `useIsMobile()` hook, renders as `fixed bottom-0 z-50` with `pb-safe` for iOS notch. Height ~56px. All pages get `pb-16` on mobile to prevent content from hiding behind it.
- **Search scoring**: For each dataset, count how many items match the query in name/category/tags fields. Route to the dataset with the most hits. Tie-break: show inline grouped results.
- **Newsletter table**: Simple `id, email (unique), created_at` with RLS policy allowing anonymous inserts but no reads.

