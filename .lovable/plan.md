

# INSPIRE OKC — Complete Premium Rebuild

## What's Changing

The current site looks like a template — generic editorial patterns, fake podcast episodes, fake blog posts, fake events, gradient placeholders, and a hollow hero. This rebuild strips all of that out and replaces it with a genuine, high-craft product that works beautifully with zero data. i ondt want podcasts. i want Coach TLC, WORKOUT OKC, InPerson OKC, My apps a place for me to put all of my apps orgahnized intoa p lace i can alwyas upgrade them. Singles OKC to find real signels events with web and social media full csraping and advacned, in workout okc it is all things fitness in okc and metro. inperson is ilke meetup or evntbrite. Men-Talk OKC. I also want you to look at all the repos in my prfile just to stroe the names for putting aaps form there int o my app for the new updates.

---

## 1. Hero Section with Your Image

- Use the uploaded INSPIRE Oklahoma City photo as the hero background image (copied to `src/assets/`)
- Full-viewport hero with a dark overlay for text legibility
- No gradients — solid dark overlay with opacity
- Clean, bold typography: "INSPIRE" + "Oklahoma City" in Inter (not Playfair — dropping the serif font entirely per your design law)
- Single accent-colored CTA button with firm corners
- Subtle downward scroll indicator (simple chevron, no bounce animation)

## 2. Typography & Design System Overhaul

- **Font**: Switch entirely to Inter (remove Playfair Display). One typeface, multiple weights
- **No gradients, no glass, no neon** anywhere in the codebase
- **Backgrounds**: Solid near-black (`#0a0a0a`) or solid off-white (`#fafafa`) only
- **Depth**: Borders, subtle box-shadows, spacing rhythm — no decorative flourishes
- **Accent**: Keep the single orange accent (`hsl(24, 80%, 50%)`)
- **Buttons**: Firm corners (2px radius max), subtle shadow, no rounded-none (use small radius for tactile feel)
- **Motion**: Reduce all animations to 150-250ms. Remove the staggered scroll reveal delays. Keep it crisp

## 3. Remove All Fake Data

Every section currently has hardcoded mock content. All of it gets removed:

- **Events section**: Replace 3 fake events with a designed empty state: icon + "No upcoming events" + "Check back soon" message
- **Podcast section**: Replace 8 fake episodes with empty state: headphones icon + "Episodes coming soon" + link to apply
- **Blog section**: Replace 3 fake posts with empty state: "No stories yet" + clean placeholder
- **Community section on homepage**: Keep the 4 program cards (these are real structural content, not fake data)
- **Story page**: Remove the fabricated origin story paragraphs and fake quote. Replace with a minimal "Our story is being written" state or just the structural heading with space for real content to be added later
- **Podcast page**: Remove all 8 fake episodes. Show empty episode list with designed empty state

## 4. Rename Programs to Real Names

Update everywhere programs appear (Community page, homepage CommunitySection, Apply page dropdown, Footer):

| Old Name | New Name | Tag |
|---|---|---|
| Adulting 101 | Volunteering OKC | Service |
| Singles Connect | Singles OKC | Community |
| Movement & Wellness | Workout OKC | Fitness |
| Self-Mastery | Coach TLC | Development |

Update icons accordingly:
- Volunteering OKC: `HandHeart` or `Users`
- Singles OKC: `Heart`
- Workout OKC: `Dumbbell`
- Coach TLC: `Target` or `Brain`

## 5. Page-by-Page Changes

### Homepage (`Index.tsx`)
- Hero: full-bleed image background with dark overlay, Inter typography, single CTA
- Events: empty state (no fake events)
- Podcast: empty state (no fake episodes)
- Community: 4 real program cards with updated names
- Blog: empty state (no fake posts)
- CTA: keep but simplify — solid black section, white text, one button

### Story Page
- Remove all fabricated paragraphs and fake quote
- Keep the page header structure
- Show a minimal, intentional state: just the heading + a single line like the tagline, with space for real content

### Podcast Page
- Remove all 8 fake episodes
- Show designed empty state with headphones icon, title, and description

### Community Page
- Update all 4 programs to real names
- Remove fake feature bullet points (those are fabricated content)
- Keep program descriptions but make them structural/minimal (not fabricated stories)

### Apply Page
- Update program dropdown to real names: Volunteering OKC, Singles OKC, Workout OKC, Coach TLC
- Keep form structure, it's functional

### Info Page
- Keep FAQ structure but note these are structural content, not fabricated user data
- Keep contact info section

### NotFound Page
- Keep as-is, it's clean

## 6. Navigation & Footer

### Navbar
- Switch to Inter font
- Remove `font-serif` references
- Keep the scroll-linked background change but ensure it uses solid backgrounds only (no `backdrop-blur` — that's glassmorphism)

### Footer
- Update program names in footer links
- Remove `backdrop-blur` if present
- Solid black background, clean link columns

## 7. CSS & Tailwind Cleanup

- Remove Playfair Display from Google Fonts import
- Remove `font-serif` from tailwind config (or keep but don't use)
- Remove `.drop-cap` styles (editorial flourish)
- Remove `.editorial-heading` serif dependency — switch to Inter bold
- Remove `bg-gradient-to-br` from BlogSection placeholders
- Remove `backdrop-blur-xl` from Navbar and mobile drawer — use solid backgrounds
- Ensure all `rounded-none` buttons get `rounded-sm` (2px) for tactile feel
- Reduce animation durations: ScrollReveal from 700ms to 200ms

## 8. Files Modified

| File | Change |
|---|---|
| `src/index.css` | Remove Playfair font import, update base styles, remove drop-cap, remove serif heading rules |
| `tailwind.config.ts` | Update font family to Inter-only, simplify animation durations |
| `src/assets/hero-bg.jpg` | Copy uploaded image here |
| `src/components/home/HeroSection.tsx` | Full rewrite — image background, Inter typography, no grain overlay |
| `src/components/home/EventsSection.tsx` | Replace fake events with designed empty state |
| `src/components/home/PodcastSection.tsx` | Replace fake episodes with designed empty state |
| `src/components/home/BlogSection.tsx` | Replace fake posts with designed empty state |
| `src/components/home/CommunitySection.tsx` | Update program names, remove fake descriptions |
| `src/components/Navbar.tsx` | Remove backdrop-blur, use solid bg, Inter font |
| `src/components/Footer.tsx` | Update program names |
| `src/components/SectionHeading.tsx` | Remove serif dependency |
| `src/components/ScrollReveal.tsx` | Reduce animation duration to 200ms |
| `src/pages/Story.tsx` | Remove fabricated content, show minimal intentional state |
| `src/pages/Podcast.tsx` | Remove fake episodes, show empty state |
| `src/pages/Community.tsx` | Update all 4 programs to real names, clean up fake features |
| `src/pages/Apply.tsx` | Update dropdown to real program names |
| `src/pages/Info.tsx` | Minor font updates |
| `src/pages/NotFound.tsx` | Minor font updates |

