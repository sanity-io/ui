---
"@sanity/icons": major
---

Drop React 18 support — React 19 is now required.

Icon components no longer use `forwardRef`. Refs are now accepted as a regular prop (typed via `React.ComponentPropsWithRef`), following React 19's ref-as-prop model. The `react` peer dependency range is now `^19`, and the exported `IconComponent` type has changed accordingly.
