

# Full-Width Newspaper Briefings with Real-Time Data

## Problem
The LiveBriefings component is a small card crammed inside the container. It needs to feel like a real broadsheet section — full-width, multi-column, with real timestamps and professional typographic elements instead of emoji icons.

## Changes

### 1. `src/components/LiveBriefings.tsx` — Complete redesign

- **Full-width layout**: Remove the small card wrapper. Use a bordered newspaper section with a thick top rule, section header ("City Briefings — Live Wire"), and multi-column grid (1 col mobile, 2 col tablet, 3 col desktop).
- **Remove all icons/emoji**: Replace `Zap` and `Pin` lucide icons with typographic markers — a filled square bullet for pinned items, an em-dash prefix for category labels, vertical column rules between items.
- **Real-time timestamps**: Show relative time ("3m ago", "1h ago", "Just now") using a helper that updates. Display the exact time in a dateline format ("2:47 PM CT") next to relative time.
- **Professional typography**: Category labels rendered as small-caps dateline stamps (no colored pill badges). Titles in bold serif. Content in regular weight with proper leading. Byline-style "Updated" timestamp at the bottom of each item.
- **Live indicator**: Replace the pulsing dot + "Live" text with a subtle "LIVE WIRE" mono label with a thin animated underline.
- **Column rules**: Vertical `border-r` dividers between columns on desktop, horizontal rules between items on mobile.

### 2. `src/pages/Index.tsx` — Expand the briefings section

- Remove the `container` wrapper around `<LiveBriefings />` so it can go edge-to-edge within its own internal container.
- Add proper newspaper section spacing: thick rule above, thin rule below, generous vertical padding.

### Files Modified

| File | Change |
|---|---|
| `src/components/LiveBriefings.tsx` | Full rewrite: multi-column grid, real-time relative timestamps, typographic markers, no icons/emoji, professional dateline styling |
| `src/pages/Index.tsx` | Remove container constraint around LiveBriefings, add section rules |

