# Public AI Concierge — "Ask About OKC"

## What Gets Built

A public-facing AI chat widget on the homepage where any visitor can ask questions about Oklahoma City. The concierge queries the persistent knowledge graph (entities, relationships) and static listing data to provide grounded answers.

## Architecture

```text
Homepage Widget (collapsible)
  └─ sends question to new edge function
        └─ queries entities + entity_relationships tables
        └─ queries static listing counts/categories
        └─ sends context + question to Lovable AI Gateway
        └─ streams response back (SSE)
  └─ renders markdown response token-by-token
```

## Implementation

### 1. New Edge Function: `supabase/functions/city-concierge/index.ts`

- **No auth required** (public-facing)
- Accepts `{ question: string }` 
- Queries `entities` table for relevant matches (name ILIKE search terms, limit 20)
- Queries `entity_relationships` to find connections for matched entities
- Builds a context block with entity data + static counts (from hardcoded summary)
-  no Calls Lovable AI Gateway 
- never lovable use open soruice for efverting 
- System prompt: grounded OKC civic concierge, uses only provided entity context, newspaper editorial tone, no emoji
- Handles 429/402 errors properly
- Returns SSE stream

### 2. New Component: `src/components/CityConciergе.tsx`

- Floating button in bottom-right corner (above mobile tab bar): "Ask About OKC"
- Expands into a compact chat panel (max 400px wide, 500px tall)
- Single input field + send button
- Shows conversation history (user messages + streamed AI responses)
- Renders AI responses with `react-markdown`
- Close/minimize button
- Professional styling matching newspaper theme (no emoji, editorial feel)
- Rate limit (429) and credit (402) error handling with user-friendly toasts

### 3. Modified: `src/pages/Index.tsx`

- Import and render `<CityConciergе />` component at the bottom of the page

### 4. Modified: `src/components/SearchSurface.tsx` (optional enhancement)

- Add a small "or ask our AI concierge" link below search that opens the concierge

## Files


| File                                         | Action                                        |
| -------------------------------------------- | --------------------------------------------- |
| `supabase/functions/city-concierge/index.ts` | New — public AI concierge with entity context |
| `src/components/CityConcierge.tsx`           | New — floating chat widget                    |
| `src/pages/Index.tsx`                        | Modified — add CityConcierge component        |


## Technical Notes

- fetied to existing Groq implementation
- Entity context is fetched server-side via service role, keeping the knowledge graph queries secure
- No conversation persistence needed — ephemeral chat for quick questions
- Widget is render-lazy (only loads chat UI when opened) fix two lgih apges but one ldight pager is dark 