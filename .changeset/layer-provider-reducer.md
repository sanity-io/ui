---
"@sanity/ui": patch
---

Track child layers in `LayerProvider` with a single `useReducer` instead of two interdependent `useState` values. Registering a child now causes one state update, and unregistering a level that has no registered children no longer corrupts the internal counts.
