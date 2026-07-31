# @sanity/themer

## 1.0.0-next.7

### Patch Changes

- Updated dependencies [[`ab6c8f0`](https://github.com/sanity-io/ui/commit/ab6c8f0166a98e1e9e149829db1748c2cb9a297e)]:
  - @sanity/ui@4.0.0-next.7

## 1.0.0-next.6

### Patch Changes

- Updated dependencies [[`aa14abf`](https://github.com/sanity-io/ui/commit/aa14abf55550c8aa1fa5848e6d637e807e35712b)]:
  - @sanity/ui@4.0.0-next.6

## 1.0.0-next.5

### Patch Changes

- [#2522](https://github.com/sanity-io/ui/pull/2522) [`41d0dc3`](https://github.com/sanity-io/ui/commit/41d0dc3ef3e80f0f1993ee56f0dd0de1bbfc9016) Thanks [@stipsan](https://github.com/stipsan)! - Move components with heavy dependencies to dedicated subpath entry points.

  Importing `@sanity/ui` no longer references `@floating-ui/react-dom`, `motion`
  or `react-refractor` — regardless of bundler treeshaking. Components that need
  those dependencies now live on their own entry points, grouped with the APIs
  they are used together with:

  - `@sanity/ui/toast`: `Toast`, `ToastProvider`, `useToast` (motion)
  - `@sanity/ui/popover`: `Popover` (@floating-ui/react-dom, motion)
  - `@sanity/ui/tooltip`: `Tooltip`, `TooltipDelayGroupProvider`,
    `useTooltipDelayGroup` (@floating-ui/react-dom, motion)
  - `@sanity/ui/menu`: `Menu`, `MenuButton`, `MenuDivider`, `MenuGroup`,
    `MenuItem` (renders `Popover`)
  - `@sanity/ui/autocomplete`: `Autocomplete` (renders `Popover`)
  - `@sanity/ui/breadcrumbs`: `Breadcrumbs` (renders `Popover`)
  - `@sanity/ui/code`: `Code` (lazy-loads react-refractor)

  Prop, context and message types moved along with their components (e.g.
  `PopoverProps`, `ToastParams`, `MenuItemProps`, `AutocompleteState`,
  `TooltipDelayGroupContextValue`).

  Migrate by importing from the new entry points:

  ```diff
  -import {MenuButton, ToastProvider, useToast} from '@sanity/ui'
  +import {MenuButton} from '@sanity/ui/menu'
  +import {ToastProvider, useToast} from '@sanity/ui/toast'
  ```

  The root entry point keeps `@deprecated` `never`-typed tombstones for every
  moved symbol, so TypeScript surfaces the new location instead of a bare “does
  not exist” error. `ErrorBoundary` now renders a plain `<pre><code>` instead of
  the `Code` primitive, keeping the root entry free of the `react-refractor`
  module graph.

  `@sanity/themer` is republished with its imports updated to the new
  `@sanity/ui` entry points.

- Updated dependencies [[`41d0dc3`](https://github.com/sanity-io/ui/commit/41d0dc3ef3e80f0f1993ee56f0dd0de1bbfc9016), [`2205690`](https://github.com/sanity-io/ui/commit/22056903c06566c9dc260add3b89cd7807bda110)]:
  - @sanity/ui@4.0.0-next.5

## 1.0.0-next.4

### Patch Changes

- Updated dependencies [[`9088ea6`](https://github.com/sanity-io/ui/commit/9088ea686cb905f381fa3942b1300d5a82c7928b), [`7a3d86b`](https://github.com/sanity-io/ui/commit/7a3d86bc7c56031a710aa947f2d239baff07d7bf), [`304f7a7`](https://github.com/sanity-io/ui/commit/304f7a7720326156a712e041f1ed6e919e9fd6fb)]:
  - @sanity/ui@4.0.0-next.4

## 1.0.0-next.3

### Major Changes

- [#2510](https://github.com/sanity-io/ui/pull/2510) [`c67e012`](https://github.com/sanity-io/ui/commit/c67e012e35455d57f0436e45d1a7fc2ec8af8656) Thanks [@stipsan](https://github.com/stipsan)! - Drop CommonJS support and require Node.js `>=22.12`

  `@sanity/ui` is now ESM-only. The `require` export condition and CommonJS build
  outputs (`.cjs` / `.d.cts`) have been removed, so it must be consumed via ESM
  `import`. `@sanity/themer` was already ESM-only.

  The Node.js `engines` range on `@sanity/ui` and `@sanity/themer` is raised to
  `>=22.12` to match `sanity`.

### Patch Changes

- Updated dependencies [[`c67e012`](https://github.com/sanity-io/ui/commit/c67e012e35455d57f0436e45d1a7fc2ec8af8656)]:
  - @sanity/ui@4.0.0-next.3

## 1.0.0-next.2

### Major Changes

- [#2505](https://github.com/sanity-io/ui/pull/2505) [`b8c74ba`](https://github.com/sanity-io/ui/commit/b8c74bace6b3db6a4abf7328a18bc9dcee614625) Thanks [@stipsan](https://github.com/stipsan)! - Require React 19.2+, compile with the React 19 compiler target, and drop `react-compiler-runtime`.

  With `babel-plugin-react-compiler` targeting `'19'`, the compiler uses React’s built-in runtime instead of the separate `react-compiler-runtime` package. Peer dependency ranges are tightened to `^19.2` (and `react-dom` for `@sanity/ui`).

### Patch Changes

- Updated dependencies [[`b8c74ba`](https://github.com/sanity-io/ui/commit/b8c74bace6b3db6a4abf7328a18bc9dcee614625), [`8b3366d`](https://github.com/sanity-io/ui/commit/8b3366d21ab014b1705bfcab26fb55a23187f0bc)]:
  - @sanity/ui@4.0.0-next.2

## 0.2.1-next.1

### Patch Changes

- Updated dependencies [[`3cd3c57`](https://github.com/sanity-io/ui/commit/3cd3c578c12b17ff4acdcf320d734dd3b65eed53)]:
  - @sanity/ui@4.0.0-next.1

## 0.2.1-next.0

### Patch Changes

- Updated dependencies [[`1ecf846`](https://github.com/sanity-io/ui/commit/1ecf846993c94f671856cb09e01caa93a3d7cece), [`0340229`](https://github.com/sanity-io/ui/commit/0340229a8035b991bcacd11f3f6c4d6088c3efc8)]:
  - @sanity/ui@4.0.0-next.0

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
