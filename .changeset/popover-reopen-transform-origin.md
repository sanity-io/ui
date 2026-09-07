---
"@sanity/ui": patch
---

Fix animated `Popover` and `Tooltip` (and thereby `MenuButton`) scaling from the center instead of the reference element every time they are shown after the first. The `transform-origin` computed by the floating-ui `origin` middleware is now applied as a plain CSS property instead of motion's `originX`/`originY` style keys, which motion resets to their initial (unpositioned) values whenever the `Activity`-hidden element re-mounts.
