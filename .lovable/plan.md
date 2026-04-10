

# Fix Fitness Page Variety + Missing Card Images

## Problems Identified

1. **Homepage fitness column shows all CrossFit**: `fitnessSpots.slice(0, 4)` grabs the first 4 entries, which are all CrossFit boxes (the data file starts with 10 CrossFit entries). Need a `getDiverseFitnessTeaser()` function like the existing `getDiverseSinglesTeaser()`.

2. **Missing images on cards**: When an image URL fails to load (404, CORS, etc.), the `onError` handler in `ListingImage.tsx` just hides the `<img>` element (`style.display = "none"`), leaving a blank space instead of showing the gradient+icon fallback.

3. **Edge function BOOT_ERROR**: The `image-search` function is intermittently returning 503 BOOT_ERROR. This is a cold-start/deployment issue — not a code fix, but the fallback handling needs to be better so users see a nice placeholder instead of broken cards.

## Changes

### 1. Add diverse fitness teaser on homepage (src/pages/Index.tsx)
- Create `getDiverseFitnessTeaser(count)` that picks one spot from different categories (Yoga, Gym, CrossFit, HIIT, Outdoor, etc.) — same pattern as `getDiverseSinglesTeaser`
- Replace `fitnessSpots.slice(0, 4)` with this function
- Also fix `showcasePhotos` array to pick diverse entries instead of index 0 and 5 (both CrossFit)

### 2. Fix ListingImage fallback on error (src/components/ListingImage.tsx)
- Replace the `onError` handler that hides the image. Instead, use React state to track load failure and render the gradient+icon fallback when the image fails to load
- This ensures every card always shows either a real image or a nice styled placeholder — never a blank space

### 3. Add more fitness category gradients (src/components/ListingImage.tsx)
- Add gradient colors for fitness categories: CrossFit, Gym, Yoga, HIIT, Outdoor, Running, Climbing, Boxing, etc.
- This makes fallback placeholders visually distinct per category instead of all showing the same gray

## Files

| Action | File | Details |
|---|---|---|
| Modify | `src/pages/Index.tsx` | Add `getDiverseFitnessTeaser()`, fix showcase photo picks |
| Modify | `src/components/ListingImage.tsx` | Fix onError to show fallback, add fitness category gradients |

No database or backend changes needed.

