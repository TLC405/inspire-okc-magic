

# Fix Newspaper Headline Visibility + AI-Powered Admin Scanner & Upgrade Hub

## Problem 1: Newspaper Headline Still Hidden

The newspaper front-page section (lines 73–107 in Index.tsx) has two layout bugs:
- It uses `-mt-6` to tuck under the hero, which works — but then the **search bar** at line 110 uses `-mt-14`, which pulls the search bar **on top** of the headline, hiding it completely.
- The headline section has no padding-top to clear the visual space.

**Fix:** Remove `-mt-14` from the search bar, add proper spacing (`mt-6`) so the newspaper headline → search bar → content flows naturally and nothing overlaps.

## Problem 2: Admin Panel — AI Scanner + Upgrade Ideas

Add a new **"AI Scanner"** tab to Admin that uses the Lovable AI backend to run automated checks and suggest upgrades. This replaces static checklists with a living, AI-driven command center.

### AI Scanner Features
- **Run Scan** button triggers an edge function that uses AI to analyze:
  - **Security**: RLS coverage, auth config, exposed routes
  - **Content**: Grammar, hidden/clipped text, broken layouts
  - **Links & Images**: Dead URLs, missing image_cache entries, 404 sources
  - **Events Quality**: Wrong categories, stale data, duplicates, low confidence scores
- Results stored in a `scan_results` table for history
- **Background monitoring**: A scheduled cron job runs scans periodically and flags new issues

### Upgrade Ideas Hub (inside AI Scanner tab)
After each scan, AI generates **5 upgrade ideas per category**:
- **Homepage** (hero, newspaper layout, featured sections, search, feed)
- **Discover** (feed, source badges, scrolling cards, city highlights)
- **Dating Pages** (singles, events, date nights improvements)
- **Operations** (admin, security, visitor logs, AI tools, automation)

Each idea shows: title, description, difficulty (easy/medium/hard), and a "Request This" button.

## Technical Design

### Edge Function: `admin-scanner`
- Accepts `{ action: "scan" | "upgrades", categories?: string[] }`
- For "scan": Aggregates data counts, checks for broken sources, reviews event quality, returns findings
- For "upgrades": Sends app context to AI, gets 5 ideas per selected category
- Uses `google/gemini-3.1-pro-preview` with tool calling for structured output

### Database: `scan_results` table
| Column | Type | Notes |
|---|---|---|
| id | uuid | PK |
| scan_type | text | "security", "content", "links", "events" |
| findings | jsonb | Array of issues found |
| upgrade_ideas | jsonb | Array of suggestions |
| created_at | timestamptz | When scan ran |

RLS: Admin-only read, service-role write.

### Cron Job
- Runs every 6 hours via `pg_cron` + `pg_net`
- Calls `admin-scanner` with `action: "scan"`
- Results accumulate in `scan_results` for admin to review

## Changes

### 1. Fix Homepage Headline (src/pages/Index.tsx)
- Remove `-mt-14` from the search bar section
- Add `mt-6` spacing between newspaper headline and search
- Headline is now fully visible below the hero photo

### 2. Create Edge Function (supabase/functions/admin-scanner/index.ts)
- "scan" action: Checks event data quality, source links, image cache stats
- "upgrades" action: AI generates 5 ideas per category using tool calling
- Handles 429/402 errors

### 3. Create scan_results table (migration)
- Table with RLS for admin-only access

### 4. Add AI Scanner tab to Admin (src/pages/Admin.tsx)
- New 4th tab: "AI Scanner" with Zap icon
- "Run Full Scan" button → shows findings grouped by category
- "Get Upgrade Ideas" button → shows 5 ideas per app area
- Scan history list from `scan_results` table
- Background scan status indicator

### 5. Set up cron job for background scans
- pg_cron schedule every 6 hours

## Files

| Action | File | Details |
|---|---|---|
| Modify | `src/pages/Index.tsx` | Fix search bar margin, make headline visible |
| Create | `supabase/functions/admin-scanner/index.ts` | AI scan + upgrade ideas edge function |
| Modify | `src/pages/Admin.tsx` | Add AI Scanner tab with scan results + upgrade ideas UI |
| Create | Migration | `scan_results` table with admin RLS |

