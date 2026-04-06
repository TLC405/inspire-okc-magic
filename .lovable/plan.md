

# Newspaper-Style Unified Header

## What Changes

Remove the separate "INSPIRE OKC" branding from the navbar and merge the entire header into a single, realistic newspaper masthead bar. The navbar becomes the newspaper's top strip — like a real broadsheet where the nameplate, date, navigation, and edition info all live together in one cohesive band.

## Design

```text
┌──────────────────────────────────────────────────────────┐
│  Vol. I · No. 42          ══════════════════             │
│                     INSPIRE                              │
│               OKLAHOMA CITY                              │
│  Apr 6, 2026 · Sunday    Singles | Events | Fitness ...  │
│  ─────────────────────────────────────────────────────── │
└──────────────────────────────────────────────────────────┘
```

The masthead text ("INSPIRE" + "OKLAHOMA CITY") is centered in Playfair Display with decorative rules above and below. The date/edition sits left, nav links sit right — all in one header block. A thin double-rule border at the bottom gives the authentic newspaper edge. No more floating "INSPIRE OKC" text that competes with the hero.

## Technical Details

### 1. Rebuild Navbar (src/components/Navbar.tsx)
- Remove the `<Link to="/">INSPIRE / Oklahoma City</Link>` logo block entirely
- Replace with a stacked newspaper masthead layout:
  - Top row: small "Vol. I" left, decorative flourish center, settings/theme right
  - Center: "INSPIRE" in `masthead` class (Playfair Display, large)
  - Below: "OKLAHOMA CITY" in `masthead-sub` class with letter-spacing
  - Bottom row: date left, nav links center-right, all separated by a thin rule
- Use `border-b-2 border-double border-foreground` for the authentic bottom rule
- Keep sticky positioning, reduce padding

### 2. Remove Hero Masthead Duplication (src/pages/Index.tsx)
- Remove the "INSPIRE" and "Oklahoma City" text from the hero overlay (lines 72-73) since they now live in the navbar
- Keep the hero image, gradient, date/listings info, and search bar
- The hero becomes a clean photo with the search overlay only

### 3. Newspaper Header Styles (src/index.css)
- Add `.newspaper-rule` class for thin decorative horizontal rules
- Add `.newspaper-header` with the warm newsprint background matching the editorial theme
- Size the masthead appropriately for the navbar context (smaller than the old hero version)

## Files

| Action | File | Details |
|---|---|---|
| Modify | `src/components/Navbar.tsx` | Full rebuild as newspaper masthead with integrated nav |
| Modify | `src/pages/Index.tsx` | Remove duplicate masthead text from hero section |
| Modify | `src/index.css` | Add newspaper rule and header utility classes |

No new dependencies. No database changes.

