---
'@sanity/ui': patch
---

fix(hooks): keep `useMediaIndex` subscribed when the theme object changes but its breakpoints do not. The hook keyed its media query store on the identity of the theme's `media` array, so a different theme object with the same breakpoints (`buildTheme({media})` built per workspace or scheme, cloned or deserialized themes) tore down and re-created `media.length + 1` `MediaQueryList`s and `change` listeners in every subscribed hook. Equal breakpoint arrays now resolve to one canonical instance, so only an actual change of breakpoints re-subscribes.
