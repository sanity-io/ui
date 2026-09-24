---
'@sanity/themer-legacy': minor
---

Add `themerTool` on the new `@sanity/themer-legacy/tool` subpath: a Studio plugin that brings the hosted Themer's editor into your own Studio. A navbar toggle opens a sidebar with the hosted presets and the six hue editors (mid, lightest and darkest colors, the mid-point slider and the generated tints, click to copy), and the resulting `createTheme` theme previews live on the whole Studio — following the Studio appearance, or in light and dark side by side. Drafts persist in `localStorage`. The plugin is named `themer-legacy`, so it runs next to `themerTool` from `@sanity/themer/tool`.
