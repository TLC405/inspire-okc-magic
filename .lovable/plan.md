

# Apply `--font-body` CSS Variable to Body Text

The `--font-body` variable is already defined per-theme (Bricktown = Archivo, TLC = Quicksand, others = Inter) but never applied anywhere. Two small changes fix this:

## Changes

### 1. `src/index.css` — Add base body rule
Add `font-family: var(--font-body);` to the `body` element in `@layer base` so every theme's body font takes effect automatically.

### 2. `tailwind.config.ts` — Wire up Tailwind's `font-sans`
Update the `fontFamily.sans` definition to reference `var(--font-body)` as the primary font, so all Tailwind `font-sans` utility usage also respects the theme.

This is a two-line change total. No new files, no component edits.

