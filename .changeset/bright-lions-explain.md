---
"@sanity/ui": patch
---

Stop `Layer` from overwriting `data-ui` on `Dialog` and `Tooltip`, and add identifiers on remaining component roots (`ThemeProvider` fallback, `Popover` overlay, `Button` loading state, `Toast` loading bar, `Dialog` regions, and text overflow).
