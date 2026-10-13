---
'@sanity/ui': patch
---

Fixes a bug where loading multiple versions of `@sanity/ui` 4.x on the same page could cause CSS class name collisions, making components display incorrectly.

Starting with this release, generated CSS class names are guaranteed to be unique to each `@sanity/ui` version, so multiple versions can safely share a page without their styles clashing.

No changes are needed in your code—keep importing `@sanity/ui/styles.css` as before.
