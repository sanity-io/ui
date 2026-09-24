---
'@sanity/themer': minor
---

The themer tool's split preview keeps the Studio next to the sidebar in the appearance the Studio is set to — light or dark from the appearance menu, with the picked theme — and slides a copy in the opposite scheme in on the far side, animated with a view transition (`AnimateView` from `motion`, on React 19.3). The tool works on small screens too: the sidebar covers the Studio instead of standing next to it, the split preview stacks the two copies, and the theme cards flow into more columns when the sidebar is wide enough.
