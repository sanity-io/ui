---
"@sanity/ui": patch
"@sanity/themer": patch
---

Fix React Doctor findings: `LayerProvider` state updaters are now pure (React may invoke updater functions more than once, and the nested update could misbehave under StrictMode/concurrent re-invocation), `Avatar` resets its failed-image state while rendering instead of in an effect (removing a one-frame stale fallback), `Toast` hoists its constant animation variant arrays to module scope, `Autocomplete`/`TextInput` drop no-op memoization around already-stable values, `Tooltip` no longer re-attaches its window Escape listener when the handler identity changes, and the themer tool drops manual memoization that the React Compiler provides automatically.
