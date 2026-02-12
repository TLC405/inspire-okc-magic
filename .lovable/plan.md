# INSPIRE OKC -- Full Cleanup + World-Class Redesign Pass

## What's Changing

### 1. Homepage: Remove Small "INSPIRE OKC" Header Text

The small "INSPIRE OKC" text in the top-left of the homepage header is redundant -- the massive 3D LogoReveal already handles branding. Remove it so the header only shows nav links (Story, Programs, Info) and the theme toggle on the right side, keeping the layout clean and letting the logo animation be the star.

### 2. Homepage: Directory Links (01-05) Clickable with Proper Destinations

Currently items 01-04 all link to `/community`. Update them so each directory links to a scroll anchor or section on the Community page, and Men-Talk links to `/men-talk`. Each item gets a stronger hover state with scale and glow so they feel interactive and premium.

### 3. Delete All Dead/Unused Code

These files are leftover from earlier iterations and no longer imported anywhere:


| File to Delete                             | Reason                                                             |
| ------------------------------------------ | ------------------------------------------------------------------ |
| `src/App.css`                              | Vite boilerplate (logo-spin, .card, .read-the-docs). Not used.     |
| `src/components/NavLink.tsx`               | Custom NavLink wrapper -- never imported by any page or component. |
| `src/components/SectionHeading.tsx`        | Generic heading component -- never imported anywhere.              |
| `src/components/home/AboutSection.tsx`     | Old homepage section -- replaced by single-viewport blueprint.     |
| `src/components/home/CTASection.tsx`       | Old homepage CTA -- replaced by inline CTA in HeroSection.         |
| `src/components/home/CommunitySection.tsx` | Old homepage programs list -- replaced by directory grid.          |


### 4. World-Class Redesign Pass on All Pages

Every page gets a visual upgrade to feel cohesive and premium:

**Homepage (`HeroSection.tsx`)**

- Fix background image loading (ensure `hero-bg.jpg` displays properly -- the screenshot shows pure black)
- Remove the small "INSPIRE OKC" logo from header bar
- Make directory grid items larger with better spacing and stronger hover animations
- Add a mobile hamburger menu to the homepage header (currently nav links are hidden on mobile with no way to access them)

**Community Page (`Community.tsx`)**

- Add scroll-anchor IDs to each program section so homepage links can deep-link
- Upgrade the program cards with larger icons, bolder hover states, and accent fills on hover
- Make the stats bar more dramatic with larger numbers and tighter spacing

**InPerson OKC**

**Volunteering OKC**

**Fitness OKC THOSE ARE ONTHE TOP WITH OTHERSAND GET THOSEPAGES READY AND WROLD CLASS.**

 **(**`Story.tsx`**)**

- Refine narrative block typography -- increase heading sizes slightly
- Add a subtle accent gradient on the hero section for more depth

**Info Page (`Info.tsx`)**

- Polish contact cards with a subtle shadow on hover
- Make FAQ items smoother with better open/close transitions

**Podcast/Men-Talk Page (`Podcast.tsx`)**

- Ensure the gate and content both render correctly across all themes
- Tighten the "Sessions Launching" box styling

**404 Page (`NotFound.tsx`)**

- Replace the basic Button component with the brutalist-styled border button used everywhere else
- Add a monospaced data reference line for consistency

**Footer (`Footer.tsx`)**

- Ensure consistent styling and that all directory links point to correct routes

**Navbar (`Navbar.tsx`)**

- Add hamburger menu visibility on homepage for mobile (currently homepage has no mobile nav at all)

### 5. Verify All Routes

Confirm these routes all work:

- `/` -- Homepage
- `/story` -- Story page
- `/community` -- Programs/Community page
- `/info` -- Info page
- `/men-talk` -- Men-Talk OKC (gated)
- `/*` -- 404 Not Found

---

## Technical Summary


| Action | Files                                                                                                                                                                                                      |
| ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Delete | `src/App.css`, `src/components/NavLink.tsx`, `src/components/SectionHeading.tsx`, `src/components/home/AboutSection.tsx`, `src/components/home/CTASection.tsx`, `src/components/home/CommunitySection.tsx` |
| Modify | `src/components/home/HeroSection.tsx` (remove small logo, fix bg, enhance directory grid, add mobile menu)                                                                                                 |
| Modify | `src/pages/Community.tsx` (add anchor IDs, polish cards)                                                                                                                                                   |
| Modify | `src/pages/Story.tsx` (typography refinements)                                                                                                                                                             |
| Modify | `src/pages/Info.tsx` (contact card polish)                                                                                                                                                                 |
| Modify | `src/pages/Podcast.tsx` (minor styling tightening)                                                                                                                                                         |
| Modify | `src/pages/NotFound.tsx` (brutalist button styling)                                                                                                                                                        |
| Modify | `src/components/Navbar.tsx` (mobile menu on homepage)                                                                                                                                                      |
| Modify | `src/components/Footer.tsx` (link verification)                                                                                                                                                            |
