---
'@sanity/themer': minor
---

The themer tool's sidebar loads the first time it's needed instead of with the Studio: `@sanity/themer/tool` starts out with just the navbar toggle and the layout that applies the picked theme, and the theme list, the editor and the snippet dialog — with `react-refractor` and the other dependencies only they use — load on demand, starting as the pointer moves onto the navbar toggle or it gets focus. Pressed before they have loaded, the toggle's color wheel goes round, lap after lap, while the Studio stays as it is; from then on the sidebar stays mounted while closed, as before, and opens right away.
