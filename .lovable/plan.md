

# INSPIRE OKC — Brutalist Warmth Rebuild

## The Problem Right Now

The site has controlling, preachy language ("stop scrolling", "start showing up", "ready to show up?", "apply now"). It feels like a brand lecturing people. The programs are mislabeled as things you "join" or "apply to" — they're actually directories and finders. Men-Talk OKC is missing entirely. There's no sense of what INSPIRE OKC actually is or why it exists. The design is still too safe and template-like.

## Core Identity Shift

INSPIRE OKC is rooted in **loneliness psychology** — the idea that disconnection is the real crisis, and the antidote is simply making it easier for people to find each other and do things together. It's not a club. It's not an organization you apply to. It's a set of tools and directories that help people in Oklahoma City find:

- **Singles events** happening around OKC (Singles OKC)
- **Fitness and exercise** opportunities — gyms, runs, classes, outdoor workouts (Workout OKC)
- **Volunteering** opportunities and places to give back (Volunteering OKC)
- **Personal coaching** and development (Coach TLC)
- **Men's conversations** about real life (Men-Talk OKC)

**Tagline direction**: Community. Connection. Health. — grounded in the psychology of belonging.

---

## 1. Tone & Language Overhaul (Every Page)

Remove ALL commanding/controlling copy:
- "Stop scrolling" -- gone
- "Start showing up" -- gone
- "Get out & do something" -- gone
- "Ready to show up?" -- gone
- "Apply Now" / "Join" buttons -- gone (there is no application)
- "Pick what fits. Show up. That's it." -- gone

Replace with warm, human, psychology-informed language:
- Hero tagline: "Community. Connection. Health." with a subtitle about loneliness and belonging
- Program descriptions explain what each tool helps you **find**, not what you should do
- CTA buttons say "Explore" or "Browse" or "Find Events" — not "Apply" or "Join"

## 2. Add Men-Talk OKC (Missing Program)

Add as the 5th program everywhere:
- **Men-Talk OKC** — tag: "Conversation" — icon: `MessageCircle` or `Users`
- Description: A space for men to have real conversations about life, purpose, and growth
- Added to: Community page grid, homepage CommunitySection, Footer, navbar if needed

## 3. About / Origin Section

Add a section (on homepage or Story page) that explains what INSPIRE OKC is:
- Born from the loneliness epidemic — backed by real psychology
- Built in Oklahoma City, for Oklahoma City
- Not a club, not a brand — a set of community tools
- Structural copy only (no fabricated founding story)

## 4. Design Push: More Brutalist

Current design is clean but safe. Push it harder:
- **Larger, bolder typography** — headline sizes pushed to extremes (9xl+), tighter letter-spacing
- **Raw borders** — thicker 2px borders on cards and sections, harsh grid lines
- **Monochrome dominance** — less accent color, more black/white contrast
- **Asymmetric layouts** — break the centered-everything pattern; left-aligned hero content, offset grids
- **Dense information panels** — program cards feel like data panels, not marketing cards
- **No rounded corners on major elements** — square edges for brutalist feel (keep 2px on small inputs only)
- **Horizontal rules and dividers** as structural elements
- **All-caps labels used more aggressively** throughout

## 5. Remove Apply Page & All "Apply" References

- Remove `/apply` route from `App.tsx`
- Remove Apply from navbar links
- Remove Apply from footer links
- Remove all "Apply Now" buttons across every page
- Replace CTA sections with "Explore Programs" or links to individual program directories

## 6. Restructure Programs as Directories/Finders

Each program card should communicate that it's a **finder/directory**, not a group to join:
- **Volunteering OKC**: "Find volunteer opportunities and places to give back across Oklahoma City"
- **Singles OKC**: "Discover singles events, meetups, and social gatherings in OKC"
- **Workout OKC**: "All things fitness — gyms, runs, classes, outdoor workouts in OKC and metro"
- **Coach TLC**: "Connect with personal coaching, mindset work, and growth resources"
- **Men-Talk OKC**: "Real conversations for men about life, growth, and purpose"

Buttons say "Browse" or "Explore" — not "Join" or "Apply"

## 7. Homepage Restructure

```
Hero (full-viewport, your OKC photo, brutalist typography)
  |
About INSPIRE (what it is, psychology of connection)
  |
Programs Grid (5 programs as directory cards)
  |
CTA (warm, inviting — "Find your people" not "Apply now")
  |
Footer
```

Remove: EventsSection, PodcastSection, BlogSection empty states — they add nothing right now. The homepage should be tight: hero, about, programs, footer.

## 8. Files Changed

| File | Change |
|---|---|
| `src/App.tsx` | Remove `/apply` route, keep all other routes |
| `src/pages/Index.tsx` | Remove Events, Podcast, Blog sections; add About section |
| `src/components/home/HeroSection.tsx` | New tagline, remove "Apply Now" button, push brutalist typography harder |
| `src/components/home/CommunitySection.tsx` | Add Men-Talk OKC, rewrite descriptions as directories, remove "Join" language |
| `src/components/home/CTASection.tsx` | Warm CTA about connection, no "Apply" |
| `src/pages/Community.tsx` | Add Men-Talk OKC, rewrite all copy, remove "Apply" buttons, push brutalist grid |
| `src/components/Navbar.tsx` | Remove "Apply" link, update nav |
| `src/components/Footer.tsx` | Remove "Apply" link, add Men-Talk OKC |
| `src/pages/Story.tsx` | Add real structural content about loneliness psychology and INSPIRE's purpose |
| `src/index.css` | Push brutalist styling — thicker borders, bolder type utilities |
| `src/components/home/AboutSection.tsx` | New component — what INSPIRE OKC is and why it exists |

Delete:
| `src/pages/Apply.tsx` | Remove entirely |
| `src/components/home/EventsSection.tsx` | Remove (empty state adds nothing) |
| `src/components/home/PodcastSection.tsx` | Remove from homepage (Men-Talk is a program, not a podcast section) |
| `src/components/home/BlogSection.tsx` | Remove (empty state adds nothing) |

