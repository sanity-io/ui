# @sanity/themer-legacy

## 0.1.0

### Minor Changes

- [#2960](https://github.com/sanity-io/ui/pull/2960) [`5634e5f`](https://github.com/sanity-io/ui/commit/5634e5f2d19350ea373f530c2d461982b1d54f3d) Thanks [@stipsan](https://github.com/stipsan)! - Introduce `@sanity/themer-legacy`, the hosted Themer service (themer.sanity.build) as an npm package. It is the legacy generator that used to ship as `@sanity/themer/legacy`, moved into its own package with the same API: `buildThemeFromUrl` replaces a `https://themer.sanity.build/api/hues` URL import in one line, and `createTheme`, `parseHuesFromUrl`, `hues`, `theme` and `presets` generate the exact same colors the service served. The package pins a published `@sanity/ui` v4 range, so the generated themes stay byte-identical to the hosted ones regardless of the `@sanity/ui` version the Studio ships with.

### Patch Changes

- Updated dependencies [[`a9fb87c`](https://github.com/sanity-io/ui/commit/a9fb87cad74344fa6d1600afd017431b884a7af7)]:
  - @sanity/ui@4.2.4
