---
"@sanity/ui": patch
---

Inlined the `useEffectEvent` ponyfill at its three call sites (`Tooltip`, `useGlobalKeyDown` and `useClickOutsideEvent`) and dropped the `use-effect-event` dependency. Behavior is unchanged: the native `React.useEffectEvent` still can't be used because it never sees values past the first render inside `forwardRef` and `memo` components on React 19.2 (https://github.com/facebook/react/issues/34818).
