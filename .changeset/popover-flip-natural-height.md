---
'@sanity/ui': patch
---

Fix a `Popover` with `constrainSize` staying on a side it no longer fits. `flip` measured the popover at the max height `size` set for its current side, so once short content moved it below its reference, longer content stayed below, capped and scrolling with room above. `flip` now gets the popover's full height, and scroll positions inside the popover are kept.
