---
"@sanity/themer": patch
"@sanity/ui": patch
---

fix(deps): update dependency styled-components to ^6.5.0

styled-components 6.5 tightens polymorphic call-site and `style` prop typing. Adjust `@sanity/ui` for the new checks: narrow `as` at `Box`/`VirtualList` call sites to avoid TS2589, align `Card`'s `$tone`/`$muted` with the values actually passed, and drop now-unnecessary assertions on `motion.create(Card)` wrappers.
