---
"@sanity/ui": major
---

**The private `@sanity/ui/_visual-editing` entry point is removed.**

Import from `@sanity/ui` instead. The slim subset is no longer needed: `displayName` side effects are gone, so unused components tree-shake out of consuming bundles.
