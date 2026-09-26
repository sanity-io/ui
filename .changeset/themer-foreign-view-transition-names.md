---
'@sanity/themer': patch
---

The themer tool's motions keep time with `view-transition-name`s the Studio gives its own elements — an avatar named so it moves as one piece instead of stretching along with the navbar's snapshot. Every view transition the layout starts now carries the `sanity-themer` transition type, and while one runs every group on the page shares the layout's duration and easing instead of the browser's default quarter second and `ease`, which left them out of step with the navbar; the Studio's own transitions keep their own.
