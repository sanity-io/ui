---
'@sanity/ui': patch
---

Replace the vanilla-extract static stylesheet with StyleX. `styled-components`, theme objects, component props, and `@sanity/ui/styles.css` stay the same. The sheet is minified into `@layer sui.global`, the same layer `@sanity/ui@5` uses, and class names are content hashes, so a later release cannot reuse a class for a different rule.
