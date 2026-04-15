---
'@sanity/ui-workshop': patch
'@sanity/ui-tokens': patch
'@sanity/ui-css': patch
'@sanity/ui': patch
---

Simplifies imports by re-exporting css and token utilities from `@sanity/ui`.

You must now import everything from the root package:

- `@sanity/ui/index.css` instead of `@sanity/ui/css/index.css`
- tokens and css utilities directly from `@sanity/ui`
