# @sanity/themer-legacy

## 0.2.1

### Patch Changes

- [#3003](https://github.com/sanity-io/ui/pull/3003) [`0042a4a`](https://github.com/sanity-io/ui/commit/0042a4afa36f0055d02becd746d9e0d03d454d32) Thanks [@squiggler-app](https://github.com/apps/squiggler-app)! - fix(deps): update dependency @sanity/ui to ^4.2.6

## 0.2.0

### Minor Changes

- [#2976](https://github.com/sanity-io/ui/pull/2976) [`0b080bd`](https://github.com/sanity-io/ui/commit/0b080bd4e378bf89b90ec1c22be8c741e9745a54) Thanks [@stipsan](https://github.com/stipsan)! - Add `themerTool` on the new `@sanity/themer-legacy/tool` subpath: a Studio plugin that brings the hosted Themer's editor into your own Studio. A navbar toggle opens a sidebar with the hosted presets and the six hue editors (mid, lightest and darkest colors, the mid-point slider and the generated tints, click to copy), and the resulting `createTheme` theme previews live on the whole Studio — following the Studio appearance, or in light and dark side by side. Drafts persist in `localStorage`. The plugin is named `themer-legacy`, so it runs next to `themerTool` from `@sanity/themer/tool`.

## 0.1.0

### Minor Changes

- [#2960](https://github.com/sanity-io/ui/pull/2960) [`5634e5f`](https://github.com/sanity-io/ui/commit/5634e5f2d19350ea373f530c2d461982b1d54f3d) Thanks [@stipsan](https://github.com/stipsan)! - Introduce `@sanity/themer-legacy`, the hosted Themer service (themer.sanity.build) as an npm package. It is the legacy generator that used to ship as `@sanity/themer/legacy`, moved into its own package with the same API: `buildThemeFromUrl` replaces a `https://themer.sanity.build/api/hues` URL import in one line, and `createTheme`, `parseHuesFromUrl`, `hues`, `theme` and `presets` generate the exact same colors the service served. The package pins a published `@sanity/ui` v4 range, so the generated themes stay byte-identical to the hosted ones regardless of the `@sanity/ui` version the Studio ships with.

### Patch Changes

- Updated dependencies [[`a9fb87c`](https://github.com/sanity-io/ui/commit/a9fb87cad74344fa6d1600afd017431b884a7af7)]:
  - @sanity/ui@4.2.4
