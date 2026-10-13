# CSS framework evaluation: Panda CSS 2.x (`@pandacss/dev` 2.2.0)

Evaluated against the brief in `css_eval.txt` for sanity-io/ui, sanity-io/sanity and sanity-io/plugins
(background: Linear SAPP-4639, where `@sanity/ui` 4.4.3 → 4.4.4 renumbered vanilla-extract classes so
`_2mi48t0` meant different rules in two versions loaded on one page, breaking the Studio navbar).

- Version under test: `@pandacss/dev` 2.2.0 (latest; 2.0.0 shipped 2026-09-29, 2.2.0 on 2026-10-09).
  Panda 2.x is a Rust/Oxc rewrite of the compiler shipped as a napi binary (`@pandacss/compiler`) with a
  WASM fallback (`@pandacss/compiler-wasm`); the `css()` authoring API is unchanged from 1.x.
- Source inspected: `chakra-ui/panda` at tag `@pandacss/dev@2.2.0` (commit `d149285ee26cd40488909cbf4aa4143980e2e05c`).
- Prototype branch: `cody/css-eval-panda-css` → `prototypes/panda-css/` (no PR opened).
- Machine for all numbers: 4 × Intel Xeon, 16 GB, Linux x64, Node 22.14, pnpm, tsdown 0.23.1 (rolldown 1.2.13), Vite 8.3.4, TypeScript 7.0.2.

## Scores (1–10)

| Objective | Score | One-line verdict |
| --- | --- | --- |
| 1. SAFE generated CSS (content-addressed names, no cross-version collisions) | **8** | Atomic classes are content-addressed and proven collision-free across versions; but hashed mode has a small *silent* 32-bit collision risk (fixable: readable names cost 0 bytes gzipped), and config recipes + token defaults are name-addressed and DO collide unless the documented policy is followed. |
| 2. Type-safe authoring (tokens, variants) | **8** | `strictTokens`/`strictPropertyValues` reject 13/13 wrong usages with "did you mean" hints; variant props typed; cost: hand-written `RecipeRuntimeFn` annotations under `isolatedDeclarations`, `exactOptionalPropertyTypes` friction. |
| 3. Fast compiler that fits the toolchain | **9** | ~125 ms net codegen/cssgen, 1000 files / 3200 rules in 236 ms wall, 4 ms watch rebuilds; Vite 8 (rolldown-vite), Rollup plugin inside tsdown/rolldown, PostCSS (Next.js), CLI pre-generation for the module CDN all verified. No Turbopack transform plugin. |
| React 19 / RSC | 9 | Verified: SSR in plain Node, no client-only React APIs in the shipped JS; `css()`/`cva()` are pure functions. |
| Zero or tiny runtime | 6 | Not zero for a component library: prop-driven `cva` recipes keep a 6.9 kB gzip runtime (whole library 10.6 kB gzip). Source transforms only remove *static* call sites. |
| Library publishing (CSS to npm consumers) | 9 | First-class "Consume without Panda" path (`panda cssgen --outfile dist/styles.css`); `panda lib` for Panda-running consumers. Verified end to end incl. publint. |
| Theming with CSS variables | 8 | Tokens → CSS variables natively, semantic tokens with `_dark`, `token.var()`; defaults at `:root` collide across versions by *name* (mitigated by the runtime provider pattern). |
| Dynamic styles | 6 | Runtime values only through CSS variables / `token.var()` / recipes; no arbitrary runtime style objects without `staticCss`. |
| Migration cost (3 repos) | 5 | vanilla-extract → `css()`/`cva()` is mostly mechanical (175 `.css.ts` files); the bulk is styled-components theme-derived CSS (≈1,600 `styled`/`css\`` sites, ≈440 theme reads) that must become CSS variables + static styles; layered CSS changes cascade behaviour. |
| Ecosystem health | 7 | 6.2k stars, 1.9M npm downloads/month, 465 commits & 218 issues closed in 90 days, 7 open issues; but 2.0 is two weeks old and ~60% of commits are one maintainer. |
| Bundle size (CSS) | 8 | 12.4 kB raw / 2.5 kB gzip for the whole Button system; atomic CSS dedupes across versions (63 of 69 v1 classes reused by v2). |

## 1. How Panda generates class names (verified from source)

Panda emits **atomic** CSS: one class per `(conditions, property, value)`. Names are derived from the
authored style key, not from a counter or a file scope.

### 1.1 Atomic class: `[prefix-]hash(cond1:cond2:prop_value)` or the readable name itself

`crates/pandacss_utility/src/lib.rs`:

```rust
// L302-311: the readable atomic name is "<utility class>_<value>", e.g. bg_red.500
pub fn get_class_name(&self, property: &str, raw: &str) -> String {
    let key = self.resolve_shorthand(property);
    let prefix = self.properties.get(key).and_then(|config| config.class_name.as_deref())
        .map_or_else(|| hyphenate_property(key), str::to_owned);
    join_class_name(&prefix, &self.separator, raw)
}
// L372-380: hashing (optional) happens on that readable name; the prefix is applied AFTER hashing
let class_name = self.get_class_name(&utility, &class_value);
let class_name = if self.hash_class_names {
    self.format_class_name_owned(to_hash(&class_name))
} else {
    self.format_class_name(&class_name)
};
// L290-300: format_class_name_owned = "<prefix>-<name>"
```

Conditions are prepended to the hash input, `crates/pandacss_stylesheet/src/emitter.rs`:

```rust
// L2814-2819
fn hash_class_name(config: &UserConfig, class_name: &str, conditions: &[&str]) -> String {
    if conditions.is_empty() { return to_hash(class_name); }
    to_hash(&condition_prefixed_name(config, class_name, conditions))   // "hover:dark:bg_red.500"
}
```

The generated runtime computes the identical string (`crates/pandacss_utility/src/runtime_class.rs`
L42-45 and `styled-system/css/css.js`: `toHash(path, hashFn) { return hashFn(path.join(":")) }`,
`prefix: "sui-v4"`), so build-time CSS and runtime class strings agree by construction.

### 1.2 The hash: 32-bit DJB2, base-52

`crates/pandacss_shared/src/hash.rs`:

```rust
// L77-107
/// JS-compatible hash for CSS variable naming; mirrors `packages/shared/src/hash.ts`.
pub fn to_hash(value: &str) -> String { to_name(to_phash(5381, value).cast_unsigned()) }
/// DJB2 rolling hash over the string in reverse, matching the JS source.
fn to_phash(mut h: i32, value: &str) -> i32 {
    if value.is_ascii() { for byte in value.bytes().rev() { h = h.wrapping_mul(33) ^ i32::from(byte); } return h; }
    ...
}
// L108-126: base-52 [a-zA-Z] encoding, ≤ 6 characters
```

Consequences: (a) the hash is of the *name* (`bg_red.500`), i.e. of the authored content, never of a
file position; (b) it is 32-bit, so the birthday bound applies (§1.5); (c) since it runs over the
string in reverse, two colliding base names collide under every condition prefix too.

### 1.3 Config recipes and compound variants are NAME-addressed

`crates/pandacss_system/src/recipes.rs`:

```rust
// L1673-1680
fn recipe_variant_class_name(class_name: &str, variant: &str, separator: &str, value: &str) -> String {
    format!("{class_name}--{variant}{separator}{value}")        // "badge--tone_primary"
}
// L408-421: hashed when hash.className is on, then prefixed — still a hash of the NAME, not of the declarations
fn runtime_class_name(&self, class_name: &str) -> String {
    let name = if self.hash_class_names { pandacss_shared::to_hash(class_name) } else { class_name.to_owned() };
    ...
}
```

`crates/pandacss_shared/src/hash.rs` L17-36: compound variants are `{base}--{hash("k=v,k=v")}`.
So a config recipe (`theme.recipes` / `defineRecipe`) keeps the same class across versions while its
declarations change — the vanilla-extract failure shape. Atomic recipes (`cva`) do not have this
problem: every variant is emitted as atomic classes
(`website/content/docs/recipes/atomic-recipe.mdx`: "Every variant turns into CSS as atomic…").

### 1.4 Token CSS variables are name-addressed too

`crates/pandacss_tokens/src/from_config.rs` L494-515: `--{prefix-}{token-path}` (or
`--{prefix-}hash(name)` with `hash.cssVar`). The variable *name* is stable while its *value* can
change between versions; two stylesheets then fight over `:root`.

Panda's own docs state this plainly (`website/content/docs/styling/style-isolation.mdx`,
"Cross-version collision" and "Tokens still collide") and recommend
`prefix: \`${slug}-v${major}\`` keyed to the package name and major version.

### 1.5 Can two versions/copies on one page EVER collide?

| Case | Collides? | Evidence |
| --- | --- | --- |
| Atomic classes (`css()`, `cva()`), same config, any style change incl. inserting/reordering styles | **No.** Same name ⇒ same declarations (harmless duplicate); changed style ⇒ different name. | Static check: 63 shared atomic selectors, all identical, 0 collisions. Browser: 74/74 assertions, 0 shared atomic class with differing rules. |
| Atomic classes, hashed mode, two *different* names hashing equal (32-bit) | **Yes, rarely and silently.** P ≈ 1 − exp(−N²/2³³): 0.05 % at 2k distinct atoms, 1.2 % at 10k, 25 % at 50k. Measured: 9 colliding pairs among 100k realistic names (e.g. `bg_[39px]` ≡ `bd-r_red.50` → `dlPnlp`). Reproduced in one build: two rules emitted under `.sui-v4-dlPnlp`, **`diagnostics: 0`**. | `scripts/hash-collision-estimate.mjs`, `results/hash-collision-estimate.json` |
| Atomic classes, readable mode (`hash: {className: false}`) | **No** (name *is* the content; only `space→_` normalisation). Costs 0 bytes gzipped (2.55 vs 2.53 kB). | `results/runtime-size.json` |
| Config recipe classes (`theme.recipes`) when the recipe changes | **Yes** (negative control): v1 Badge rendered with v2's padding (12px instead of its own 8px). | browser proof `pitfalls.configRecipeBadge.collided = true` |
| Token defaults at `:root` when a token value changes | **Yes** for elements outside a provider: v1's unprovided primary button got v2's `#2a4fd9`. Inside `ThemeProvider` (values assigned inline from the version's own JS): **no**. | browser proof `pitfalls.rootTokenDefaultWithoutProvider`, and 74/74 provider assertions |
| Config *mapping* changes (a condition's selector, a breakpoint value, a utility transform, the var prefix) | **Yes**: the name encodes the condition/utility *name*, not its definition. Needs a prefix rotation (major bump or hash of the config). | source §1.1–1.4 |
| New JS served with the previous CSS (SAPP-4639 race) | Degrades, never misapplies: a v2 class either exists in v1 CSS with the identical rule or has no rule. Colors stayed correct; padding/weight/gap fell back to UA defaults (6px/400/normal), never to v1's values. | `apps/demo/skew.html`, 20/20 assertions, `results/version-skew-v2-js-with-v1-css.png` |

**Policy that makes Panda "safe" for a published library:** atomic recipes only (`cva`, never
`theme.recipes` in published CSS), readable class names or a CI duplicate-selector check, `prefix`
keyed to package + major, semantic token values assigned at runtime by the theme provider (the
prototype's `ThemeProvider`), `preflight: false`. Panda enforces none of this; it is convention.

## 2. Prototype (branch `cody/css-eval-panda-css`, `prototypes/panda-css/`)

Self-contained pnpm workspace (own lockfile; not part of the root workspace).

- `packages/button-v1` (`@sanity-eval/panda-button-v1@4.4.3`): `Button` with `tone`
  (default/primary/positive/caution/critical) × `mode` (default/ghost/bleed) as a `cva` recipe
  where tone variants assign `--sui-btn-*` variables and mode variants consume them (the
  @sanity/ui `--card-*-color` pattern); tokens (palette) + semantic tokens with `_dark` values →
  CSS variables `--sui-v4-colors-…`; `ThemeProvider` sets `data-sui-scheme` and assigns this
  version's semantic values inline (runtime theme overrides supported); dynamic `width`
  (inline `--sui-btn-width`) and `radius` (`token.var()` at runtime); a config-recipe `Badge` as
  negative control. Config: `presets: ['@pandacss/preset-base']`, `preflight: false`,
  `hash: {className: true, cssVar: false}`, `prefix: 'sui-v4'`, `strictTokens`,
  `strictPropertyValues`, `staticCss: {recipes: '*'}`.
- Build (the "Consume without Panda" path): `panda codegen && panda cssgen --outfile dist/styles.css && tsdown`
  (`@sanity/tsdown-config`, `exports: false`, `clean: false`); `exports` = `.` (dist/index.js + .d.ts)
  and `./styles.css`; publint clean. tsdown bundles the generated `styled-system` runtime into
  `dist/index.js` (45 kB unminified, 10.6 kB min+gzip).
- `packages/button-v2` (4.4.4): new `css()` style inserted *before* the recipe ("renumbering"),
  `mode` declared before `tone`, base declarations shuffled, padding 3→4, radius 2→3, gap 2→3,
  weight medium→semibold, hover/active changes, primary token default blue.500→blue.600, Badge
  recipe padding/radius changed.
- `apps/demo`: Vite app (no Panda plugin) importing both packages' `dist` and `styles.css`
  (v1 first, v2 last) on one page; `skew.html` renders v2 JS with only v1 CSS.
- `apps/vite-panda-app`: an app running Panda itself via `@pandacss/vite` (`transform: true`)
  next to the pre-built library.
- Proofs: `scripts/check-css-collisions.mjs` (postcss, static), `scripts/browser-proof.mjs`
  (Playwright/Chromium, 74 + 20 computed-style assertions, DOM/CSSOM overlap, screenshots),
  `scripts/type-safety.mjs`, `apps/vite-panda-app/check.mjs`, `postcss-check.mjs`,
  `apps/demo/ssr-check.mjs`, `scripts/hash-collision-estimate.mjs`; all green via `pnpm test`.
- Evidence committed under `results/` (stylesheets, JSON verdicts, screenshots, bench numbers).

Screenshot `results/two-versions-one-page.png`: both versions side by side, v2 visibly wider,
bolder, rounder and darker-blue while v1 is intact, including dark scheme, dynamic width/radius
and a purple runtime theme override in each.

## 3. Metrics

Compile times (5 runs, ms min / median / max; `pnpm exec` process overhead alone is 218 / 222 / 231,
so subtract ≈220 ms for engine time):

| Step | min / median / max |
| --- | --- |
| `panda codegen`, cold (no `styled-system/`) | 344 / 353 / 359 (≈130 ms net) |
| `panda codegen`, warm (output present) | 342 / 352 / 365 (no on-disk cache: cold ≈ warm) |
| `panda cssgen`, first run | 348 / 352 / 362 (≈130 ms net) |
| `panda cssgen`, repeat | 336 / 343 / 396 |
| `panda cssgen --watch` rebuild after editing Button.tsx | **4.0 / 4.4 / 6.0** (0 missed events in 5 edits) |
| tsdown (JS + d.ts via @sanity/tsdown-config) | 648 / 656 / 669 |
| Full library build (rm dist, codegen, cssgen, tsdown) | 963 / 974 / 987 |
| tsdown + `@pandacss/rollup` `transform: true` | 655 / 656 / 663 |
| `vite build` of the consumer demo | 415 / 427 / 440 |
| Synthetic 300 files (1 `css()` + 1 six-variant `cva` each) → 1,100 rules, 66 kB | codegen 169; cssgen 171 / 172 / 172 |
| Synthetic 1,000 files → 3,200 rules, 158 kB | codegen 152; cssgen **232 / 236 / 236** |
| `tsc` (TS 7.0.2) over src + styled-system + type-tests | 352 |
| `postcss` + `@pandacss/dev/postcss` (Next path) on the Vite app | 95 |

Watch-mode caveat: the stylesheet only grows while watching (removed atoms stay until restart —
dev only); one in-place write was not picked up by `@parcel/watcher` in a manual probe (0 of 5 in
the automated run).

Sizes (bytes; min+gzip/brotli via rolldown for JS):

| Artifact | raw | gzip | brotli |
| --- | --- | --- | --- |
| `styled-system/css` runtime (css + cva + cx) | 18,879 | **6,902** | 6,104 |
| `styled-system/css` (css only) | 16,630 | 6,084 | 5,377 |
| `styled-system/tokens` (token + token.var) | 5,980 | 1,580 | 1,322 |
| `styled-system/recipes` (config recipe runtime) | 9,159 | 3,718 | 3,366 |
| `styled-system/jsx` (styled factory; unused by the library) | 32,855 | 11,064 | 9,571 |
| Library `dist/index.js`, runtime build | 32,218 | **10,627** | 9,329 |
| Library with `transform: true` | 32,195 | 10,623 | 9,332 (no saving: `button({mode, tone})` is a runtime call) |
| `styles.css`, hashed names | 12,671 | 2,533 | 2,113 |
| `styles.css`, hashed + `--minify` | 10,715 | 2,434 | 2,004 |
| `styles.css`, readable names | 14,454 | 2,545 | 2,089 |
| `styles.css`, readable + `--minify` | 12,498 | 2,452 | 2,026 |
| Demo page CSS (v1 + v2 + chrome) | 27,002 | 3,224 | 2,595 |
| Published `index.d.ts` | 98,381 | | (exporting a `cva` typed as `RecipeRuntimeFn` pulls the whole `SystemStyleObject` graph into the `.d.ts`) |

Type safety (TypeScript 7.0.2, `strictTokens` + `strictPropertyValues`): all 13 wrong usages fail
`tsc`, 0 errors elsewhere — unknown semantic token (`Did you mean '"tone.primary.bg"'?`), raw
`'13px'` where a token is required, `display: 'flexx'` (`Did you mean '"flex"'?`), `colour`
(`Did you mean to write 'color'?`), `_hovr` (`Did you mean to write '_hover'?`), wrong
`cva` variant value and name, wrong JSX prop, wrong `token()`/`token.var()` paths, wrong config-recipe
variant, wrong theme path, radius token used as a color. Without `strictTokens`, raw CSS values are
accepted by design. The type check also caught 4 real errors in my source that the tsdown build had
not (its `.d.ts` emit is isolated-declarations only): `exactOptionalPropertyTypes` requires
`tone?: Tone | undefined` in hand-written `RecipeRuntimeFn` annotations, and `outlineOffset: '1px'`
violated `strictTokens` while the extractor still emitted CSS for it (types are stricter than the
compiler). Sanity's `tsconfig.settings.json` does not enable `exactOptionalPropertyTypes`.

## 4. Toolchain fit

| Target | Verdict | Evidence |
| --- | --- | --- |
| Vite (Studio, Storybook, test studios) | Works on Vite 8.3.4 (rolldown-vite): `@pandacss/vite` (peer `vite >= 6`), HMR via the layer-declaring CSS root, `transform: true` inlines static `css()`/`cva()` into class strings / variant lookup tables. | `apps/vite-panda-app/check.mjs` 9/9 |
| rolldown / tsdown (library builds) | Two working paths: (a) `panda cssgen` + tsdown with no plugin (recommended: zero coupling), (b) `@pandacss/rollup` inside tsdown (`mergeConfig`, emits `styles.css` as an asset; docs: "Rolldown work[s] through the Rollup adapter"). One warning: the transformer plugin emits no sourcemap. `panda lib` and tsdown's `exports` generation both rewrite `package.json#exports` — use one of them. | `tsdown.transform.config.mts`, bench |
| Next.js (www) | PostCSS plugin `@pandacss/dev/postcss` works (Turbopack and webpack); source transforms need `--webpack` (no Turbopack plugin API). Documented `.next/cache` stale-CSS caveat; alternative `panda --watch` + import generated CSS. | `postcss-check.mjs` 5/5; `website/.../source-transforms.mdx`, `nextjs.mdx` |
| React 19 / RSC | React 19.3 used throughout; `css()`/`cva()` have no React dependency; the generated `jsx` factory uses only `createElement`/`forwardRef` (no hooks/context); library renders with `react-dom/server` in Node; no `use client` needed. | `apps/demo/ssr-check.mjs` 6/6 |
| Studio module CDN | `@repo/package.bundle` (Vite 8 build) collects CSS into one `index.css` served via `<link>` and strips CSS imports from chunks; a Panda-built `@sanity/ui/styles.css` flows through unchanged (static CSS, `@layer`). If `sanity` itself adopts Panda: pre-generate per package with `panda cssgen` at build (no bundler coupling) or add `@pandacss/vite` to the bundle config. The JS/CSS publishing race (SAPP-4639) becomes a missing-rule degradation instead of mis-styling (§1.5). | `sanity/packages/@repo/package.bundle/src/package.bundle.ts` L119-166 |
| Node / engines | Panda 2 is ESM-only and needs Node ≥ 22 (fits `>=22.12`/`>=22.13`). Native binaries for darwin/linux/win (glibc+musl), WASM fallback. | `panda-css-v2.mdx` |

## 5. Migration effort

Inventory (files outside node_modules):

| Repo | `.css.ts` files / lines | vanilla-extract APIs | styled-components importers | `styled.x`/`styled()` | `` css` `` | theme reads in styled code |
| --- | --- | --- | --- | --- | --- | --- |
| sanity-io/ui | 27 / 750 | `style` 67, `globalStyle` 17, `keyframes` 4, `createVar` 1 | 53 | 72 | 38 | 48 |
| sanity-io/sanity | 122 / 1,965 | `style` 211, `globalStyle` 40, `createVar` 18, `styleVariants` 2, `keyframes` 1, `createContainer` 1 | 275 | 559 | 191 | 313 |
| sanity-io/plugins | 26 / 1,223 | `style` 97, `createVar` 40, `globalStyle` 9, `keyframes` 7, `styleVariants` 5, `createContainer` 1 | 63 | 99 | 31 | 75 |

- **vanilla-extract → Panda** is largely mechanical and documented
  (`website/content/docs/get-started/vanilla-extract.mdx`): `style()` → `css()`, `styleVariants` →
  object of `css()` or `cva`, `recipe` → `cva`, `createVar`/`assignInlineVars` → `--x` keys + inline
  `style`, `globalStyle` → `globalCss`, `keyframes` → `keyframes()`. Files can keep the `.css.ts`
  name during migration, but a file exporting a `cva` fails the vanilla-extract plugin until the
  plugin is removed. Estimate: sanity-io/ui ≈ 27 files, one PR per component area; sanity ≈ 122
  files; plugins ≈ 26 files across 7 packages.
- **styled-components → Panda** is the real cost and is the same for every static-extraction
  candidate: the styles that read the runtime theme (`getTheme_v2(props.theme)` in
  `packages/ui/src/core/primitives/button/styles.ts`; 48 / 313 / 75 theme reads) cannot be
  extracted; they must become CSS variables set by `ThemeProvider` (as in the prototype — @sanity/ui
  already does this for colors with `--card-*-color`) plus static atomic styles. Consumers' own
  styled-components code keeps working unchanged against the library (unlayered CSS beats Panda's
  layered CSS — see risks).
- **Build plumbing:** replace `@sanity/vanilla-extract-{vite,rolldown,tsdown}-plugin` with
  `panda cssgen` in the package build (no bundler plugin needed for libraries) and
  `@pandacss/vite` in apps; the `@sanity/tsdown-config` `vanillaExtract` option becomes a
  pre-build step. `isolatedDeclarations` projects must annotate exported `cva`s with
  `RecipeRuntimeFn<…>`; avoid exporting raw recipes from the public API to keep `.d.ts` small.
- Rough order of work: ui (prototype pattern generalised: ~20 primitives + theme-to-variables
  layer; the hard part is replacing `styled-components` theme styles), sanity (the 275
  styled-components importers dominate), plugins (per-plugin, small).

## 6. Ecosystem health and risks

- `chakra-ui/panda`: 6,223 stars, 324 forks, MIT, created 2022-07; 7 open issues / 7 open PRs,
  218 issues closed and 465 commits in the last 90 days; 324 `@pandacss/dev` release tags;
  2.0.0 (2026-09-29) → 2.2.0 (2026-10-09). npm: 1.95M downloads/month for `@pandacss/dev`
  (context: `@vanilla-extract/css` 12.0M, `@stylexjs/stylex` 8.9M, `styled-components` 48.7M).
  Commits: segunadebayo 2,452, astahmer 348, anubra266 295 (bus factor concentrated; backed by
  the Chakra UI organisation).
- Risks, in priority order:
  1. **Silent hashed-name collisions** (32-bit DJB2, no diagnostic). Mitigation: readable class
     names (`hash.className: false`, same gzip size) or the duplicate-selector CI check from the
     prototype.
  2. **Name-addressed config recipes and token defaults** collide across versions sharing a
     prefix. Mitigation: `cva` only, runtime-provided semantic values, major-keyed `prefix`;
     config-mapping changes (conditions, breakpoints, utilities) need a prefix rotation.
  3. **2.0 is two weeks old**: Rust/napi engine, new design-system (`panda lib`) and transformer
     features; internal packages folded in (no `@pandacss/core` to patch, which also means no
     fork surface comparable to pkg-utils' vanilla-extract fork — a plus for "don't drift").
  4. **Cascade layers**: Panda output is layered; today's vanilla-extract/styled-components CSS is
     unlayered and therefore always wins over Panda rules. Convenient for consumer overrides, but
     Studio/plugin rules that currently lose on specificity would start winning — needs an audit
     or layer flattening (`postcss-cascade-layers`) during migration.
  5. **Runtime is not zero** for prop-driven components (6.9 kB gzip), and the `.d.ts` grows with
     exported inline recipes.
  6. Dev-loop quirks: watch mode only grows the stylesheet; Next's PostCSS cache can serve stale CSS
     after a cold restart; `panda lib` rewrites `package.json#exports`.
  7. Extraction limits: no runtime style objects (helpers must be `const`/single-`return`), so
     code generating styles from data (`Object.entries`, loops) has to be written out or moved to
     `panda.config.ts`.

## 7. Bottom line for Panda

Panda 2.2 meets objective 1 for the exact failure in SAPP-4639: atomic classes are addressed by
their authored content, so inserting, reordering or changing styles between 4.4.3 and 4.4.4 can
never make an existing class mean something else, and the publishing race degrades to missing
declarations rather than wrong ones — all proven in a real browser against built packages. The
guarantee is conditional on a short, enforceable policy (atomic recipes only, readable names or a
CI selector check, major-keyed prefix, runtime-provided token values), because Panda itself still
has two name-addressed features and a 32-bit hash with no collision diagnostic. Type safety is
strong with `strictTokens`; the compiler and plugins are fast and fit Vite 8, tsdown/rolldown,
PostCSS/Next and the module CDN with no forks. The costs are a ~7 kB runtime for prop-driven
recipes, a very young 2.0 line, and a migration dominated by styled-components theme code rather
than by vanilla-extract.
