

# Fix Scroll Bug + Verify Singles Data + Upgrade Volunteering Search

## Problems Identified

1. **Can't scroll after opening Combat**: The fitness sidebar uses `sticky top-4` but has no `overflow-y-auto` or `max-h`. When collapsible groups expand, the sidebar exceeds viewport height and blocks scrolling.

2. **Singles "Single Awareness Dinner" links are dead**: The ADDVentures organizer page (`eventbrite.com/o/addventures-17518498737`) returns 404. Research confirms ADDVentures is real — they still post individual events. The organizer page URL needs updating. The Ladies Edition is now organized by "Ermantourage Dinner with Strangers."

3. **Volunteering page is thin**: Only 10 organizations with basic search. Needs more categories, more orgs, and richer search/filter UX.

4. **No photos or visual richness**: All pages are text-only cards. User wants real photos embedded.

---

## Plan

### 1. Fix Fitness Sidebar Scroll Bug

Add `overflow-y-auto max-h-[calc(100vh-2rem)]` to the sticky sidebar container on both desktop and mobile drawer. This lets Combat and other groups expand without blocking page scroll.

### 2. Fix & Verify All Singles Event Source Links

**Broken links to fix:**
- `mx-02` (Single Awareness Dinner): Change source from dead organizer page to the active event search: `https://www.eventbrite.com/d/ok--oklahoma-city/single-awareness-dinner/`
- `mx-03` (Ladies Edition): Update organizer to "Ermantourage Dinner with Strangers", update source to `https://www.eventbrite.com/e/single-awareness-dinner-monthly-okc-ladies-edition-tickets-1982992859022`

**Verified working links (keep as-is):**
- Pre-Dating Meetup group and pre-dating.com — confirmed active with 2025/2026 events
- Social Singles OKC Eventbrite — confirmed active
- Jigsaw Dating Eventbrite — needs verification

**Add new verified events found in research:**
- "Foodies + New Friends: OKC | 30s Dinner Meet" by ADDVentures (active through Dec 2026)
- "Dinner with Entrepreneurs: OKC" by Ermantourage OKC (active)
- "Foodies + New Friends: Charity Edition" by ADDVentures (active)
- Pre-Dating 50s/60s age bracket (confirmed on Meetup)

### 3. Massively Upgrade Volunteering

Research and add 20+ more verified Oklahoma City volunteer organizations across expanded categories:
- Add categories: **Animals**, **Health/Medical**, **Arts/Culture**, **Education**, **Disaster Relief**, **Veterans**
- Add orgs like: Oklahoma Humane Society, CASA of Oklahoma County, Junior League of OKC, OU Medical volunteer program, Myriad Gardens volunteers, Science Museum Oklahoma, Red Cross Central Oklahoma, Infant Crisis Services, etc.
- Add grouped category filtering matching fitness page pattern
- Add neighborhood/district filtering

### 4. Add Real Photos via Unsplash Embeds

Use Unsplash's free embed URLs (no API key needed) to add contextual photos to each directory page:
- Hero/header images for each page (Oklahoma City skyline, gym interiors, community events)
- Category header images (e.g., yoga class, boxing ring, food bank)
- Use `source.unsplash.com` direct image URLs embedded as `<img>` tags
- Add `imageUrl` field to data interfaces for per-item photos where available

### 5. Volunteering Search Upgrade

Match the same sidebar/drawer filter pattern as Singles and Fitness:
- Add category counts in filter chips
- Add "Commitment" filter (one-time, weekly, monthly, flexible)
- Add "Type" filter (hands-on, skilled, administrative, outdoor)

---

## Files

| Action | File | Details |
|---|---|---|
| Modify | `src/pages/Workouts.tsx` | Fix sticky sidebar scroll with `overflow-y-auto max-h-[calc(100vh-2rem)]` |
| Modify | `src/pages/Singles.tsx` | Same sidebar scroll fix, add photo headers |
| Rewrite | `src/data/singlesEvents.ts` | Fix broken links, add 4+ new verified events, update organizer names |
| Rewrite | `src/data/volunteerOrgs.ts` | Expand to 30+ orgs, add new categories, add commitment/type fields |
| Modify | `src/pages/Volunteering.tsx` | Add grouped category filters, commitment filter, photo headers, richer cards |
| Modify | `src/pages/Discover.tsx` | Add hero photo using Unsplash embed |

