---
"@sanity/ui": patch
---

`LayerProvider` tracks its child layers with a single `useReducer`, so registering or unregistering a child layer is one state update instead of two.
