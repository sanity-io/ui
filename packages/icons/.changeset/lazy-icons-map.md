---
"@sanity/icons": major
---

The deprecated per-icon barrel exports are removed: `import {RocketIcon} from '@sanity/icons'` no longer works, import icons from their own export path instead, e.g. `import {RocketIcon} from '@sanity/icons/Rocket'`. The root entry now only exposes the dynamic pieces – the `<Icon>` component, the `icons` map, and their types – and every entry in the `icons` map is built with `React.lazy`, so importing the root entry no longer pulls the full icon set into your bundle: each icon loads as its own chunk the first time it renders. `<Icon>` wraps the lazy icon in a `<Suspense>` boundary whose fallback is an svg with the same shell (`viewBox`, `width`/`height` and spread props) as the icon it is loading, so the slot reserves its final size and responds to the same styling while the chunk loads – the way an `<img>` with intrinsic dimensions behaves. When rendering components from the `icons` map directly, provide your own `<Suspense>` boundary.
