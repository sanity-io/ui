---
"@sanity/ui": patch
---

fix: replace deprecated external APIs instead of suppressing them

- `Toast` now orchestrates its child animations with `delayChildren: stagger(interval)` instead of `motion`'s deprecated `staggerChildren`.
- `useForwardedRef` and the internal menu controller type refs as `RefObject` instead of React's deprecated `MutableRefObject` (identical shape, so no API change).
- `Toast` and `Autocomplete` pass `gap` instead of the deprecated `space` prop internally.
