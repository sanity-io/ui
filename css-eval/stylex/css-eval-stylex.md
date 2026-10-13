# CSS evaluation — StyleX (`@stylexjs/*` 0.19.1)

Framework under evaluation: **StyleX** (stylexjs.com), latest stable `0.19.1` (npm, 2026-09-15; `facebook/stylex` tag `0.19.1`, commit `1fcb9a51`). Evaluated alone, against the brief in `css_eval.txt` (SAPP-4639: vanilla-extract class names hashed by file scope + counter collided across `@sanity/ui` 4.4.3/4.4.4 on one page).

Prototype branch: `cody/css-eval-stylex` → `css-eval/stylex/` (no PR). Everything below that is a measurement was run from that directory on Node 22.14 (`pnpm evidence`); outputs are committed under `css-eval/stylex/evidence/`.

## Summary

| Objective (brief order) | Score | One line |
| --- | :-: | --- |
| 1. Safe generated CSS (content-hashed, no cross-version collisions) | **8** | Atomic classes, theme classes and keyframes are pure content hashes (`murmurhash2(prop+value+pseudo+at-rule)`), so the 4.4.3/4.4.4 failure is impossible by construction and was shown not to reproduce in a browser. One exception: `defineVars` names hash the *package name + file path*, not the version, so `:root` token defaults of two versions can clash — fixed with a 40-line resolver (prototyped) or explicit `--names`. Residual: 32-bit hash. |
| 2. Type-safe authoring (tokens, variants) | **7** | Tokens, theme overrides, variant maps, dynamic-style params and style-prop restrictions all fail `tsc` when misused (11 cases proven). CSS property-name/value typos do **not** fail `tsc` (needs `@stylexjs/eslint-plugin`). |
| 3. Fast compiler + toolchain fit (Vite, rolldown, tsdown, Next.js, module CDN) | **7** | Works in tsdown/rolldown (via `@sanity/tsdown-config` + `@stylexjs/unplugin`), Vite 8, Next 16 Turbopack. Official compiler is a Babel plugin (~38 ms/file warm for a 5.6 kB TSX); the community Rust port is 25–30× faster with identical output. `unplugin` has rough edges (asset picking, process-global state). |
| React 19 / RSC | **9** | Precompiled library renders from a Server Component in Next 16.4 with zero StyleX config (tested). |
| Zero / tiny runtime | **9** | Static styles compile to strings (0 B runtime); `props()` for dynamic merging is 0.82 kB gzip. |
| Library publishing (CSS to npm consumers) | **7** | `dist/stylex.css` + `exports["./styles.css"]` works like today. Cross-package theming needs a shared canonical-id convention; separately compiled sheets have an index-based priority quirk (see risks). |
| Theming with CSS variables | **8** | `defineVars`/`createTheme` are first class; themes are content-hashed classes; runtime themes = setting the same custom properties. |
| Dynamic styles | **8** | Function styles → `var(--x-prop)` + inline custom property; arbitrary runtime CSS strings are impossible by design. |
| Migration cost (ui / sanity / plugins) | **4** | Different model (atomic, no globals, no descendant selectors, JS-driven variants). vanilla-extract parts are mechanical; styled-components parts are a rewrite (`sanity`: 559 `styled` usages, 191 `css` templates). |
| Ecosystem health | **7** | Meta-backed, 10.4k stars, ~2M weekly downloads, 63 commits/90 days — but still 0.x after 3 years, quarterly cadence in 2026, official bundler plugins abandoned for `unplugin`, key infra (Rust compiler, Turbopack loader) is a one-maintainer community project. |
| Bundle size | **9** | Button library: 6.7 kB CSS min / 2.1 kB gzip; two versions on one page 4.0 kB gzip total. |

**Verdict:** StyleX solves the stated problem (objective 1) at the level of the class-name algorithm, not by convention, and does so with the smallest runtime of the candidates. The costs are a Babel-based official compiler, a styling model far from styled-components, and a library-publishing story that StyleX itself does not design for (it assumes one compiler sees the whole page) — workable, as the prototype shows, but Sanity would own the conventions (`@sanity/tsdown-config` option, canonical token ids, `@layer` prefix).

---

## 1. How class names are generated (verified from source, tag `0.19.1`)

### 1.1 Atomic class names: content hash of property + value + modifiers

`packages/@stylexjs/babel-plugin/src/shared/utils/convert-to-className.js` lines 34–63:

```js
const { classNamePrefix = 'x' } = options;
const dashedKey = key.startsWith('--') ? key : dashify(key);
…
const modifierHashString = pseudoHashString + atRuleHashString || 'null';
const valueAsString = Array.isArray(value) ? value.join(', ') : value;
const stringToHash = dashedKey + valueAsString + modifierHashString;
const className = classNamePrefix + createHash('<>' + stringToHash);
```

`shared/hash.js` line 72: `const hash = (str) => murmurhash2_32_gc(str, 1).toString(36);` — a 32-bit MurmurHash2, base36 (6–7 characters).

So a class is `x` + hash(`"<>" + "background-color" + "var(--xzklcfy)" + ":hover@media (hover: hover)"`). **No file path, module id, package name, counter or order enters the hash.** Consequences, each confirmed in the prototype:

- Same declaration anywhere (any file, package, version) → same class name **and** the same rule text (dedupe across versions: 29 of v1's 63 classes are shared with v2, every one with byte-identical rules — `evidence/class-name-comparison.json`).
- Different declaration → different class name. Renumbering, reordering, adding or removing styles changes nothing for the untouched declarations; v2 inserted a key before `root`, reordered three style groups, changed padding/radius/weight tokens and gained a `loading` style: 0 shared class names with different rules.
- Atomic, not deduplicated-by-rule-set: one class per (property, value, modifiers). A `stylex.create` namespace compiles to an object of per-property class names (see `evidence/v1.index.js`: `root: { kysU6D: "xjyslct", k1xSpc: "x3nfvp2", … }`), merged by `stylex.props()` last-wins per property.

### 1.2 Themes, keyframes, position-try, view transitions: content hashes

- `shared/stylex-create-theme.js` line 61: `const overrideClassName = classNamePrefix + createHash(atRulesStringForHash);` — the hash of the sorted override declarations; line 80 appends the var-group class: `` `${overrideClassName} ${themeVars.__varGroupHash__}` ``.
- `shared/stylex-keyframes.js` line 66: `classNamePrefix + createHash('<>' + stableString) + '-B'`.
- `shared/stylex-position-try.js` line 52 and `shared/stylex-view-transition-class.js` line 60: hashes of the serialized rule.

### 1.3 The exception: `defineVars` / `defineConsts` names are file-identity hashes

`shared/stylex-define-vars.js` lines 39–58:

```js
const varGroupHash = classNamePrefix + createHash(exportId);
…
const nameHash = key.startsWith('--')
  ? key.slice(2)
  : classNamePrefix + createHash(`${exportId}.${key}`);
```

`exportId` = `utils/file-based-identifier.js`: `` `${fileName}//${exportName}` ``, with `fileName` from `utils/state-manager.js` lines 558–626: for the default `unstable_moduleResolution: {type: 'commonJS'}` it is `getCanonicalFilePath()` → `` `${packageName}:${path.relative(packageDir, filePath)}` `` where `packageName` is read from the nearest `package.json`. The **version is not part of the id**. Two versions of `@sanity/ui` that both define `tokens.radius2` in `src/theme/tokens.stylex.ts` therefore emit the *same* `--x1dd0byb` on `:root` with their own default values; the last stylesheet to load wins for both versions (`evidence/hazard-define-vars.txt`, "stock" section). This is intentional in StyleX (stable identifiers so themes can be shared), but it is a last-sheet-wins hazard of exactly the kind the brief forbids. Three ways out, all verified:

1. `unstable_moduleResolution: {type: 'custom', getCanonicalFilePath, filePathResolver}` (undocumented but in the schema, `state-manager.js` lines 580–586) returning `` `${name}@${version}:${normalizedPath}` `` — `css-eval/stylex/scripts/stylex-options.mjs`. The prototype builds and the consumer app use it; the Playwright test reads both versions' `:root` custom properties and gets `3px`/`4px`, `12px`/`14px`, `500`/`600` side by side. Not available in the Rust compiler (its options are data, not functions).
2. Keys spelled `'--sui-radius-2'` are kept verbatim (`key.slice(2)`) — an explicit, human-readable public contract with today's `--card-bg-color` semantics (shared on purpose).
3. `classNamePrefix` per major/version prefixes every class and variable name (zero sharing, zero collision, works in both compilers).

Dynamic styles are unaffected: `visitors/parse-stylex-create-arg.js` lines 184–189 name the variable `--x-<property>` (or `--x-<hash(keyPath)>`) and the value travels as an inline style on the element.

### 1.4 Can two versions or copies of a library on one page ever collide?

- **Same class name, different rule (the vanilla-extract failure):** impossible for atomic classes, theme classes and keyframes except by a genuine 32-bit hash collision between two *different* declarations. Birthday bound with a 2³² space: ≈0.05 % at 2,000 distinct declarations on a page, ≈1.2 % at 10,000, ≈4.6 % at 20,000 (all packages and versions on the page count together). Inside one compile, `processStylexRules` (`babel-plugin/src/index.js` lines 876–878) dedupes by class name within a priority group, so a collision there silently drops one rule. This is a residual, probabilistic risk, not the systematic one; it is cheap to detect at build time with exactly the shared-class audit the prototype runs (`app/tests/css-rules.ts`).
- **`defineVars` `:root` defaults:** collide across versions with the stock configuration (1.3). Mitigated as above.
- **Same class name, same rule, present twice:** harmless duplicates (cascade applies identical declarations).
- **Two copies of the runtime:** `@stylexjs/stylex`'s `props()` is a pure function over compiled objects; no shared registry, no injected styles (with `runtimeInjection: false`), so duplicate runtime copies do not interact. The prototype deliberately resolves the runtime per library directory.
- **Precedence between independently compiled sheets:** not a collision, but relevant to "several copies on one page". `processStylexRules` (lines 841–886, 956–971) sorts rules by priority (shorthands 1000 → longhands 4000, pseudo-elements +5000, pseudo-classes +40…170, `@media` +200; `@stylexjs/shared/src/utils/property-priorities.js`), groups by `Math.floor(priority/1000)` and bumps each group's specificity with `:not(#\#)` × *the group's index in that sheet* (or names an `@layer priorityN` by index). A sheet that lacks a level shifts the bumps. Measured (`evidence/specificity-groups.txt`): a library's `padding` got 1 bump, an app sheet consisting only of `paddingTop: 0` got 0, so the longhand does not reliably beat the shorthand when one element mixes styles from both sheets; compiled together it gets 4 bumps and wins. Two versions never share an element, so this does not affect the collision scenario, but it affects "library style + consumer StyleX override on one element". Fixes: compile library source in the consumer (StyleX's intended model), a one-line upstream change to absolute bumps, or `useLayers: {prefix: '<package>'}` which the prototype confirmed emits `@layer sui.priorityN` without any `:not(#\#)`.

## 2. Prototype

Branch `cody/css-eval-stylex`, directory `css-eval/stylex/` (a standalone pnpm root; the repo lockfile is untouched). `README.md` there maps every file.

- **Button** (`packages/button-v1/src/button.tsx`, modelled on `packages/ui/src/core/primitives/button`): `tone` (default/primary/positive/caution/critical) × `mode` (default/ghost/bleed), `selected`, `disabled`, `padding` 0–4 and `radius` 0–3 scales, `width="fill"` via `stylex.firstThatWorks('stretch', '-webkit-fill-available', '-moz-available')`, hover under `@media (hover: hover)`, `:active`, `:focus-visible` ring, `:disabled` cursor, and a typed `xstyle` prop (`StyleXStylesWithout<{display; position}>`).
- **Theme with CSS-variable tokens** (`tokens.stylex.ts`): `stylex.defineVars` for 57 scheme tokens (font, radius, space, surface colors, 5 tone palettes) plus a `button` variable group; `theme.ts`: `darkTheme = createTheme(tokens, …)` and five tone themes `createTheme(button, …)` — the tone mechanism mirrors today's `--card-*` variables, but every theme class is a content hash.
- **Dynamic style**: `width: (width: number) => ({width})` → `.x5lhr3w{width:var(--x-width)}` + `style="--x-width:180px"` (visible in the server-rendered Next HTML too).
- **Library publishing**: `@sanity/tsdown-config` + `tsdown` + `@stylexjs/unplugin/rolldown` (`tsdown.config.ts`, helper `scripts/stylex-tsdown.mjs`) emits `dist/index.js` (class-name objects, static `props()` calls inlined to strings), `dist/tokens.stylex.js`, `.d.ts`, and `dist/stylex.css` published as `exports["./styles.css"]` (`publint` clean). The library is marked `sideEffects: ["*.css"]`, depends on `@stylexjs/stylex` at runtime only for `props()`.
- **v1 and v2 on one page**: `packages/button-v2` is the same package name at 2.0.0 with changed token defaults (`space3` 12→14 px, `radius2` 3→4 px, `fontWeight` 500→600, a dark fill), a new style key inserted before `root`, reordered style groups and a new `loading` prop. `app/` (Vite 8, React 19) renders both in light, dark and under a consumer theme compiled in the app over the published v1 tokens (`createTheme(tokensV1, {primaryFill: '#ff3399'})`, resolved through `exports["./tokens.stylex"]`). Both stylesheets are loaded as `<link>` tags in the order chosen by `?order=` (v1,v2 and v2,v1).
- **Proof** (`app/tests/collision.spec.ts`, Playwright/Chromium against `vite preview`, 9 tests × both orders where applicable, all green; `evidence/playwright-results.json`): per-version computed `padding`, `border-radius`, `font-weight`, colors for all tone/mode cells, hover, selected, disabled, dynamic and fill widths, dark-theme values; both versions' `:root` custom properties coexist; every class name present in both CSS files maps to identical rules (29 shared, 0 conflicting); the v2-only overlay and the v1-only consumer theme leak nowhere. Screenshot: `evidence/one-page-v1-v2.png`.
- **Next.js 16.4 + Turbopack + RSC** (`next-smoke/`, `app/tests/next-rsc.spec.ts`): a Server Component imports the precompiled library and its CSS with no StyleX plugin, Babel or PostCSS config; the prerendered HTML carries the hashed classes and `style="--x-width:160px"`; computed styles verified against `next start`.

## 3. Metrics

Environment: Linux VM, Node 22.14, pnpm 10.33, tsdown 0.23.1 / rolldown 1.2.13, Vite 8.3.4, `@babel/core` 7.29. Numbers are medians of 3 unless stated (`evidence/bench.json`, `evidence/sizes.json`).

### Compile time

| Build | Cold (fresh process) | Warm (same process, rebuild) |
| --- | --: | --: |
| Library (tsdown + `@sanity/tsdown-config`, 3 source files, dts) **with** StyleX | 1 559 ms | 81 ms |
| Same build **without** the StyleX plugin (baseline) | 1 390 ms | — |
| Consumer app (`vite build`, StyleX unplugin for app styles) | 470 ms | 114 ms |
| Next 16.4 `next build` (precompiled library, no StyleX plugin) | "Compiled successfully in 1.7 s" | — |

StyleX adds ≈170 ms to the cold library build (Babel + plugin load dominates; per-file cost below). Per-file transform of the prototype sources, 50 warm iterations:

| File | Size | `@stylexjs/babel-plugin` cold / warm mean | `@stylexswc/rs-compiler` cold / warm mean | Rules |
| --- | --: | --: | --: | --: |
| `button.tsx` | 5.6 kB | 48.1 ms / **38.0 ms** | 4.2 ms / **1.28 ms** | 59 / 56 (identical sets) |
| `theme.ts` | 3.7 kB | 11.1 ms / 11.1 ms | 0.8 ms / 0.31 ms | 6 / 6 |
| `tokens.stylex.ts` | 2.6 kB | 2.4 ms / 2.5 ms | 0.6 ms / 0.24 ms | 2 / 2 |

Extrapolation: `@sanity/ui`'s ~200 style-bearing files would cost on the order of 4–8 s of Babel time per full build with the official compiler (parallelizable by rolldown's transform pipeline only per file), ~0.3 s with the Rust port. The unplugin only runs Babel on files that textually import `@stylexjs/stylex`, so non-styled files are untouched.

### CSS output (`evidence/sizes.md`)

| CSS | raw | gzip | brotli |
| --- | --: | --: | --: |
| v1 `styles.css` as published (pretty-printed) | 7.88 kB | 2.19 kB | 1.91 kB |
| v1 minified | 6.67 kB | 2.11 kB | 1.83 kB |
| v2 minified | 7.14 kB | 2.22 kB | 1.94 kB |
| App CSS (reset + layout + consumer theme) | 2.12 kB | 0.61 kB | 0.54 kB |
| **Page total, v1 + v2 + app** | 15.93 kB | 3.98 kB | 3.36 kB |
| v1 + v2 if compiled as one sheet (dedup) | 12.27 kB | 3.46 kB | 2.92 kB |

Rules: v1 65, v2 73, merged 107 (31 shared). 57 tokens + 6 themes account for ~60 % of each sheet; atomic rules grow sub-linearly with components because declarations repeat.

### JS runtime

| JS | raw | gzip |
| --- | --: | --: |
| Static styles only (`props()` with static args is compiled to a string) | 0.04 kB | 0.06 kB |
| `props()` runtime for dynamic/conditional merging | 1.47 kB | 0.82 kB |
| Whole `@stylexjs/stylex` namespace | 4.01 kB | 1.69 kB |
| v1 library + runtime as a consumer bundle (React external, minified) | 4.47 kB | 2.24 kB |

No style injection, no context provider, no runtime hashing.

### Type-safety quality (`typecheck/`, `tsc -p` must pass; every misuse is `@ts-expect-error`)

Caught by `tsc` (11/11): unknown token (`tokens.radius9`), unknown key in `createTheme` override, override against the wrong var group, `createTheme` on a non-`defineVars` object, wrong `tone`/`mode`/`padding`/`width` variant values, `xstyle` with a forbidden key (`display`), plain object as `xstyle`, wrong dynamic-style argument type, string passed to `props()`.

Not caught by `tsc` (documented in `typecheck/gaps.tsx`): CSS property-name typos (`colr`), pseudo-class typos (`':hovr'`), invalid values (`color: 'not-a-color'`, `display: 123`, `zIndex: 'high'`) — `UserAuthoredStyles` is `CSSPropertiesWithExtras | {[key: string]: NotUndefined}` (`stylex/src/types/StyleXTypes.d.ts` lines 91–94), so the index-signature member accepts any object. `@stylexjs/eslint-plugin` (`valid-styles`) is the designed guard; the compiler itself only validates shorthand expansion (`propertyValidationMode`). Also found: the documented `StyleXStylesWithout<{display: unknown}>` does not satisfy its own constraint under `strict` (`unknown` ⊄ `{} | null`); `{display: string}` works.

## 4. Toolchain fit, migration, ecosystem, risks

### Toolchain

| Tool | Status | Evidence / notes |
| --- | --- | --- |
| **tsdown / rolldown** (`@sanity/tsdown-config`, used by all three repos) | Works | `@stylexjs/unplugin/rolldown` via `mergeConfig`. Needed: a seed `stylex.css` asset + `assetFileNames: '[name][extname]'` to get `dist/stylex.css` instead of `dist/assets/stylex.css`; harmless `FILE_NAME_CONFLICT` warning. A `stylex: {fileName}` option in `@sanity/tsdown-config` (≈40 lines, `scripts/stylex-tsdown.mjs`) would replace the forked `@sanity/vanilla-extract-*` plugins with an upstream package. |
| **Vite 8** (Storybook, `sanity dev/build`, module CDN bundle) | Works, with care | `@stylexjs/unplugin/vite`. Found: it appends compiled CSS to the *first* `.css` asset present at `generateBundle`, which was a library `?url` stylesheet until the app had its own early CSS asset; dev mode needs `import('virtual:stylex:css-only')`; `globalThis.__stylex_unplugin_store` leaks rules between builds in one process (bench: library tokens appeared in the app CSS). |
| **Next.js** (www) | Works | As a *consumer* of precompiled `@sanity/ui`: nothing to configure (tested, Next 16.4 Turbopack, RSC). To *author* StyleX in Next: official path = `babel.config.js` (`next/babel` + plugin) + `@stylexjs/postcss-plugin` `@stylex;` directive, "works with Webpack and Turbopack since Next.js 16.0.3" (docs) but moves app code to Babel; alternative `@stylexswc/nextjs-plugin/turbopack` loader + `@stylexswc/postcss-plugin` keeps SWC. |
| **React 19 / RSC** | Works | Compiled output is data + a pure `props()`; no context, no effects, no `'use client'` needed; verified server-rendered. |
| **Studio module CDN** (`@repo/package.bundle`: Vite 8, `oxc-transform-react`, "no babel in the pipeline", CSS served separately as `index.css` via `<link>`) | Works for precompiled deps; compile-from-source adds Babel | `sanity`'s CDN bundle is built **from source** (`packages/sanity/package.bundle.ts` → `src/_exports/*.ts`), so if `sanity` itself authors StyleX the bundle build needs `stylex.vite()` (Babel only for files importing `@stylexjs/stylex`) or the Rust `@stylexswc/unplugin`. `@sanity/ui`/plugins precompiled → no compiler in the bundle; their `styles.css` concatenates into `index.css` as today. The content-hashed classes are what makes the CDN-`sanity` + user-bundle `@sanity/ui` version mix safe (`sanity` already loads `ui5/styles.css` and `@sanity/ui/styles.css` together). |

### Migration effort

Inventory (`rg` over the three repos at 2026-10-13 heads):

| | `sanity-io/ui` (`packages/ui`) | `sanity-io/sanity` | `sanity-io/plugins` |
| --- | --: | --: | --: |
| vanilla-extract `.css.ts` files / `style()` calls | 27 / 67 | 122 / 211 | 26 / 97 |
| `globalStyle()` | 17 | 40 | 9 |
| `selectors:` blocks | 22 | 34 | 9 |
| `createVar`/theme contracts, `assignInlineVars` | 1, 2 | 18, 9 | 40, 21 |
| styled-components files / `styled` usages / `` css` `` templates | 53 / 72 / 38 | 275 / 559 / 191 | 63 / 99 / 31 |
| runtime theme reads in styles (`getTheme_v2`, `props.theme`) | 170 | 128 | 22 |

What changes with StyleX, per construct:

- `style()` → `stylex.create()`: mechanical, but values must be static or token references, and multi-value shorthands (`padding: '8px 16px'`) must become longhands. Attribute selectors on the element itself (`[data-selected]`), compound `:not(:disabled):hover`, vendor pseudo-elements, nested `@media`/`@supports`, container queries and keyframes all compile (probed on 0.19.1). **Descendant combinators do not** (`& > span` → "Invalid pseudo or at-rule"): style the child directly or use `stylex.when.ancestor('[data-ui="Card"]')` + `stylex.defaultMarker()` on the ancestor.
- `globalStyle()` (17 / 40 / 9) → plain CSS files; StyleX has no global API.
- Runtime theme reads (170 in `ui`): the biggest structural change. `getTheme_v2(props.theme).color.button[mode][tone]` becomes tokens (`defineVars`) + tone/mode themes (`createTheme`) chosen in JS, as the prototype does. Runtime-built themes (`buildTheme()`, Studio `theme` config) remain possible because a theme is just custom-property values: a provider can write them as inline `style`/a `<style>` block using the compiled `tokens` names — but it is a new theming layer to build, and `createTheme` classes cannot be produced at runtime.
- styled-components (`styled(Button)` wrappers in `sanity`/plugins): no equivalent; each is either a `xstyle`-style prop (StyleX convention) or a plain class. With the default `:not(#\#)` bumps, existing single-class consumer overrides would *lose* to library longhands; emitting the library with `useLayers: {prefix: 'sui'}` (verified: `@layer sui.priority1…5`, no bumps) keeps every unlayered consumer rule winning, which is the compatible choice for `@sanity/ui`.
- Responsive props (`padding={[2, 3, 4]}`): static breakpoint × scale maps (`@media` conditions per scale step) — more CSS than today's generated-per-prop rules, but content-hashed and shared.

Estimated effort (technical scope, not calendar): `sanity-io/ui` — a full rewrite of the styling layer (27 VE files + 53 styled files + the theme system → tokens/themes), plus a `@sanity/tsdown-config` `stylex` option and a public token contract; this is the critical path. `sanity-io/plugins` — 26 VE files mechanical, 63 styled files mostly wrappers over `@sanity/ui` that become style props/classes; small per plugin once `ui` ships. `sanity-io/sanity` — 122 VE files mechanical, 275 styled-components files is the dominant cost and independent of the VE problem; it can stay on styled-components indefinitely if `@sanity/ui` ships `@layer`-ed CSS, since the collision fix only needs `@sanity/ui` (and plugins) to move.

### Ecosystem health

- Repository: `facebook/stylex`, MIT, 10 405 stars, 492 forks, 102 open issues / 102 open PRs, 63 commits in the last 90 days, last push 2026-10-12. Top committers are Meta staff (nmn, mellyeliu, necolas).
- Releases: 48 stable versions since 0.3.0 (2023-12); monthly through 2025, then 0.18.0 (2026-03), 0.19.0 (2026-06), 0.19.1 (2026-09). Still `0.x`; `unstable_moduleResolution` (required for theming) is still flagged unstable in the docs.
- npm weekly downloads: `@stylexjs/stylex` 1.96 M, `@stylexjs/babel-plugin` 1.45 M, `@stylexjs/unplugin` 252 k, `@stylexswc/rs-compiler` 104 k (for comparison: `@vanilla-extract/css` 2.63 M, `@pandacss/dev` 539 k, `next-yak` 14 k, `styled-components` 11.1 M).
- Integration packages: official `nextjs-plugin`, `esbuild-plugin`, `webpack-plugin` stopped at 0.11.1 (2026-01) in favour of `@stylexjs/unplugin` (Vite/Rollup/Rolldown/esbuild/webpack/Rspack/Farm/Bun) and `@stylexjs/postcss-plugin`; community `vite-plugin-stylex` last published 2024-11. The Rust compiler `@stylexswc/*` (Dwlad90/stylex-swc-plugin, 112 stars, 6 open issues, releases track upstream within weeks: 0.19.1 on 2026-10-09) is a single-maintainer project and the only non-Babel option.
- API churn observed in the changelog: legacy nested-pseudo syntax deprecated for property-first conditions, `stylex.attrs` removed and reinstated (0.19.0), `sx` prop added (0.19), `createTheme()` must be bound to a bare variable (hit during the prototype), `env`/nested `defineVars` experimental.

### Risks (ranked)

1. **Token identity across versions** (1.3): stock config clashes on `:root`; must standardize on one of the three mitigations, and the `custom` resolver is Babel-only.
2. **Official compiler is Babel.** Sanity's pipelines are oxc/SWC-native today; StyleX puts Babel back for StyleX-importing files (≈38 ms per 5 kB file). The 25–30× faster Rust port is community-maintained; betting on it is a supply-chain decision, falling back to Babel is a build-time decision.
3. **Library-publishing conventions are Sanity's to own**: canonical token ids shared by library builds and consumers, `@layer` prefix, `stylex.css` emission in `@sanity/tsdown-config`, a CI shared-class audit. StyleX's documented model is "consumers compile library source" (`externalPackages`), which the module CDN cannot do without Babel.
4. **Index-based priority groups across independently compiled sheets** (1.4): affects library-style + consumer-StyleX merges on one element; one-line upstream fix or `@layer` prefix per package.
5. **`@stylexjs/unplugin` maturity**: asset-picking heuristic, process-global rule store, fallback path, dev-mode wiring — all hit in a three-file prototype.
6. **32-bit class hashes**: ≈1 % silent-collision chance at 10 k distinct declarations per page; detectable at build time.
7. **Model distance from styled-components**: no globals, no descendant selectors, no runtime CSS strings, no `styled(X)` composition; `sanity`'s 559 `styled` usages are a rewrite if they ever move (they do not have to for the collision fix).
8. **Pre-1.0 with a slowing cadence** and a Meta-internal roadmap (Haste/Flow-first); TypeScript typings have gaps (`UserAuthoredStyles` union, `StyleXStylesWithout` docs mismatch).

## 5. Scores per objective

| # | Objective | Score (1–10) |
| :-: | --- | :-: |
| 1 | Safe generated CSS — content-hashed class names, no collisions across versions/copies | 8 |
| 2 | Type-safe CSS authoring — theme tokens, variants | 7 |
| 3 | Fast compiler that fits Vite, rolldown, tsdown, Next.js (www), module CDN | 7 |
| — | React 19 / RSC compatibility | 9 |
| — | Zero or tiny runtime | 9 |
| — | Publishing a library's CSS to npm consumers | 7 |
| — | Theming with CSS variables | 8 |
| — | Dynamic styles | 8 |
| — | Migration cost from vanilla-extract + styled-components | 4 |
| — | Ecosystem health | 7 |
| — | Bundle size | 9 |

Evidence index (`css-eval/stylex/evidence/`): `one-page-v1-v2.png`, `playwright-results.json`, `class-name-comparison.json`, `v1.stylex.css`, `v2.stylex.css`, `v1.index.js`, `hazard-define-vars.txt`, `specificity-groups.txt`, `bench.json`, `sizes.{json,md}`, `next-build.log`.
