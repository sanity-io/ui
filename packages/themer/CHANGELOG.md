# @sanity/themer

## 0.6.0

### Minor Changes

- [#2984](https://github.com/sanity-io/ui/pull/2984) [`196ecf0`](https://github.com/sanity-io/ui/commit/196ecf01111f8216f4282858cd0c403aad2e0382) Thanks [@stipsan](https://github.com/stipsan)! - The themer tool's split preview keeps the Studio next to the sidebar in the appearance the Studio is set to — light or dark from the appearance menu, with the picked theme — and slides a copy in the opposite scheme in from off screen on the far side, through React's `ViewTransition`: the copy slides in without fading, the Studio it makes room for cross-fades between its two widths at full height, and the sidebar stays put. `@sanity/themer` now requires React 19.3 for this. The tool works on small screens too: the sidebar covers the Studio instead of standing next to it, the split preview stacks the two copies, and the theme cards flow into more columns when the sidebar is wide enough.

- [#2987](https://github.com/sanity-io/ui/pull/2987) [`2660338`](https://github.com/sanity-io/ui/commit/26603386b585c6b567c0a4e036406081e2137240) Thanks [@stipsan](https://github.com/stipsan)! - The themer tool is styled with vanilla-extract instead of styled-components: its styles ship as the `@sanity/themer/bundle.css` stylesheet, which `@sanity/themer/tool` imports itself (the `node` export condition resolves it to a no-op shim), and `styled-components` is no longer a peer dependency. The sidebar header has its bottom border back and takes the height of the Studio navbar, so the two line up — whatever height the Studio version, breakpoint or a custom navbar gives it. The sidebar slides in from its edge and out to it, the way the split copy does on the far side, and closing it ends the split preview with it. With `prefers-reduced-motion: reduce` the sidebar and the split preview switch layouts without their view transitions animating. The theme cards drag into any order — across the grid too — with the others making room, the card menu moves a theme up or down, and the order persists; the grid flows into two columns from a third of the way into widening the sidebar instead of most of the way. Coming back to the list scrolls the applied theme into view. The sidebar stays mounted while closed (an `Activity`), so it keeps its state and opens warmed up, and the split copy is kept the same way while the sidebar is open.

### Patch Changes

- Updated dependencies [[`fde1653`](https://github.com/sanity-io/ui/commit/fde16533056cab695eb9ff0cd52db8c3c023ed25)]:
  - @sanity/ui@4.2.5

## 0.5.0

### Minor Changes

- [#2982](https://github.com/sanity-io/ui/pull/2982) [`fae7826`](https://github.com/sanity-io/ui/commit/fae7826a3d1741cf42e7b77b3f983fc41b572fe1) Thanks [@stipsan](https://github.com/stipsan)! - The themer tool can preview the Studio in light and dark side by side: the split-screen toggle in the sidebar header renders the whole Studio twice, light on the left and dark on the right, in sync while you navigate, and the editor marks both scheme cards as shown. The sidebar now sits next to the whole Studio, navbar included, rather than next to the active tool, so it renders once and stays put when the preview splits.

### Patch Changes

- [#2982](https://github.com/sanity-io/ui/pull/2982) [`fae7826`](https://github.com/sanity-io/ui/commit/fae7826a3d1741cf42e7b77b3f983fc41b572fe1) Thanks [@stipsan](https://github.com/stipsan)! - Themer tool polish: the editor's light and dark mode cards run edge to edge with only a border between them, in the sidebar's own scheme rather than each painted in the scheme it edits — the "Active" badge marks the scheme the Studio is showing — and the menu button on a theme card stays dark, as it sits on the dark half of the thumbnail.
- Updated dependencies [[`0b080bd`](https://github.com/sanity-io/ui/commit/0b080bd4e378bf89b90ec1c22be8c741e9745a54)]:
  - @sanity/themer-legacy@0.2.0

## 0.4.0

### Minor Changes

- [#2955](https://github.com/sanity-io/ui/pull/2955) [`f2cd6b2`](https://github.com/sanity-io/ui/commit/f2cd6b290577ca8872e9893ad1f389b969510c5c) Thanks [@stipsan](https://github.com/stipsan)! - The themer tool can take a theme's colors from an image, on device: pick an image (or drop one on the editor's image palette card) and it is drawn onto a canvas and its palette extracted right there — vibrant, muted and their light and dark variants plus the dominant color, the way Sanity's image pipeline derives `metadata.palette` — without uploading anything. The vibrant color becomes the accent of both schemes — darkened or lightened along its hue until a button label reaches WCAG AA contrast on it — the muted one the text color, and the light and dark muted colors tint the backgrounds of their scheme. The palette stays with the theme: the image shows next to its swatches for the session, and a row of half-size previews offers the theme built around each swatch (muted, vibrant and their light and dark variants) plus an "I'm feeling lucky" button that picks an interesting one at random. The list has an "add a theme from an image" button next to "Add theme", which names the theme after the file.

- [#2955](https://github.com/sanity-io/ui/pull/2955) [`f2cd6b2`](https://github.com/sanity-io/ui/commit/f2cd6b290577ca8872e9893ad1f389b969510c5c) Thanks [@stipsan](https://github.com/stipsan)! - **Breaking:** the root `buildTheme` and `buildPalette` options are grouped by color scheme, so the light and the dark scheme can differ in every color rather than only their background:
  
  ```ts
  // Before
  buildTheme({accent: '#1cb485', text: '#5c9199', background: {dark: '#0d1415', light: '#fcfdfd'}})
  
  // After
  buildTheme({
    light: {accent: '#1cb485', text: '#5c9199', background: '#fcfdfd'},
    dark: {accent: '#1cb485', text: '#5c9199', background: '#0d1415'},
  })
  ```
  
  Each scheme takes an optional `accent`, `text`, `background` and `contrast`, and both schemes are optional too: whatever is omitted falls back to the stock Studio colors, so `buildTheme({})` matches `buildTheme()` from `@sanity/ui/theme`. `buildPalette` returns a palette per scheme (`{light, dark}`), `presets` carry their colors per scheme, and passing the old flat shape throws a `TypeError` that points at the new one. The themer tool edits themes scheme by scheme — a light mode and a dark mode card with pickers and a contrast slider each, the scheme the Studio is showing marked as active — and its stored themes and legacy drafts are converted from the flat shape automatically.

- [#2955](https://github.com/sanity-io/ui/pull/2955) [`f2cd6b2`](https://github.com/sanity-io/ui/commit/f2cd6b290577ca8872e9893ad1f389b969510c5c) Thanks [@stipsan](https://github.com/stipsan)! - Redesign the `themerTool` sidebar around themes rather than a single draft. The narrower sidebar lists the configured theme, the presets and your own themes in one column of cards, each with a tiny lo-fi preview of a Studio — navbar, document list and document form — in both color schemes at once, split like the "Auto" appearance preview in macOS, with the title below. Picking a card applies the theme live to the whole Studio. Each flow is now its own: add a theme (or duplicate a preset to start from it), edit your own themes with the accent/text/background pickers and the contrast slider, remove themes, and restore removed ones — removed presets and custom themes alike — from a dedicated view. The `buildTheme` snippet moved out of the sidebar into a dialog behind a header button, so the sidebar no longer resizes as the snippet changes. A draft from the previous version is migrated into a custom theme. The tool's state — the open sidebar, the flow it is in and the themes — is modeled as an XState machine, which adds `xstate` and `@xstate/react` (the versions the Studio already ships) to the package's dependencies.

## 0.3.16

### Patch Changes

- [#2960](https://github.com/sanity-io/ui/pull/2960) [`5634e5f`](https://github.com/sanity-io/ui/commit/5634e5f2d19350ea373f530c2d461982b1d54f3d) Thanks [@stipsan](https://github.com/stipsan)! - Deprecate `@sanity/themer/legacy`: the legacy generator moved to the new `@sanity/themer-legacy` package, and the subpath now re-exports it unchanged (same functions, same generated colors). Import from `@sanity/themer-legacy` instead — the subpath will be removed in `@sanity/themer@1.0`.
- Updated dependencies [[`a9fb87c`](https://github.com/sanity-io/ui/commit/a9fb87cad74344fa6d1600afd017431b884a7af7), [`5634e5f`](https://github.com/sanity-io/ui/commit/5634e5f2d19350ea373f530c2d461982b1d54f3d)]:
  - @sanity/ui@4.2.4
  - @sanity/themer-legacy@0.1.0

## 0.3.15

### Patch Changes

- Updated dependencies [[`1d0e8de`](https://github.com/sanity-io/ui/commit/1d0e8de500c2f795830be0a9b57289e41620d257)]:
  - @sanity/ui@4.2.3

## 0.3.14

### Patch Changes

- Updated dependencies [[`5f3b645`](https://github.com/sanity-io/ui/commit/5f3b6455ec44974163a1604314e36930ddafb2c5)]:
  - @sanity/ui@4.2.2

## 0.3.13

### Patch Changes

- Updated dependencies [[`7766a79`](https://github.com/sanity-io/ui/commit/7766a79e611de375ad964c0c486f0e8b1883f2e1), [`63a6ca0`](https://github.com/sanity-io/ui/commit/63a6ca0dcfffd523e8f2ca8beae7a10aa7e2202d), [`9c7a1a7`](https://github.com/sanity-io/ui/commit/9c7a1a776494dc9d8dc4b26a34be56357d5e0421), [`7056449`](https://github.com/sanity-io/ui/commit/7056449f9137e7f0681bf247c82f11acec16524d), [`8c64db2`](https://github.com/sanity-io/ui/commit/8c64db2eeed2adf57adbec0b71aa8a637c5331b4)]:
  - @sanity/ui@4.2.1
  - @sanity/icons@5.2.2

## 0.3.12

### Patch Changes

- Updated dependencies [[`0128e47`](https://github.com/sanity-io/ui/commit/0128e4725b37e11d305f454dab4e55d8840c5695), [`4b81730`](https://github.com/sanity-io/ui/commit/4b8173036ab1133a8ff6099ebbe5b48d08d2957f)]:
  - @sanity/ui@4.2.0

## 0.3.11

### Patch Changes

- Updated dependencies [[`c9141df`](https://github.com/sanity-io/ui/commit/c9141df70b3c230a625c9531f66c2f9cbd572ee3), [`340baad`](https://github.com/sanity-io/ui/commit/340baad921b81721763cafc646a70042eed68adb)]:
  - @sanity/ui@4.1.1

## 0.3.10

### Patch Changes

- Updated dependencies [[`b2e6cc1`](https://github.com/sanity-io/ui/commit/b2e6cc1377d8ecdbeb10be44c2539fecbb2d49da), [`7795b61`](https://github.com/sanity-io/ui/commit/7795b614dd3fbc77fa53a764ad81d11f4c3350be)]:
  - @sanity/ui@4.1.0

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
