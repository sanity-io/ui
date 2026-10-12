---
'@sanity/ui': patch
---

`Popover` sizing fixes:

- An open popover with `matchReferenceWidth` or `constrainSize` commits once per positioning pass (on scroll or resize) instead of twice, and fewer times when it opens, closes or its reference element resizes.
- Turning `constrainSize` off on an open popover now clears the max height it applied, and turning `matchReferenceWidth` off clears the reference-matched width. A change to either flag takes effect on the next positioning pass; it could stick until the popover remounted.
- A boundary element without a width (collapsed or `display: none`) no longer leaves the previous max width in place.
- A `style` passed to `Popover` no longer competes with the sizes the popover sets itself: `width` under `matchReferenceWidth`, `maxWidth` and `maxHeight` under `constrainSize`, and otherwise the width and max width from its `width` property and boundary. It applies where the popover sets none.
