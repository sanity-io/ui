---
'@sanity/ui': patch
---

Prefix the hashed Panda class names of `@sanity/ui/styles.css` with `u-` (`display: flex` is now `u-HgOzd`), so they cannot coincide with the names of other Panda builds on the same page, and keep an append-only manifest of every class name ever emitted (`packages/ui/test/class-names/manifest.json`) so that no later release can reuse a name for a different style.
