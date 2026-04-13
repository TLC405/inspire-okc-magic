
# Fix Masthead Scroll-Collapse Glitch

## Problem
The nameplate section uses `max-height` transition from `max-h-60` to `max-h-0` with `opacity`. This causes:
1. **Layout jump** — `max-height: 0` collapses the element but the transition is imprecise (max-h-60 = 240px but actual content is ~120px, so the animation starts with dead time)
2. **Composite layer thrash** — `will-change` on both `max-height` and `opacity` forces repaints

## Fix (single file: `Navbar.tsx`)
Replace the `max-height` hack with a proper `grid` row collapse pattern — this is the modern, glitch-free way to animate height to/from 0:

```tsx
// Replace the nameplate wrapper (lines 208-212)
<div
  className={cn(
    "grid transition-[grid-template-rows,opacity] duration-300 ease-in-out",
    scrolled ? "grid-rows-[0fr] opacity-0" : "grid-rows-[1fr] opacity-100"
  )}
>
  <div className="overflow-hidden">
    {/* ...existing nameplate content unchanged... */}
  </div>
</div>
```

This uses CSS `grid-rows-[0fr]` → `grid-rows-[1fr]` which smoothly animates the actual content height with no jump, no guessing max-height values, and no layout thrash. The inner `overflow-hidden` div clips content during collapse.

## Files Modified
| File | Change |
|---|---|
| `src/components/Navbar.tsx` | Replace `max-h` collapse with `grid-rows` collapse pattern (~3 lines changed) |
