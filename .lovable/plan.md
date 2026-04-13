

# Momento Mori Showcase Page + Header Flicker Fix

## Problem
1. **Momento Mori**: User wants the app from `github.com/TLC405/momentomori` accessible as a page within Inspire OKC -- clicking a link opens the full app as a showcase, kept separate from the main Inspire codebase.
2. **Header flicker**: The sticky header's nameplate collapse (`grid-rows-[0fr]` + `opacity-0`) causes visual flickering during scroll. The `opacity` transition on the grid wrapper creates a flash as the layout shift and fade fight each other. Additionally, `transition-all` on the h1's letter-spacing causes reflow during the grid animation.

## Plan

### 1. Fix Header Flicker (`src/components/Navbar.tsx`)
- Remove `opacity-0`/`opacity-100` from the grid-rows collapse wrapper -- the `grid-rows-[0fr]` + `overflow-hidden` already hides content cleanly without needing opacity.
- Remove `transition-[grid-template-rows,opacity]` and replace with just `transition-[grid-template-rows]` to avoid the opacity causing a visible flash.
- Remove `transition-all` from the h1 hover tracking change (the letter-spacing reflow during collapse causes jank). Use a transform-based hover effect instead or remove it.
- Add `will-change: grid-template-rows` to hint the browser for smoother compositing.

### 2. Create Momento Mori Showcase Page (`src/pages/MomentoMori.tsx`)
- New page component that renders the Navbar, then a full-viewport iframe embedding the deployed Momento Mori app.
- The iframe URL will be the published Lovable URL for that project. Since the README doesn't show a custom domain, we'll need the user to confirm the URL -- but the standard Lovable pattern is `https://<slug>.lovable.app`. I'll use a placeholder and ask.
- The page includes a small top bar with "Back to Inspire" link and "Momento Mori" title, then the iframe fills remaining space.
- No Inspire footer/nav overlapping the iframe -- minimal chrome so the showcase app feels standalone.

### 3. Add Route (`src/App.tsx`)
- Add `/momento-mori` route pointing to the new page.

### 4. Add Nav Link (`src/components/Navbar.tsx`)
- Add a GitHub-style link or "Momento Mori" link in the upper utility bar, linking to `/momento-mori` internally (not to GitHub).

### 5. Add to Mobile Tab Bar (`src/components/MobileTabBar.tsx`)
- Add "Momento Mori" to the "More" dropdown menu.

## Question needed
I need to confirm the deployed URL for the Momento Mori app to embed it. It's likely something like `https://momento-mori-xxx.lovable.app` or a custom domain.

| File | Change |
|---|---|
| `src/components/Navbar.tsx` | Remove opacity from collapse transition; add showcase link |
| `src/pages/MomentoMori.tsx` | New iframe showcase page |
| `src/App.tsx` | Add `/momento-mori` route |
| `src/components/MobileTabBar.tsx` | Add to More menu |

