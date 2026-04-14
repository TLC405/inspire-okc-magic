

# Wire Ticker Fix + Massive Content Expansion

## Problem
The wire ticker animation (`translateX` CSS animation) causes visual glitching during page scroll because the browser re-composites the animated element alongside scroll repaints. The ticker also has only 9 static headlines and no user customization.

## Fix: Performance

1. **GPU-accelerate the ticker track** — add `will-change: transform`, `transform: translateZ(0)`, and `contain: content` to `.wire-ticker-track` so the animation runs on the compositor thread, independent of scroll repaints
2. **Isolate the ticker container** — add `contain: layout style` and `isolation: isolate` to `.wire-ticker` to prevent scroll-triggered repaints from bleeding into the ticker's render layer
3. **Remove `backdrop-blur`** influence — ensure no parent element's blur filter forces re-compositing of the ticker

## Enhancement: Massively More Content

4. **Expand static ticker from 9 to 30+ headlines** covering: Sports (Thunder, Comets, Energy FC, Dodgers), City Hall, Arts & Culture, Weather, Business, Real Estate, Food & Drink, Community Events, Education, Tech, Health, Parks, Transit
5. **Add an AI-powered wire feed edge function** (`wire-feed`) that uses Lovable AI to generate fresh headlines from a system prompt, returning 20+ headlines per call — cached in a `wire_feed_cache` table so it only regenerates periodically
6. **Make the ticker taller and more readable** — increase from 11px to 12px font, add subtle category color coding

## Enhancement: User Customization

7. **Add a ticker settings popover** — users can toggle which categories they want to see (Sports, City Hall, Arts, Weather, etc.) stored in localStorage
8. **Category filter chips** — when user clicks the WIRE badge, a dropdown shows checkboxes for each category
9. **Speed control** — slow/medium/fast ticker speed preference

## Files

| File | Change |
|---|---|
| `src/index.css` | GPU acceleration + isolation on `.wire-ticker` classes |
| `src/components/WireTicker.tsx` | Full rewrite: category filtering, localStorage prefs, settings popover, expanded items, AI feed integration |
| `src/data/civicData.ts` | Expand `tickerItems` from 9 to 30+ headlines across 12+ categories |
| `supabase/functions/wire-feed/index.ts` | New edge function: AI generates fresh city headlines |
| New migration | `wire_feed_cache` table for caching AI-generated headlines |

## Technical Notes
- The CSS `will-change: transform` + `contain: content` combo is the standard fix for scroll-jank on CSS-animated elements
- AI wire feed uses `google/gemini-3-flash-preview` (cheapest model) with tool calling to return structured headline JSON
- localStorage-based preferences mean no auth needed for customization
- Ticker settings popover uses existing shadcn Popover component

