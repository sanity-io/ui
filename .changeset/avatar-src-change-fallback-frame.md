---
"@sanity/ui": patch
---

Fix `Avatar` rendering the initials fallback for one frame after `src` changes away from an image that failed to load. The failed state now resets while rendering instead of in an effect, so the replacement image renders in the same commit as the new `src`.
