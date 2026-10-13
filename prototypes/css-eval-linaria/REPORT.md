# CSS evaluation: Linaria on wyw-in-js (with Pigment CSS noted)

Framework under test: **Linaria 8.2.0** (`@linaria/core`, `@linaria/react`, `@linaria/atomic`) on **wyw-in-js 2.5.1** (`@wyw-in-js/transform`, `/rollup`, `/vite`, `/nextjs`). Comparison engine-mate: **Pigment CSS 0.0.31** (`@pigment-css/react`, pinned to wyw-in-js 1.x). Base repo: sanity-io/ui at `main` (d446f1da8). Branch with the prototype: `cody/css-eval-linaria` (no PR). Everything below was verified from the installed source or by running it; nothing is taken from marketing pages.

## TL;DR

- **Linaria's class names are not content-hashed.** Every `css`/`styled` call gets `<first letter of its display name><murmurhash2("<file path relative to process.cwd()>:<ordinal of the call in the file>")>`. Package name, version and style content play no part. It is the vanilla-extract failure (file scope + per-file counter), minus vanilla-extract's package-name salt. **Reproduced**: v1 and v2 of the prototype Button on one page → v1 renders with v2's rules (17 of 59 computed-style checks wrong, 4 selectors emitted by both versions with different declarations).
- **Pigment CSS is the same code path**: its processors extend wyw's `BaseProcessor`, it emitted the byte-identical base class (`r7yn0dk`) for the same file, and its variant classes are ordinal suffixes (`r7yn0dk-1 … -7`). It is also officially "alpha, on hold" since January 2025 (MUI discussion #424, June 2026), pinned to the old Babel-based wyw 1.x, and its Vite plugin does not load under Vite 7/8.
- The only content-addressed naming in the Linaria family is **`@linaria/atomic`** (`atm_<hash(property+nesting)>_<hash(value)>`): proven collision-free in the same test, at the cost of atomic CSS (one class per declaration, no selector composition, `cx()` required).
- The supported mitigation for non-atomic Linaria is `classNameSlug` namespacing by package name + version. It works (0 shared selectors), but it is exactly the kind of fix Sanity already shipped for vanilla-extract in pkg-utils #3617/#3618, so it buys nothing new for objective 1.
- Toolchain fit is better than its reputation: wyw-in-js 2 is oxc-based (cold transform of the Button file 370 ms incl. spawning the evaluator, 6–28 ms warm), works with tsdown/rolldown, Vite 8 (rolldown-vite), Next.js 16 Turbopack **and** webpack through the official `@wyw-in-js/nextjs`, and the runtime is RSC-safe (verified with a Server Component). Caveats found: a reproducible deadlock under rolldown unless `serializeTransform: false`, a `*.d.ts` filter needed with tsdown's dts pass, and `@tsdown/css` required.
- **Recommendation**: do not adopt Linaria (core/`styled`) or Pigment CSS to solve objective 1; they do not deliver content-hashed classes and their structure (class allocated before styles are known) makes a content-hash processor awkward. `@linaria/atomic` satisfies objective 1 but imposes atomic CSS on the whole design system; it should only be shortlisted if an atomic model is acceptable.

## 1. How class names are generated (verified from source)

### 1.1 `@linaria/core` `css` and `@linaria/react` `styled`

Both processors extend wyw's `BaseProcessor`, whose constructor computes the class name **before any CSS is evaluated**:

`node_modules/@wyw-in-js/processor-utils/esm/BaseProcessor.js`
```js
constructor(params, tagSource, astService, location, replacer, displayName, isReferenced, idx, options, context) {
  …
  const { className, slug } = getClassNameAndSlug(this.displayName, this.idx, this.options, this.context);
  this.className = className;
  this.slug = slug;
```

`node_modules/@wyw-in-js/processor-utils/esm/utils/getClassNameAndSlug.js`
```js
const relativeFilename = (context.root && context.filename ? relative(context.root, context.filename) : context.filename ?? "unknown").replace(/\\/g, posix.sep);
// Custom properties need to start with a letter, so we prefix the slug
// Also use append the index of the class to the filename for uniqueness in the file
const slug = toValidCSSIdentifier(`${displayName.charAt(0).toLowerCase()}${slugify(`${relativeFilename}:${idx}`)}`);
…
let className = options.displayName ? `${toValidCSSIdentifier(displayName)}_${slug}` : slug;
if (typeof options.classNameSlug === "function") { … className = toValidCSSIdentifier(options.classNameSlug(slug, displayName, slugVars)); }
if (typeof options.classNameSlug === "string")   { className = toValidCSSIdentifier(buildSlug(options.classNameSlug, slugVars)); }
```

- `slugify` is murmurhash2 (32-bit, base36) of the string — `node_modules/@wyw-in-js/shared/esm/slugify.js`.
- `idx` is the ordinal of the processor usage within the file: `processorUsages.forEach((usage, idx) => … createProcessor(…, idx, …))` in `node_modules/@wyw-in-js/transform/esm/utils/applyOxcProcessors/applyOxcProcessors.js` (line 204). Inserting or reordering a `css`/`styled` call renumbers every later one.
- `displayName` is the enclosing variable name, object property key, or JSX element name (`applyOxcProcessors/displayName.js`), so only its first letter reaches the class.
- `root` is hard-coded to `process.cwd()` by both bundler plugins (`@wyw-in-js/rollup/esm/index.mjs` line 103, `@wyw-in-js/vite/esm/index.mjs` line 564) and defaults to it in the core (`transform/generators/transform.js` line 51). Class names therefore depend on the directory the build runs from, and two packages that share a relative path (`src/Button.tsx`) get identical class names. vanilla-extract at least salts its file scope with the package name.
- `classNameSlug` receives `{hash, title, index, file, ext, name, dir}` — no CSS text. It can namespace, it cannot content-hash.
- The `css` processor's rule key is `.${this.className}` (`@linaria/core/dist/processors/css.mjs`, `extractRules`); `styled` is the same plus the chain of extended components' classes, and its dynamic interpolations become CSS custom properties named `${this.slug}-${index}` (`@linaria/react/dist/processors/styled.mjs`, `getVariableId`), i.e. equally file+ordinal based.

Empirical check: `slugify("src/Button.tsx:0")` returns `7yn0dk`, and the build emitted `.r7yn0dk` for the `Root` styled component at index 0; `slugify("src/theme.ts:0")` = `1czagbo` ⇒ `.t1czagbo` for `themeLight`.

Why a content-hash processor is architecturally awkward: `doEvaltimeReplacement()` substitutes the class-name string literal into the code that the evaluator runs, and the static plan (`processorClassNamesByLocal`, `resolveStaticExport`) captures `processor.className` at the same stage, so other modules can observe the class before this module's CSS exists. Renaming after evaluation would break every `${otherClass}` selector reference. A two-pass design would be needed; that is a fork-level change, not a plugin option.

### 1.2 `@linaria/atomic` (content-addressed)

`node_modules/@linaria/atomic/dist/processors/css.mjs`
```js
const propertySlug = hashProperty([...atomicProperty].join(";"));   // property + enclosing selectors/at-rules
const valueSlug = slugify(decl.important ? `${decl.value} !important` : decl.value);
const className = `atm_${propertySlug}_${valueSlug}`;
const propertyPriority = getPropertyPriority(decl.prop) + (hasAtRule ? 1 : 0) + (hasPriority ? 1 : 0);
const selector = `.${className}`.repeat(propertyPriority);
```
`hashProperty` uses the index into `known-css-properties` (or murmurhash2 for unknown/custom properties). The class encodes property, nesting context and value, so the same class always means the same declaration; the file-based `this.className` survives only as an inert marker class on styled components (`AtomicStyledProcessor.getProps`) and dynamic variables use `slugify(source + unit)` (`getVariableId`). `cx` from `@linaria/core` dedupes atomic classes per property (last wins) — `@linaria/core/dist/index.mjs`. Residual risk: 32-bit murmurhash2 collisions on the value hash (same as the risk already accepted with vanilla-extract/emotion hashing); no cross-version risk by construction.

### 1.3 Pigment CSS 0.0.31

`node_modules/@pigment-css/react/processors/chunk-XJWUJCSA.mjs`: `var BaseProcessor = class extends BaseProcessor$1` (wyw's). `styled.mjs`:
```js
getClassName(key = "base") { … return `${this.className}${key === "base" ? "" : `-${key}`}${currentCount > 0 ? `-${currentCount}` : ""}`; }
…
const cssClassName = css(templateStrs, ...templateExpressions);   // @emotion/css at build time
const cssText = cache.registered[cssClassName];                     // keep the serialized text…
const baseClass = this.getClassName();                              // …but name it by file+ordinal
```
Pigment serializes through `@emotion/css` (which computes a content hash) and then discards that hash in favour of the wyw file+ordinal class; variants are `${className}-N` counters. Built with its Vite plugin, the same Button produced `.r7yn0dk` (identical to Linaria's) and `.r7yn0dk-1 … -7` for the five tones and two modes; inserting a `brand` variant before `primary` made `.r7yn0dk-3` mean `positive` in v1 and `primary` in v2.

### 1.4 Can two versions or copies collide?

| Variant | Naming input | Two versions of one package | Two different packages | Same version, two copies |
| --- | --- | --- | --- | --- |
| Linaria `css`/`styled` (default) | cwd-relative path + ordinal | **Yes** (reproduced) | **Yes**, if relative paths coincide (Pigment and Linaria builds of `src/Button.tsx` emitted the same `r7yn0dk`) | Harmless (identical rules) |
| Linaria + `classNameSlug` with name+version | prefix + above | No | No, if the prefix is unique | Harmless |
| `@linaria/atomic` | property + context + value | No (same class ⇒ same declaration) | No | Harmless |
| Pigment CSS | same as Linaria default, `-N` variants | **Yes** (reproduced) | **Yes** | Harmless |

## 2. Prototype (branch `cody/css-eval-linaria`, `prototypes/css-eval-linaria/`)

- `button-lib/` — `@sanity-css-eval/button-linaria@1.0.0`: `Button` with `tone` (default/primary/positive/caution/critical) × `mode` (default/ghost/bleed) implemented as typed `Record<ButtonTone, string>` maps of `css` classes, a `styled.button` root with a dynamic `$minWidth` interpolation (compiled to `min-width: var(--r7yn0dk-0)` + inline style set by the `@linaria/react` runtime), and a theme of CSS-variable tokens (`tokens` contract, typed `v()` helper, `themeLight`/`themeDark` classes whose `--sui-*` declarations are generated at build time inside the evaluator). Built with **tsdown 0.23 + rolldown 1.2 + `@wyw-in-js/rollup`**, emitting `dist/<flavor>/index.js`, `style.css` and `index.d.ts`; `package.json` exposes `./styles.css` like `@sanity/ui`. An alternative `vite.lib.config.ts` builds the same thing through **Vite 8 + `@wyw-in-js/vite`** (identical class names).
- `button-lib-v2/` — `2.0.0`: a `brand` tone inserted before `primary` (renumbers the later `css` calls), primary changed to purple, radius to a pill. Same relative file paths, as a real next version has.
- Three build flavors: `default`, `namespaced` (`classNameSlug: (hash) => \`${pkg}-${version}-${hash}\`` → `.button-linaria-1_0_0-r7yn0dk`), `atomic` (`@linaria/atomic`).
- `demo/` — Vite app rendering v1 and v2 on one page (v1 stylesheet first, then v2) per flavor; `tests/collisions.mjs` (Playwright/Chromium) checks 59 computed styles per page (background, radius, ghost colour, bleed shadow, dynamic min-width, disabled opacity, for every tone/mode of both versions) and screenshots.
- `scripts/analyze-css.mjs` — postcss comparison of the raw v1/v2 stylesheets.
- `pigment-probe/` — same Button in Pigment (`styled` + `variants`), Vite 6 build.

### Collision proof

Static comparison of the published stylesheets (`results/css-analysis.json`):

| Flavor | v1 selectors | v2 selectors | shared | identical | **conflicting** |
| --- | --- | --- | --- | --- | --- |
| default | 14 | 15 | 9 | 5 | **4** (`.p1dloej8`: v1 positive vs v2 primary; `.c482hkv`: v1 critical vs v2 caution; `.t1czagbo`/`.t1ujdjs9`: both themes with different values) |
| namespaced | 14 | 15 | 0 | 0 | 0 |
| atomic | 108 | 119 | 102 | 102 | 0 |

Browser (`results/browser-results.json`, screenshots `results/{default,namespaced,atomic}.png`):

| Flavor | computed-style checks | mismatches | what the user sees |
| --- | --- | --- | --- |
| default | 59 | **17**, all on the v1 panel | v1 primary and positive render purple, v1 critical renders yellow (it picked up v2's `caution` rule), every v1 button got v2's pill radius, ghost buttons got filled backgrounds |
| namespaced | 59 | 0 | both versions correct |
| atomic | 59 | 0 | both versions correct |

Note on bundler minification: Vite's CSS minifier merged the two conflicting `.p1dloej8`/`.c482hkv` rules into one (later declarations win), so the browser only "saw" 2 repeated selectors — the breakage is unchanged, only harder to spot in devtools.

## 3. Metrics (`results/metrics.json`, `results/pigment-metrics.json`; Node 22.14, this VM)

Compile time:

| Measurement | Linaria / wyw 2.5.1 | Pigment 0.0.31 (wyw 1.x, Babel) |
| --- | --- | --- |
| Library build, fresh process, median of 5 (tsdown js+css+dts) | 918 ms (885 min) | — |
| Library build without dts | 815 ms | 878 ms (Vite 6 lib build) |
| Vite 8 lib build (`@wyw-in-js/vite`) | ~650 ms reported, ~1.1 s wall | n/a (plugin does not load on Vite 7/8) |
| In-process `transform()` of `src/Button.tsx`, **cold** (first file, spawns the eval broker) | 370–392 ms | not measured |
| **warm**, unchanged file (cache hit) | 6–10 ms | |
| **incremental**, one declaration edited | 16–28 ms | |
| cold cache, warm process (broker alive) | 267 ms | |

Output size (v1, `style.css` / `index.js`):

| Flavor | CSS raw | CSS gzip | CSS brotli | JS raw | JS gzip |
| --- | --- | --- | --- | --- | --- |
| default | 5,290 B | 1,050 B | 855 B | 5,298 B | 1,814 B |
| namespaced | 5,584 B | 1,069 B | 879 B | 5,529 B | 1,829 B |
| atomic | 6,800 B | 1,902 B | 1,665 B | 7,666 B | 2,715 B |
| Pigment | 3,523 B | 882 B | 708 B | 4,199 B | 1,084 B |

(The Linaria CSS is unminified because `minify: false` keeps it diffable; Pigment's is whitespace-minified. Atomic JS is larger because every element carries ~20 class names.)

Runtime shipped to consumers (rolldown, minified, React external):

| Runtime | raw | gzip | brotli |
| --- | --- | --- | --- |
| `@linaria/core` (`css` stub + `cx`) | 469 B | 336 B | 278 B |
| `@linaria/react` `styled` (+ `@emotion/is-prop-valid`, `cx`) | 5,718 B | 2,889 B | 2,516 B |
| `@pigment-css/react` `styled` (+ `clsx`, `@emotion/is-prop-valid`) | 6,981 B | 3,365 B | 2,937 B |
| `@pigment-css/react` `styled` + `css` + `sx` | 8,053 B | 3,690 B | 3,254 B |

`css`-only usage is zero-runtime; `styled` (needed for prop-driven dynamic styles) costs ~2.9 kB gzip, roughly a tenth of styled-components.

Type safety (`button-lib/typecheck/`):

| Misuse | Linaria | Pigment |
| --- | --- | --- |
| Unknown tone / mode (`tone="purple"`) | **error** (your own `Record<ButtonTone,string>` / prop types) | **error** (variant props typed) |
| Unknown token `v('--sui-color-background')` | **error** (your own token union) | **error** (same helper) |
| Theme missing a token | **error** (`Record<TokenName,string>`) | **error** |
| Dynamic prop wrong type (`minWidth="160px"`) | **error** | **error** |
| CSS property typo (`colr: red`) | **compiles** (template literal is text) | **error** (csstype `CSSObject`) |
| CSS value typo (`display: inline-flexx`) | **compiles** | **error** for enumerated properties |
| Interpolated object key typo `${{colr:'red'}}` | **compiles** (`CSSProperties = {[key: string]: …}`, not csstype) | n/a |
| Dynamic callback returning garbage units | **compiles** | compiles |
| Custom properties as declarations | fine | objects made only of `--x` keys are rejected by the `CSSObject` union (weak-type check); needed `as unknown as CSSObject` casts |

Verified by `tsc`: `caught.tsx` (5 `@ts-expect-error` lines) passes; `not-caught.tsx` reports 4× TS2578 "unused directive", i.e. the typos compiled. Linaria's safety is entirely what you build yourself in TypeScript around string templates; there is no CSS-level typing, which is a step down from vanilla-extract's csstype-based `StyleRule`.

## 4. Toolchain fit, migration, ecosystem

### Toolchain

| Target | Result | Notes |
| --- | --- | --- |
| **tsdown / rolldown** | Works | `@wyw-in-js/rollup` on tsdown 0.23/rolldown 1.2. Needed: `@tsdown/css` (else "CSS file encountered but @tsdown/css is not installed"), `exclude: [/\.d\.[cm]?ts$/]` (tsdown's dts pass routes virtual `.d.ts` modules through `transform`), and **`serializeTransform: false`**: with the plugin default (`true`, documented as the rolldown-safety setting) 4 of 12 builds deadlocked (tsdown hung after dts emit, killed at 25–60 s); 0 of 12 with `false`, output byte-identical across runs. |
| **Vite 8 (rolldown-vite)** | Works | `@wyw-in-js/vite` lib build ~650 ms, identical class names to the tsdown build. Dev/HMR path exists in the plugin (not exercised). |
| **Next.js 16.4** | Works, both pipelines | `@wyw-in-js/nextjs` `withWyw()`: Turbopack via `turbopack.rules` + `@wyw-in-js/turbopack-loader` (page `css` rule emitted as its own CSS chunk), webpack via `@wyw-in-js/webpack-loader` (`next build --webpack` compiled). Tested in `/tmp/next-wyw` outside the repo. |
| **React 19 / RSC** | Works | `@linaria/react` runtime is `forwardRef` + `createElement` + `@emotion/is-prop-valid`; no hooks, no context, no `'use client'`. A Server Component rendering the prebuilt Button prerendered `class="pb3n8vp dik2j3y r7yn0dk" style="--r7yn0dk-0:160px"`; Playwright against `next start` read `rgb(34, 118, 252)` / `min-width: 160px`. React 19.3's `react-server` build exports `forwardRef`. Caveat from wyw's own changelog: evaluation defaults `importOverrides` for `react` so build-time eval does not load Next's vendored RSC runtime. |
| **Studio module CDN** | Neutral | Output is a plain static `style.css` next to the JS, same contract as today (`@sanity/ui/styles.css`), so it can be published like the current CSS. The SAPP-4639 skew (JS N+1 with CSS N) is not solved by any file+ordinal scheme; only content-addressed classes degrade gracefully there (changed rules go missing instead of being swapped). `@linaria/atomic` qualifies, Linaria default and Pigment do not. |
| **Pigment CSS** | Poor | `@pigment-css/vite-plugin` peers `vite ^4‖^5‖^6`; under Vite 8 and Vite 6.4 on Node 22 its CJS entry `require()`s Vite in a cycle (`ERR_REQUIRE_CYCLE_MODULE`, Vite's `module-sync` condition) and its ESM entry has invalid directory imports (`@mui/system/cssVars`); only `vite@6 build --configLoader runner` worked. `@pigment-css/nextjs-plugin` is webpack-only (`"Turbo mode is not supported yet"` guard in `build/index.mjs`). Compiled library output imports `@pigment-css/react/theme` (an `export default {}` stub unless the consumer runs the plugin). |

### Migration effort (survey of the three repos at HEAD)

| Repo | vanilla-extract today | styled-components today | What a Linaria migration means |
| --- | --- | --- | --- |
| sanity-io/ui | 27 `.css.ts` (67 `style`, 17 `globalStyle`, 4 `keyframes`, 1 `createVar`) | 53 files import `styled-components` | `.css.ts` objects → `css` text templates (mechanical, loses csstype typing). The styled-components part is the real cost: styles are computed from `props.theme` at render time (`buttonColorStyles`, `_cardColorStyle`, `getTheme_v2(props.theme)`); Linaria has no runtime theme access, so every theme-derived value must become a CSS custom property emitted by the theme provider (the `--card-*` pattern already exists but is partial). Same redesign any zero-runtime candidate requires. Build: swap `vanillaExtract` for a wyw plugin in `@sanity/tsdown-config`, with the three caveats above. |
| sanity-io/sanity | 122 `.css.ts` (211 `style`, 40 `globalStyle`, 18 `createVar`, 2 `styleVariants`, 1 `keyframes`, 1 `createContainer`) | 275 files, 668 `styled`/`css` tags | Largest surface. Beyond the rewrite, every file with a `css`/`styled` tag is evaluated at build time (shaken to the needed bindings): modules that import browser-only or side-effectful code can slow or break evaluation — the problem MUI cited when pausing Pigment ("slows down the build too much, too many bugs"). vanilla-extract limits evaluation to `.css.ts` files; Linaria widens it to component files. |
| sanity-io/plugins | 26 `.css.ts` (97 `style`, 40 `createVar`, 9 `globalStyle`, 7 `keyframes`, 5 `styleVariants`, 1 `createContainer`) across e.g. `@sanity/color-input`, `@sanity/google-maps-input`, `sanity-plugin-workflow` | 63 files, 129 tags | Built through `@sanity/plugin-kit`/pkg-utils, so the integration lands once there; per-plugin effort is small but each plugin bundles its own copy of the styling runtime unless `@linaria/react` becomes a peer. |

### Ecosystem health

- wyw-in-js: v2.0 released 2026-06-14 (oxc-based, ESM-only, Node ≥ 22), 2.5.1 on 2026-09-03, commits on 2026-10-13 (today). GitHub `wyw-in-js/wyw-in-js`: 324 stars, 6 open issues. Contributors: Anton Evzhakov (Anber) 492 commits, next contributor 20 — a one-person engine. `@wyw-in-js/transform` 196k downloads/week.
- Linaria (`callstack/linaria`): 12.3k stars, 73 open issues, last push 2026-10-10; 8.0.0 2026-06-14, 8.2.0 2026-08-10; same maintainer (Anber 307 commits, satya164 284 historic). `@linaria/core` 691k downloads/week, most of it on pre-wyw majors.
- Pigment CSS (`mui/pigment-css`): README "⚠️ Alpha phase, currently on hold"; one release in 17 months (0.0.31, 2026-05-22, wyw bumps only); project-status discussion #424 (2026-06-08) says the team may not resume it. 26k downloads/week. Not a viable foundation.
- For scale: `@vanilla-extract/css` 2.6M downloads/week.

### Risks

1. Class-name scheme is the failure mode you are leaving (file+ordinal, cwd-dependent); fixing it properly means a two-pass or fork-level processor change in a one-maintainer engine.
2. Build-time evaluation of component files (wider than vanilla-extract's `.css.ts`), with its known bug class; wyw 2's static-first "hybrid" strategy reduces but does not remove it.
3. Bus factor: engine, bundler plugins and Linaria processors all depend on one maintainer.
4. Intermittent rolldown deadlock with the plugin's documented default (`serializeTransform: true`); the workaround is not yet the default.
5. No CSS-level typing; CSS linting would have to come from stylelint on templates.
6. `@linaria/atomic`, the only variant that meets objective 1, changes the authoring model (atomic classes, `cx` merging, no `${otherClass}` selector composition because the eval-time value is an inert marker class) and is the least-used package of the family.

## 5. Scores (1–10, per objective in the brief)

| Objective | Linaria `css`/`styled` | `@linaria/atomic` | Pigment CSS | Evidence |
| --- | --- | --- | --- | --- |
| 1. Safe generated CSS (content-hashed, zero cross-version collisions) | **2** | **7** | **1** | §1, §2: default collides (17 wrong styles, 4 conflicting selectors); atomic 0 conflicts over 102 shared selectors; `classNameSlug` namespacing is version-unique, not content-addressed |
| 2. Typesafe authoring (tokens, variants) | **4** | **4** | **6** | §3: tokens/variants only as safe as your own TS; no CSS typing (template text, non-csstype objects); Pigment csstype objects but custom-property casts |
| 3. Fast compiler + toolchain (Vite, rolldown, tsdown, Next, module CDN) | **7** | **7** | **2** | §3, §4: 370 ms cold / 6–28 ms warm; tsdown, Vite 8, Next 16 Turbopack+webpack all work with three config caveats; Pigment Vite ≤ 6, webpack-only Next |
| React 19 / RSC | **8** | **8** | **6** | Server Component render verified; Pigment claims RSC but untested here and unmaintained |
| Zero / tiny runtime | **8** | **7** | **6** | `css` zero; `styled` 2.9 kB gz; atomic class lists bloat HTML; Pigment 3.4–3.7 kB gz |
| Library CSS publishing | **7** | **7** | **3** | static `style.css` + `./styles.css` export works; class names depend on build cwd; Pigment output imports a plugin-provided theme module |
| Theming with CSS variables | **7** | **7** | **5** | build-time generated `--sui-*` theme classes work; Pigment's types fight custom properties |
| Dynamic styles | **7** | **7** | **7** | prop → CSS variable via `styled` runtime (units appended); atomic uses content-hashed variable names |
| Migration cost (ui / sanity / plugins) | **3** | **2** | **2** | §4: theme-at-runtime styled-components must be redesigned; 275 styled files in sanity enter build-time evaluation |
| Ecosystem health | **5** | **4** | **1** | very active but one maintainer; Pigment on hold |
| Bundle size | **8** | **6** | **7** | §3 |
| **Overall (weighted to the three hard objectives)** | **4** | **5.5** | **1.5** | Not recommended for objective 1; atomic only if an atomic model is acceptable |

## Appendix: how to reproduce

```sh
git fetch origin cody/css-eval-linaria && git checkout cody/css-eval-linaria
cd prototypes/css-eval-linaria && pnpm install
pnpm --filter @sanity-css-eval/demo exec playwright install chromium
pnpm --filter @sanity-css-eval/button-linaria build:all && pnpm --filter @sanity-css-eval/button-linaria-v2 build:all
node scripts/analyze-css.mjs
pnpm --filter @sanity-css-eval/demo build && pnpm --filter @sanity-css-eval/demo test
node scripts/measure.mjs
pnpm --filter @sanity-css-eval/pigment-probe build && node pigment-probe/scripts/measure.mjs
```
Committed evidence: `results/*.json`, `results/*.png`, and the built `button-lib*/dist/**` so the generated CSS can be read without building.
