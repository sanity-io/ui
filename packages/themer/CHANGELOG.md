# @sanity/themer

## 0.3.9

### Patch Changes

- Updated dependencies [[`7258b02`](https://github.com/sanity-io/ui/commit/7258b02024d233c4270c59a55f813574796006c5), [`80d25c2`](https://github.com/sanity-io/ui/commit/80d25c2e4ebb2b6bb5c82eded7b0329663da8759)]:
  - @sanity/ui@4.0.7

## 0.3.8

### Patch Changes

- Updated dependencies [[`2dc0627`](https://github.com/sanity-io/ui/commit/2dc06270810e696ebbc2aeb4729cf3eba7c7ec28), [`63ed976`](https://github.com/sanity-io/ui/commit/63ed97631eba7989a6d647a039dfc7df4abe143a)]:
  - @sanity/ui@4.0.6

## 0.3.7

### Patch Changes

- [#2737](https://github.com/sanity-io/ui/pull/2737) [`465b379`](https://github.com/sanity-io/ui/commit/465b379531cea0fefb668ccddcd319851802d1cd) Thanks [@stipsan](https://github.com/stipsan)! - Build the published dist with the React Compiler running on `oxc-transform-react` (the native Rust port, via `@sanity/tsdown-config`'s new `reactCompiler.transform: 'oxc'`) instead of `babel-plugin-react-compiler`. The output is functionally equivalent — the Rust port tracks the latest React Compiler release, so memo-cache slot allocation differs slightly in places.

- Updated dependencies [[`465b379`](https://github.com/sanity-io/ui/commit/465b379531cea0fefb668ccddcd319851802d1cd)]:
  - @sanity/ui@4.0.5

## 0.3.6

### Patch Changes

- [#2729](https://github.com/sanity-io/ui/pull/2729) [`4f9e30f`](https://github.com/sanity-io/ui/commit/4f9e30f892f6f3fe7d7997280b1ba8b9e84c93d4) Thanks [@squiggler-app](https://github.com/apps/squiggler-app)! - fix(deps): update sanity monorepo to ^6.10.1

- Updated dependencies [[`3970a7e`](https://github.com/sanity-io/ui/commit/3970a7e6dd0b4dc53d78eca6ed789cf92e39ad7a)]:
  - @sanity/ui@4.0.4

## 0.3.5

### Patch Changes

- Updated dependencies [[`e93ebeb`](https://github.com/sanity-io/ui/commit/e93ebebc030d3f6e4b6872496f8ccc30247138f6)]:
  - @sanity/ui@4.0.3

## 0.3.4

### Patch Changes

- Updated dependencies [[`adf0894`](https://github.com/sanity-io/ui/commit/adf0894ba356d15b2af522f4f86fe532b09b6f21)]:
  - @sanity/ui@4.0.2

## 0.3.3

### Patch Changes

- Updated dependencies [[`7dd3171`](https://github.com/sanity-io/ui/commit/7dd317198bd5c7826d5936b7303869c356f8a9af), [`55410de`](https://github.com/sanity-io/ui/commit/55410ded964ac0406c0441e0256d834c7cb5f2f6)]:
  - @sanity/ui@4.0.1

## 0.3.2

### Patch Changes

- Updated dependencies [[`6069d4e`](https://github.com/sanity-io/ui/commit/6069d4e61a01da3a5124a3c4f68e3c530497912d)]:
  - @sanity/ui@4.0.0

## 0.3.1

### Patch Changes

- [#2598](https://github.com/sanity-io/ui/pull/2598) [`aafba15`](https://github.com/sanity-io/ui/commit/aafba1501b03b76f6b2337e136f1d5db1ce4d16a) Thanks [@squiggler-app](https://github.com/apps/squiggler-app)! - fix(deps): update sanity monorepo to ^6.9.0

- [#2629](https://github.com/sanity-io/ui/pull/2629) [`8109c67`](https://github.com/sanity-io/ui/commit/8109c678c5e04aa2acf51a8db4e85ac7b05a9f92) Thanks [@squiggler-app](https://github.com/apps/squiggler-app)! - fix(deps): update sanity monorepo to ^6.9.1

- [#2632](https://github.com/sanity-io/ui/pull/2632) [`5207572`](https://github.com/sanity-io/ui/commit/52075727765ec68b2a718c0b9d9220feaf48df4f) Thanks [@stipsan](https://github.com/stipsan)! - fix(deps): update dependency styled-components to ^6.5.0

  styled-components 6.5 tightens polymorphic call-site and `style` prop typing. Adjust `@sanity/ui` for the new checks: narrow `as` at `Box`/`VirtualList` call sites to avoid TS2589, align `Card`'s `$tone`/`$muted` with the values actually passed, and drop now-unnecessary assertions on `motion.create(Card)` wrappers.

- Updated dependencies [[`df34007`](https://github.com/sanity-io/ui/commit/df34007552a4c195ab2eacce0aff7a7139624c6e), [`c3726c9`](https://github.com/sanity-io/ui/commit/c3726c9ce471cd793ca8d7731c2f433d206031d7), [`5207572`](https://github.com/sanity-io/ui/commit/52075727765ec68b2a718c0b9d9220feaf48df4f)]:
  - @sanity/ui@3.5.2

## 0.3.0

### Minor Changes

- [#2553](https://github.com/sanity-io/ui/pull/2553) [`e4bff6d`](https://github.com/sanity-io/ui/commit/e4bff6de1c5923107596c87bd54099a3816cd6ed) Thanks [@stipsan](https://github.com/stipsan)! - Widen `@sanity/themer` peer dependencies. `react` now allows `^18 || ^19`, `sanity` allows `^3 || ^4 || ^5 || ^6`, and `styled-components` allows `^5.2 || ^6`. This avoids peer dependency errors for consumers using only `@sanity/themer/legacy` as a migration path off the hosted themer.sanity.build service. These peer dependency ranges do not indicate whether `themerTool` itself will work.

### Patch Changes

- [#2543](https://github.com/sanity-io/ui/pull/2543) [`1af3fbd`](https://github.com/sanity-io/ui/commit/1af3fbd608a40718c9eb20dfd71c520550206a60) Thanks [@squiggler-app](https://github.com/apps/squiggler-app)! - fix(deps): update sanity monorepo to ^6.8.0

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
