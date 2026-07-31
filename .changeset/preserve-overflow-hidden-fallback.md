---
"@sanity/ui": patch
---

Preserve the `overflow: hidden` fallback ahead of `overflow: clip` in `styles.css`. lightningcss collapses duplicate `overflow` declarations to the last value regardless of browser targets, so the stylesheet now ships exactly as authored (skipping the lightningcss minify/lowering pass) instead of dropping the fallback that browsers without `overflow: clip` support rely on.
