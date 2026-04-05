

# UI Depth + Skeuomorphic Polish + Simplified UX

## Current Problems
- Everything is flat text on flat backgrounds — no visual depth, shadows, or texture
- Filter sections on directory pages are confusing walls of chips and collapsibles
- Result cards are just plain text rows with no visual separation or dimensionality
- Homepage three-column teasers feel like a spreadsheet, not a premium product
- No tactile/skeuomorphic feel anywhere — no embossing, insets, raised surfaces, paper textures

## Design Direction: Newspaper Skeuomorphism

Think physical newspaper meets premium iOS: raised card surfaces with subtle paper texture, inset search fields that look carved into the surface, embossed section headers, soft drop shadows on cards, subtle gradients on filter chips to make them feel like physical buttons, and warm noise/grain on backgrounds.

---

## Plan

### 1. Skeuomorphic CSS Foundation (`src/index.css`)

Add new utility classes that give physical depth:
- **`.skeuo-card`** — raised surface with layered box-shadows (soft outer + crisp inner), subtle paper-grain background via CSS noise gradient, 1px highlight on top edge
- **`.skeuo-card-inset`** — pressed-in/recessed surface for search inputs and filter panels (inner shadow, darker background)
- **`.skeuo-chip`** / **`.skeuo-chip-active`** — filter chips that look like physical toggle buttons with gradient, pressed state with inset shadow
- **`.skeuo-search`** — search input that looks carved into the surface with inner shadow and subtle border gradient
- **Paper texture** — add a faint CSS repeating-radial-gradient noise to the background body
- **`.skeuo-badge`** — tags/badges with subtle emboss effect (1px text-shadow for engraved look)
- **`.skeuo-divider`** — horizontal rules with a 3D groove/ridge effect instead of flat lines

Update existing editorial theme colors to have slightly warmer, more textured tones.

### 2. Simplified Fitness Page (`src/pages/Workouts.tsx`)

**Simplify the filter UX:**
- Replace the separate District bar + Category collapsibles with a **single sidebar panel** on desktop (sticky, left side) and a **slide-out drawer** on mobile (triggered by a "Filters" button)
- The filter panel itself uses `skeuo-card-inset` styling — looks recessed into the page
- Inside: District dropdown (select, not 19 chips), Category grouped list with counts
- Active filters show as removable pills above results

**Upgrade result cards:**
- Each fitness spot renders inside a `skeuo-card` with raised shadow, paper-grain texture
- Category badge gets color-coded accent strip on the left edge (like a physical tab/divider)
- Tags use `skeuo-badge` embossed style
- External link button gets a subtle raised button treatment
- Remove the faint "01" numbering — replace with category icon in a small circle

### 3. Simplified Singles Page (`src/pages/Singles.tsx`)

Same treatment as Fitness:
- Filter panel consolidated into sidebar/drawer instead of 3 separate grid sections
- Result cards upgraded to `skeuo-card` with depth
- Category/frequency/neighborhood as a single compact filter panel

### 4. Simplified Volunteering Page (`src/pages/Volunteering.tsx`)

Same card + filter treatment for consistency.

### 5. Homepage Polish (`src/pages/Index.tsx`)

- **Masthead area**: Add subtle paper texture background, embossed rule lines
- **Three-column teasers**: Each column gets a `skeuo-card` treatment — raised panels with shadow, hover lift effect
- **Search bar**: `skeuo-search` inset styling — looks carved into the page
- **Discover section**: Cards get raised treatment with category color accent strips
- **Quick-nav cards (mobile)**: Raised with shadow + icon, feel tappable

### 6. Discover Page (`src/pages/Discover.tsx`)

- Filter buttons get `skeuo-chip` treatment
- Result cards get `skeuo-card` with category color strip
- Consistent with other pages

### 7. Navbar + Footer Polish

- **Navbar**: Add subtle bottom shadow (not just border) for floating-header feel
- **Footer**: Subtle top inner-shadow to feel grounded

---

## Files

| Action | File | Details |
|---|---|---|
| Modify | `src/index.css` | Add skeuomorphic utility classes, paper texture, emboss effects |
| Modify | `src/pages/Workouts.tsx` | Sidebar filters, skeuo cards, simplified UX |
| Modify | `src/pages/Singles.tsx` | Sidebar filters, skeuo cards |
| Modify | `src/pages/Volunteering.tsx` | Sidebar filters, skeuo cards |
| Modify | `src/pages/Index.tsx` | Raised cards, textured masthead, inset search |
| Modify | `src/pages/Discover.tsx` | Skeuo card grid, chip filters |
| Modify | `src/components/Navbar.tsx` | Subtle shadow depth |
| Modify | `src/components/Footer.tsx` | Inner shadow grounding |

