---
'@sanity/ui': patch
---

`Popover` sizing changes:

- Turning `constrainSize` off on an open popover now clears the max height it had been given (it used to stick), and turning `matchReferenceWidth` off clears the reference-matched width.
- Changing `constrainSize`, `matchReferenceWidth`, the margins or `fallbackPlacements` of an open popover now applies to its next positioning pass; the first values used to stick until the popover remounted. The same goes for `Tooltip`'s `fallbackPlacements`.
- An open popover follows a swapped boundary element, and a boundary without a width (collapsed or `display: none`) or narrower than the popover's padding no longer leaves the previous width cap in place; nor do margins wider than the reference element leave the previous width in place under `matchReferenceWidth` (the sizes are never written as negative lengths, which CSS rejects).
- A `style` passed to `Popover` can no longer set a size the popover manages itself (`width` with `matchReferenceWidth`, `maxWidth` and `maxHeight` with `constrainSize`); where the popover has no value of its own, the consumer's applies.
- One commit less per open and per reference resize of a `matchReferenceWidth` or `constrainSize` popover, and one render less per popover when its boundary element arrives after mount.

Under the hood, the popover renders its width and max width on the card instead of re-applying them from an effect after every render, the `size` middleware writes only the sizes it owns (and reads the boundary only when it applies them), and the middleware reads the boundary elements and the width cap through refs — repositioning an open popover itself when they change, once per task — so that a change does not recreate the middleware and restart Floating UI's observers.
