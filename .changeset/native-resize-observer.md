---
"@sanity/ui": major
---

Use the native `ResizeObserver` API directly, dropping the
`@juggle/resize-observer` polyfill dependency and the internal
`_ResizeObserver` export. Use the global `ResizeObserver` instead.
