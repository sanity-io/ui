# @sanity/themer

## 0.2.1

### Patch Changes

- [#2497](https://github.com/sanity-io/ui/pull/2497) [`b9ed08d`](https://github.com/sanity-io/ui/commit/b9ed08de271bf5306b6bae48b843742eae461572) Thanks [@squiggler-app](https://github.com/apps/squiggler-app)! - fix(deps): update sanity monorepo to ^6.7.0

- Updated dependencies [[`1ecf846`](https://github.com/sanity-io/ui/commit/1ecf846993c94f671856cb09e01caa93a3d7cece)]:
  - @sanity/ui@3.5.1

## 0.2.0

### Minor Changes

- [#2483](https://github.com/sanity-io/ui/pull/2483) [`818a93c`](https://github.com/sanity-io/ui/commit/818a93cc567cc9d39e5b9e462c3465efcf44ef92) Thanks [@stipsan](https://github.com/stipsan)! - Add a root `buildTheme` export that generates a Studio theme from a handful of colors — `accent` (required), `text`, `background.dark`/`background.light` and `contrast` — by replacing the `@sanity/color` palette that `buildTheme` from `@sanity/ui/theme` otherwise uses. Called with the stock colors it reproduces the stock theme exactly. `buildPalette` exposes the generated palette on its own, and `presets` ships the hosted Themer service presets translated to the new options. The `themerTool` Studio plugin now edits and previews these themes instead of the legacy ones (the `/legacy` subpath is unchanged).

## 0.1.0

### Minor Changes

- [#2458](https://github.com/sanity-io/ui/pull/2458) [`45bac6a`](https://github.com/sanity-io/ui/commit/45bac6a6d1e79b65006966bf85f18dab9531942f) Thanks [@stipsan](https://github.com/stipsan)! - Introduce `@sanity/themer`, the npm migration path off the hosted Themer service (themer.sanity.build): `@sanity/themer/legacy` is a drop-in replacement for `https://themer.sanity.build/api/hues` URL imports — same `createTheme`/`hues`/`theme` exports, presets and generated colors, plus `buildThemeFromUrl` to migrate an existing URL import in one line.
