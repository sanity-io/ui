---
"@sanity/ui": patch
---

Remove the `startTransition` wrappers around the `Autocomplete` and `TreeItem` element-ref state setters. They guarded against a "Maximum update depth exceeded" loop that only occurred on React 18, which is no longer supported since React 19.2 is the minimum version.
