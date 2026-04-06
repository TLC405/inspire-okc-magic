

# Fix App Name + Simplify Admin + Kali Testing Info

## Problems

1. **Wrong title** — Header says "THE INSPIRE" but the app is called **"Inspire Oklahoma City"**
2. **Admin panel too confusing** — Too many tabs, unclear what things mean. Need to simplify and make the Visitors/IP tab the default and most prominent
3. **Kali Linux testing data** — User wants to see IPs and visitor info from penetration testing done offline with Kali

## Changes

### 1. Fix App Name in Navbar (src/components/Navbar.tsx)
- Change "THE INSPIRE" → "INSPIRE"
- Change subtitle "Oklahoma City" → "OKLAHOMA CITY" (keep as-is, it's already there)
- Together they read as "INSPIRE OKLAHOMA CITY" — the correct app name
- Keep the newspaper aesthetic (Playfair Display, decorative rules, Vol/Issue)

### 2. Simplify Admin Panel (src/pages/Admin.tsx)
- Reduce from 6 tabs to 3: **Visitors** (default), **Security**, **Events**
- Merge "Threats" into Security tab
- Remove separate "Date Nights" and "Images" tabs (low value, adds confusion)
- Make **Visitors** the default tab — this is what the user checks most
- Add a "Refresh" button prominently at top of visitors tab
- Show visitor table with: IP, City/Region/Country, Lat/Lon, User Agent (full), Page, Referrer, Timestamp
- Add a note about Kali testing: when testing offline with Kali, visitors won't log because the edge function needs internet. For local pen testing, the user should test against the live deployed URL

### 3. Visitor Table Enhancements
- Show full user agent string (not truncated)
- Show coordinates as clickable Google Maps links
- Add referrer column
- Color-code IPs that appear multiple times (potential scanning)

## Files

| Action | File | Details |
|---|---|---|
| Modify | `src/components/Navbar.tsx` | Change "THE INSPIRE" → "INSPIRE" |
| Modify | `src/pages/Admin.tsx` | Simplify to 3 tabs, default to Visitors, enhance IP table |

No database changes. No new dependencies.

