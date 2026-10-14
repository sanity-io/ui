---
'@sanity/ui': patch
---

Omit the internal `#styled-system/*` import from the published package. It is a build-time alias for generated Panda files and is not part of the installed package.
