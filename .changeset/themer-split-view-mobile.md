---
'@sanity/themer': minor
---

The themer tool's split preview keeps the Studio next to the sidebar in the appearance the Studio is set to — light or dark from the appearance menu, with the picked theme — and slides a copy in the opposite scheme in from off screen on the far side, through React's `ViewTransition`: the copy slides in without fading, the Studio it makes room for cross-fades between its two widths at full height, and the sidebar stays put. `@sanity/themer` now requires React 19.3 for this. The tool works on small screens too: the sidebar covers the Studio instead of standing next to it, the split preview stacks the two copies, and the theme cards flow into more columns when the sidebar is wide enough.
