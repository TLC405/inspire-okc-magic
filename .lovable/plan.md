

# Real Data Singles Engine + Light Theme Default

## Problem
1. Current singles events are hardcoded mock data — some real names but fabricated descriptions, fake venues, made-up frequency info
2. Theme defaults to dark ("Signal") — user wants light/editorial as default
3. Need a comprehensive search engine that finds real events from multiple sources (Eventbrite, Meetup, Jigsaw Dating, SalsaVida, church groups, forums)

## What Changes

### 1. Light Theme Default
- Change `ThemeProvider.tsx` `defaultTheme` from `"dark"` to `"editorial"`
- Ensure `:root` stays as the dark Signal mode, but `editorial` class (light newspaper) is what loads first

### 2. Replace All Singles Data with Verified Real Events

Delete the current `singlesEvents.ts` and rebuild with only events confirmed through web research. Each entry includes a verified source URL. **No fabricated events.**

**Verified real organizers/events found:**

| Organizer | Event | Venue | Source |
|---|---|---|---|
| Pre-Dating | Speed Dating Ages 20s/30s | Anthem Brewing Company | meetup.com, pre-dating.com |
| Pre-Dating | Speed Dating Ages 30s/40s | Anthem Brewing Company | meetup.com |
| Pre-Dating | Speed Dating Ages 24-39 | Revolving Bricktown venues | pre-dating.com |
| Social Singles OKC | Speed Dating Ages 25-40 | Woodworks Distilling Co | eventbrite.com |
| Social Singles OKC | Speed Dating Ages 40+ | Woodworks Distilling Co | eventbrite.com |
| Jigsaw Dating | Coffee Shop Speed Dating (25-45+) | Social Capital, 517 S Hudson Ave | eventbrite.com, jigsaw.co |
| Jigsaw Dating | Singles Happy Hour (25-45+) | Social Capital | eventbrite.com, singleevents.com |
| ADDVentures | Single Awareness Dinner | Restaurant of the Week (rotating) | eventbrite.com |
| ADDVentures | Single Awareness Dinner: Ladies Edition | Rotating venues | eventbrite.com |
| BachAmor | Latin Night (bachata lesson + social) | Sailor and The Dock | salsavida.com |
| Baila OKC / Motion Lab | Latin Night on the Rooftop | Ellison Hotel | happeningnext.com |
| International Dance Studio | Latin Dance Social | iDance Studio | salsavida.com |
| Latin Fusion OKC | 3rd Friday Latin Night | Rotating venues | salsavida.com |
| Union Church OKC | Singles Night | Union Church | instagram.com |
| Painting with a Twist | Date Night Paint & Sip | 9217 N Pennsylvania Ave | paintingwithatwist.com |
| OKC Singles Meetup | Various social events | Citywide | meetup.com/find/us--ok--oklahoma-city/singles |

Categories: `Speed Dating`, `Mixer`, `Social`, `Dance`, `Activity`, `Faith`

### 3. Rebuild `singlesEvents.ts` with Only Verified Data
~16 events, each with:
- Real organizer name, real venue, real neighborhood
- Verified source URL the user can click
- Real price ranges from the actual listings
- Real frequency from the actual event pages
- Category and tags derived from actual event descriptions

### 4. Update Singles Page Filters
Add "Dance" and "Faith" as new categories to reflect real event types found. Update `singlesCategories` accordingly.

### 5. Remove Fake Data from Fitness & Volunteering Too
Check `fitnessSpots.ts` and `volunteerOrgs.ts` — verify entries are real. Remove anything fabricated. (These were researched in a prior pass and should be mostly real, but will audit.)

---

## Files

| Action | File | Details |
|---|---|---|
| Rewrite | `src/data/singlesEvents.ts` | 16 verified events only, new categories |
| Modify | `src/components/ThemeProvider.tsx` | `defaultTheme: "editorial"` |
| Modify | `src/pages/Singles.tsx` | Updated categories, neighborhood list auto-derived |

No new dependencies. No backend needed — this is verified static data with source URLs.

