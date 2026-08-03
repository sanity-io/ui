---
"@sanity/ui": major
---

**The `@juggle/resize-observer` polyfill is removed — the native `ResizeObserver` is used directly.**

The internal `_ResizeObserver` export is gone. If you imported it, use the global `ResizeObserver` instead.
