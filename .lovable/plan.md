# Hardcode Master Admin + AI Settings Panel + Creative Upgrades

## Summary

Three major workstreams: (1) hardcode `inspirelawton@gmail.com` as permanent master admin (no bootstrap), (2) build an AI-powered "INSPIRE Intelligence" panel inside Admin settings with chat history and project context, (3) page-by-page creative upgrades that go beyond standard improvements.

---

## 1. Hardcode Master Admin

**Problem**: Currently requires bootstrap flow. The `assign-admin` edge function checks if `user_roles` is empty to allow first bootstrap — fragile and insecure for a known owner.

**Fix**: Update `assign-admin/index.ts` to always recognize `inspirelawton@gmail.com` as master admin. On login, auto-insert admin role if missing. Remove the bootstrap button from Admin.tsx for this email. In `useAuth.ts`, after login, if email matches, call assign-admin automatically.

---

## 2. AI Chat Panel in Admin Settings ("INSPIRE Intelligence")

Build a new Admin tab called **"AI / Settings"** that embeds a streaming AI chat directly in the admin panel. This is your direct line to AI — contextualized with your entire app's data, architecture, and chat history.

**Features**:

- Streaming chat using `google/gemini-3.1-pro-preview` (not flash)
- Pre-loaded system prompt containing: full app architecture, all page descriptions, data model, current listing counts, recent scan results, and custom instructions built from our conversation history
- Persistent chat history stored in a new `admin_chat_messages` table
- Quick-action buttons: "Audit this page", "Suggest upgrades", "Write copy for [section]", "Find real photos for [listing]"
- Custom Instructions editor — a textarea where you save persistent instructions that get prepended to every AI call (stored in a new `admin_settings` table)

**Edge function**: New `admin-chat/index.ts` — streaming endpoint with full app context baked into system prompt.

---

## 3. Page-by-Page Creative Upgrades (Non-Standard Only)

### Homepage (`Index.tsx`)

- **"Tonight in OKC" dynamic block**: A time-aware ai non llovable section that shows different content based on day/hour — Friday night highlights date nights + mixers, Saturday morning highlights fitness + volunteering, Sunday shows discover/culture. Uses no API, just clock-based logic with editorial framing ("The Saturday Morning Edition recommends...")
- **Parallax pull quote**: The editorial pull quote gets a subtle parallax scroll effect — text moves at 0.7x scroll speed against background

### Singles (`Singles.tsx`)

- **"Chemistry Match" filter**: AI-powered — user describes what they want ("I'm introverted, love board games, hate loud bars") and the edge function scores/ranks events against that description. Returns a re-ordered list with match percentages
- **Social proof ticker**: "12 people viewed this event today" — uses visitor_logs page_path data to show real view counts per listing

### Fitness (`Workouts.tsx`)

- **"Build My Week" planner**: User taps days of the week, AI suggests a weekly fitness plan pulling from actual OKC fitness spots. Output: a shareable 7-day schedule card with real venue names and addresses
- **Neighborhood heat map**: ASCII/CSS-based visual showing which OKC districts have the most fitness options, with click-to-filter

### Events (`Events.tsx`)

- **Weather-responsive recommendations**: Already has weather hook — extend it so the AI suggests indoor events when rain is detected, outdoor when clear. Show as a "Weather Desk Picks" editorial card
- **"Bring a Friend" share cards**: Generate a shareable image/card for any event with OG-style formatting that can be copied to clipboard

### Date Nights (`DateNights.tsx`)

- **"Surprise Me" randomizer**: Animated card-flip that reveals a random date night with theatrical presentation — confetti, dramatic reveal, "The editors have chosen..."
- **Budget filter with real price data**: Slide between $, $$, $$$ and filter in real-time using the existing price field

### Volunteering (`Volunteering.tsx`)

- **Impact calculator**: "If you volunteer 2 hours/week at [org], that's 104 hours/year — equivalent to [X] meals served" using AI to generate contextual impact statements
- **Group volunteer matcher**: Input group size + interests, AI recommends best-fit orgs from the actual data

### Discover (`Discover.tsx`)

- **"Walking Tour" generator**: Select 3-5 discover items and AI builds a walking route with estimated times, linking to Google Maps directions between stops
- **Time capsule mode**: "What did OKC look like 10 years ago?" — editorial comparison cards showing then-vs-now for architecture/growth items

### Admin (`Admin.tsx`)

- **Live dashboard metrics**: Real-time counters using Supabase realtime subscriptions on visitor_logs
- **Content diff viewer**: When editing listings, show a visual diff of what changed before "saving" (export)
- **Scheduled scan automation**: Set the AI scanner to run on a schedule (store preferences in admin_settings)

---

## Database Changes


| Table                 | Purpose                                                                    |
| --------------------- | -------------------------------------------------------------------------- |
| `admin_chat_messages` | Persist AI chat history (user_id, role, content, created_at)               |
| `admin_settings`      | Key-value store for custom instructions, preferences (user_id, key, value) |


Both with RLS: admin-only read/write.

---

## Files to Create/Modify


| Action | File                                       | What                                                                                             |
| ------ | ------------------------------------------ | ------------------------------------------------------------------------------------------------ |
| Create | `supabase/functions/admin-chat/index.ts`   | Streaming AI chat with full app context system prompt                                            |
| Modify | `supabase/functions/assign-admin/index.ts` | Auto-grant admin for `inspirelawton@gmail.com`                                                   |
| Modify | `src/hooks/useAuth.ts`                     | Auto-assign admin on login for master email, remove bootstrapAdmin                               |
| Modify | `src/pages/Admin.tsx`                      | Add "AI / Settings" tab with streaming chat, custom instructions editor, remove bootstrap button |
| Create | Migration                                  | `admin_chat_messages` + `admin_settings` tables                                                  |
| Modify | `src/pages/Index.tsx`                      | "Tonight in OKC" time-aware block, parallax pull quote                                           |
| Modify | `src/pages/Singles.tsx`                    | Social proof view counts from visitor_logs                                                       |
| Modify | `src/pages/Events.tsx`                     | Weather-responsive AI picks card                                                                 |
| Modify | `src/pages/DateNights.tsx`                 | "Surprise Me" randomizer with animation                                                          |
| Modify | `src/pages/Discover.tsx`                   | Walking tour generator UI                                                                        |


All AI features use `google/gemini-3.1-pro-preview` via Lovable AI Gateway.

---

## Custom Instructions (Baked into AI System Prompt)

The admin-chat edge function will include a comprehensive system prompt built from our conversation:

```
You are INSPIRE Intelligence — the editorial AI for Inspire Oklahoma City.

PLATFORM CONTEXT:
- 6 directories: Singles (Speed Dating & Mixers only), Fitness, Volunteering, Events, Date Nights, Discover
- Events page excludes Date Night, Speed Dating, Mixer categories
- Brand voice: broadsheet journalism — serious, editorial, warm. No emoji in copy. No Gen-Z humor.
- Visual identity: newspaper metaphor with Playfair Display, double-rules, datelines, skeuo cards
- 3 themes: Signal (dark), Editorial (warm), Raw (monochrome)
- Triple-verification system with confidence scores
- All AI calls use Pro models, never Flash

ARCHITECTURE:
- React + Vite + Tailwind + TypeScript + Supabase (Lovable Cloud)
- Static data files for listings (singlesEvents, fitnessSpots, volunteerOrgs, cityShowcase)
- Edge functions for AI logic, image search, visitor logging, email queue
- Master admin: inspirelawton@gmail.com

RULES:
- Never suggest features that duplicate existing pages
- Always reference real OKC venues and neighborhoods
- Prioritize mobile-first design suggestions
- Focus on creative, non-obvious improvements
- When suggesting copy, match the editorial newspaper voice
```

This gets saved in `admin_settings` and is editable by the admin in the Settings panel.