---
"@sanity/ui": major
---

Remove the `use-effect-event` dependency. The minimum React peer dependency is now `^19.2`. Effect events are routed through a small internal shim instead of React's native `useEffectEvent`, because the native hook never sees values past the first render inside `forwardRef`/`memo` components on React 19.2 ([facebook/react#34818](https://github.com/facebook/react/issues/34818)); the shim will be replaced with the native hook once the upstream fix ships in a stable release.
