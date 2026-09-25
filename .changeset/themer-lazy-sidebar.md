---
'@sanity/themer': minor
---

The themer tool's sidebar loads the first time it opens instead of with the Studio: `@sanity/themer/tool` starts out with just the navbar toggle and the layout that applies the picked theme, and the theme list, the editor and the snippet dialog — with `motion`, `react-refractor` and the other dependencies only they use — load on demand. While they do, the Studio stays as it is and the navbar toggle shows a spinner; from then on the sidebar stays mounted while closed, as before, and opens without one.
