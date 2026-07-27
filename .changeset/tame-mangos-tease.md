---
"@sanity/themer": minor
---

Introduce `@sanity/themer`, the npm migration path off the hosted Themer service (themer.sanity.build):

- `@sanity/themer/legacy` is a drop-in replacement for `https://themer.sanity.build/api/hues` URL imports — same `createTheme`/`hues`/`theme` exports, presets and generated colors, plus `buildThemeFromUrl` to migrate an existing URL import in one line
- `@sanity/themer/tool` adds the `themerTool` Studio plugin: a sidebar that edits legacy themes with the hosted tool's controls — presets, per-hue mid/mid point/lightest/darkest editors with live tint ramps, and an import field for pasted themer.sanity.build URLs — previewing them live on your own Studio while you browse around
