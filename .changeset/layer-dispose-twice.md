---
"@sanity/ui": patch
---

Calling the disposer returned by `useLayer().registerChild()` more than once no longer corrupts the
parent layer's `size` and `isTopLayer`.
