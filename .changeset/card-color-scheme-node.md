---
"@sanity/ui": patch
---

`Card` now sets `color-scheme` inline on its own element from the scheme it resolves (the `scheme` prop, falling back to the closest `ThemeProvider`), instead of through its generated stylesheet, and `data-scheme` reports that same resolved scheme rather than the parent scheme. `light-dark()` colors and native form controls inside a card follow the card's scheme regardless of the document `color-scheme` or the operating system.
