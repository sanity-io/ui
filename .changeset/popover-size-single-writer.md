---
'@sanity/ui': patch
---

Fix `Popover` sizing:

- Reduce extra renders when positioning or resizing.
- Apply `constrainSize` and `matchReferenceWidth` changes on the next positioning pass, clearing the applied max height or matched width when disabled.
- Clear stale max widths for zero-width boundaries and clamp negative sizes to zero.
- Give calculated sizes precedence over conflicting `style` values; other styles still apply.
