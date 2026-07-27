---
"@sanity/themer": minor
---

Introduce `@sanity/themer`, the npm migration path off the hosted Themer service (themer.sanity.build):

- `@sanity/themer` generates Studio themes from four colors with `createTheme({primary, text, lightBackground, darkBackground})`, and ships the familiar presets re-expressed for the new API
- `@sanity/themer/legacy` is a drop-in replacement for `https://themer.sanity.build/api/hues` URL imports — same `createTheme`/`hues`/`theme` exports, presets and generated colors, plus `createThemeFromUrl` to migrate an existing URL import in one line
- `@sanity/themer/tool` adds the `themerTool` Studio plugin: a sidebar that previews generated themes live on your own Studio while you browse around
