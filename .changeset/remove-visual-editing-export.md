---
"@sanity/ui": major
---

Remove the private `@sanity/ui/_visual-editing` entrypoint.

Import from `@sanity/ui` instead. Tree-shaking no longer needs this slim
subset now that `displayName` side effects are gone and unused components
are dropped from consuming bundles.
