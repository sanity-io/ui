---
'@sanity/themer': patch
---

The themer tool's motions leave room for `view-transition-name`s the Studio gives its own elements — an avatar named so it moves as one piece instead of stretching along with the navbar's snapshot. Every view transition the layout starts now carries the `sanity-themer` transition type, and while one runs every group on the page keeps the layout's duration and easing instead of the browser's default quarter second and `ease` that left them out of step with the navbar; the Studio's own transitions keep their own. The split copy gives up the names inside it, as a name rendered twice — once per Studio copy — made the browser skip the whole transition: with a named element in the Studio, the split preview neither slid in nor out.
