# CSS evaluation — atomic CSS-in-JS: Griffel (main) and Compiled (secondary)

**Framework under evaluation:** the atomic CSS-in-JS family — [Griffel](https://griffel.js.org) (Microsoft; `@griffel/react` 1.7.8 / `@griffel/core` 1.21.4, the engine of Fluent UI v9) as the main candidate, [Compiled](https://compiledcssinjs.com) (Atlassian; `@compiled/react` 2.0.0) as the secondary one.
**Picked for the prototype:** Griffel. Reasons in §1 (hash quality) and §4 (toolchain).
**Branch (no PR):** `cody/css-eval-griffel-f4cc` in sanity-io/ui → `prototypes/griffel/` (standalone pnpm workspace; root workspace untouched).
**Background:** SAPP-4639 — vanilla-extract hashes class names by *file scope + counter*, so `@sanity/ui` 4.4.3 and 4.4.4 both emitted `_2mi48t0` for different rules and the Studio navbar broke with both versions on one page.

## Scores (1–10) against the brief's objectives

| # | Objective (brief priority order) | Griffel | Compiled | Notes |
| --- | --- | --- | --- | --- |
| 1 | **Safe generated CSS** — content-hashed, no collisions across versions / copies | **9** | 5 | Griffel: full 32-bit murmur2 of `salt+selector+at-rules+property+value`, lookup table shared across copies, proven in Chrome with 2 versions × 2 runtime copies (0 collisions). Residual: 32-bit birthday risk (p ≈ n²/2³³), which the prototype plugin turns into a build error within a package. Compiled: hash *truncated* to 4+4 base-36 chars by default — its own changelog says this "caus[es] class name collisions in large applications"; the opt-in fix still truncates the value hash to 62⁴. |
| 2 | **Type-safe authoring** (tokens, variants) | **7** | 6 | Wrong tokens, tones, modes, missing variant slot, unknown slot, unit-less numbers, unsupported shorthands, incomplete theme all fail `tsc` (17 probes). Gaps: misspelled *property names* compile (index signature for nested selectors), most values are `string`. Compiled has the same csstype gaps plus a less typed `css` prop; not prototyped. |
| 3 | **Fast compiler that fits Vite / rolldown / tsdown / Next.js / module CDN** | **8** | 5 | oxc-based `@griffel/transform` (no Babel): 25 ms cold / 4 ms warm per file; official Vite 8 plugin; tsdown/rolldown via the ~130-line plugin in the prototype; webpack/Rspack plugins. Next.js: extraction is webpack-only (no Turbopack), runtime SSR registry documented. Compiled: Babel + PostCSS pipeline; Vite plugin exists (Babel inside); nothing for rolldown/tsdown. |
| — | React 19 / RSC | 7 | 7 | Both are client-only (hooks/context), peer ranges include 19. Same boundary styled-components imposes today. |
| — | Zero / tiny runtime | 7 | 8 | Griffel: 4.6 kB gzip for precompiled libraries (1.2 kB in extracted mode); vs styled-components 9.5 kB+ today. Compiled runtime 1.8 kB. |
| — | Library publishing (CSS reaches npm consumers) | **9** | 6 | Griffel "inject" output carries CSS inside the JS → no `styles.css`, nothing for the module CDN to serve, proven with packed tarballs. Compiled relies on runtime `<CS>` components or webpack extraction of `node_modules` and documents "local development atomic clashes". |
| — | Theming with CSS variables | 9 | 8 | First-class pattern (Fluent tokens); typed `tokens` object in the prototype. |
| — | Dynamic styles | 6 | 7 | Griffel has none at runtime (inline CSS variables, like `assignInlineVars`). Compiled turns dynamic interpolations into CSS variables automatically. |
| — | Migration cost from vanilla-extract + styled-components | 6 | 6 | VE APIs map ~1:1 (caveats: `.parent &`, `&&`, nested `globalStyle`); styled-components props → enumerated variants + CSS vars for both. Griffel adds the `mergeClasses` discipline (no `clsx`). |
| — | Ecosystem health | 7 | 6 | Griffel: Fluent UI v9 dependency, 546 k downloads/week, 61 commits/90 d, 60 open issues, one dominant maintainer. Compiled: 576 k/week, 28 commits/90 d, 161 open issues, 0.22 → 2.0 in two months. |
| — | Bundle size (CSS) | 8 | 8 | Atomic: Button library 1.4 kB gzip; a second version adds 112 B gzip (7 changed declarations). |

**Verdict within the family:** Griffel. It is the only one of the two whose class name is a function of the *whole* declaration with an untruncated hash, it already runs on oxc + Vite 8, and its "precompiled JS carries the CSS" publishing model removes the `styles.css` / module-CDN problem instead of re-creating it.

---

## 1. How class names are generated — verified from source

Sources: microsoft/griffel `8a7b9d5` (2026-10-09), atlassian-labs/compiled `fec8045` (2026-09-24), both cloned at depth 1.

### 1.1 Griffel: atomic, content-hashed, untruncated

Every declaration becomes one class whose name is `'f' + murmur2(salt + selector + atRules + property + value)`:

```ts
// packages/core/src/runtime/utils/hashClassName.ts:14-25
export function hashClassName({ property, selector, salt, value }: HashedClassNameParts, atRules: AtRules): string {
  return (
    HASH_PREFIX +                               // 'f' (constants.ts:50)
    hashString(
      salt + selector + atRulesToString(atRules) + property +
        // Trimming of value is required to generate consistent hashes
        value.trim(),
    )
  );
}
```

- `hashString` is `@emotion/hash` 0.9.2: MurmurHash2, 32-bit, emitted as `(h >>> 0).toString(36)` — **no truncation** (`emotion-hash.esm.js`, last line of `murmur2`). Class names are 1 + ≤7 chars (`f18vnl5v`).
- Called from `resolveStyleRules.ts:146` (scalar values) and `:274` (fallback arrays, value = `values.join(';')`). Nested selectors, `@media`, `@supports`, `@layer`, `@container`, `@scope` are folded into `selector`/`atRules` (`atRulesToString`, `hashPropertyKey.ts:10-18`), so `color:red`, `:hover{color:red}` and `@media (hover:hover){:hover{color:red}}` are three different classes.
- RTL variants get their own hash of the flipped declaration (`resolveStyleRules.ts:159-168`).
- `makeResetStyles` (the monolithic "base" class): `'r' + murmur2(salt + <serialized LTR body>)` (`resolveResetStyleRules.ts:180`, RTL `:189`); `@keyframes` names: `'f' + murmur2(keyframeCSS)` (`resolveStyleRules.ts:210`).
- Build time and runtime use the **same functions** (`@griffel/transform` imports `resolveStyleRulesForSlots`/`resolveResetStyleRules` from `@griffel/core`, `transform/src/transformSync.mts:8-16`), so AOT and runtime output are byte-identical.
- There is no counter, no file path, no package name anywhere in the hash input. The only build-wide input is the optional `classNameHashSalt`, which must be identical for all renderers on a page (`makeStyles.ts:389-401` logs an error otherwise).

**Deduplication**: atomic declarations are deduplicated by name (same declaration ⇒ same class ⇒ same rule), and at merge time per CSS property: `mergeClasses` resolves the sequence hash `___xxxxxxx` of each class list through `DEFINITION_LOOKUP_TABLE` and keeps the *last* class for each property key (`mergeClasses.ts:120-168`), so conflicts never depend on CSS order.

### 1.2 Can two versions or copies of a library collide? (Griffel)

- **Same declaration in two versions** ⇒ same class name *and* the same rule text ⇒ harmless duplicate. The renderer dedupes rule text per renderer (`createDOMRenderer.ts:107-111`); a second renderer inserts its own identical copy.
- **Different declarations** ⇒ different names, unless two different `(salt, selector, atRules, property, value)` tuples collide in 32 bits. Probability for *n* distinct declarations on a page ≈ n²/2³³: 5 000 declarations → 0.3 %, 2 000 → 0.05 %. For the "two versions of one package" case only the *changed* declarations can collide with the existing ones: 50 changed × 5 000 existing / 2³² ≈ 6 × 10⁻⁵. Within one package build this is fully checkable — the prototype's tsdown plugin fails the build if one class maps to two rules (`prototypes/griffel/tsdown-plugin/src/index.ts`, `assertOneMeaningPerClass`). By contrast the vanilla-extract failure had probability 1 by construction.
- **Two runtime copies on one page** (e.g. a plugin bundling its own `@griffel/react`): the merge table is deliberately global — `DEFINITION_LOOKUP_TABLE` lives at `globalThis[Symbol.for('@griffel/DEFINITION_LOOKUP_TABLE')]` with the comment "These constants are global and will be shared between Griffel instances" (`constants.ts:7-27`). `mergeClasses` of copy A therefore correctly merges classes produced by copy B (verified in `app/tests/ssr-and-two-copies.test.tsx`). Style-bucket order is also global: `findInsertionPoint` scans **all** `[data-make-styles-bucket]` elements in `<head>`, not just the renderer's own (`getStyleSheetForBucket.ts:161`), so hover/active/media precedence holds across copies (verified: `r r d d d d i i m m` in the browser).
- **What is not shared across copies**: React contexts (`RendererProvider`, `TextDirectionProvider`) — a copy ignores the other copy's provider (SSR collection only sees the copy you own the renderer of; verified in the Node tests). Same caveat as two styled-components copies.

### 1.3 Compiled: atomic, content-hashed, **truncated**

```ts
// packages/css/src/plugins/atomicify-rules.ts:60-79
const atomicClassName = (node: Declaration, opts: PluginOpts) => {
  const groupKey = `${prefix}${opts.atRule}${selectors}${node.prop}`;
  const value = node.important ? node.value + node.important : node.value;
  if (opts.collisionResistantHash) {
    const group = hashBase62(groupKey, ATOMIC_GROUP_HASH_LENGTH);  // 6 chars
    const valueHash = hashBase62(value, ATOMIC_VALUE_HASH_LENGTH); // 4 chars (62⁴ = 14.8 M)
    return `_${group}${valueHash}`;
  }
  // Legacy: base-36 truncated to 4 chars each (9-char class). Preserves existing output.
  const group = hash(groupKey).slice(0, LEGACY_HASH_SLICE_LENGTH);   // 36⁴ = 1.7 M, biased
  const valueHash = hash(value).slice(0, LEGACY_HASH_SLICE_LENGTH);
  return `_${group}${valueHash}`;
};
```

- `hash()` is also murmur2 → base-36 (`packages/utils/src/hash.ts:62-64`), but **sliced to 4 characters**. The default (`collisionResistantHash: false`) is what every published Compiled package uses today. Compiled's own changelog (`packages/css/CHANGELOG.md:23-31`): the legacy encoding "has a severely constrained effective hash space due to leading-digit bias … causing class name collisions in large applications that can result in `ax()` silently dropping styles". The opt-in mode widens the *group* to the full 32-bit space but keeps a **4-char value hash** (`hash.ts:88`): two different values of the same property in the same selector context collide with p ≈ n²/(2·62⁴) — 500 distinct colors → 0.8 %, 2 000 → 13 %.
- Enabling the flag is a breaking change for published packages (requires `@compiled/react ≥ 1.0.0` runtime; docs `collision-resistant-hash.mdx`).
- Runtime merge `ax()` groups by the class prefix (`ax.ts:13`, length-based slice) — pure, so it works across copies — but the style-bucket cache is **module-scoped** (`sheet.ts:57`, `const styleBucketsInHead`), so two runtime copies do not coordinate bucket order; Compiled documents the resulting "atomic clashes" for the runtime-vs-extracted mix (`local-development-atomic-clashes.mdx`).

**Conclusion for objective 1:** both are content-based and atomic, but only Griffel keeps the full hash; Compiled's default output has a documented, non-trivial collision rate and its fix is an opt-in migration that still truncates. This decided the prototype.

---

## 2. Prototype (`prototypes/griffel/`, branch `cody/css-eval-griffel-f4cc`)

A standalone pnpm workspace (own `pnpm-workspace.yaml` + lockfile) so the root workspace, lockfile and the `@sanity/ui` build stay untouched. `pnpm install && pnpm build && pnpm test && pnpm typecheck && pnpm bench`.

| Package | What it shows |
| --- | --- |
| `tsdown-plugin/` | rolldown/tsdown plugin on `@griffel/transform` (oxc) + `createResolverFactory` from `@griffel/vite-plugin`. `mode: 'inject'` → `__styles(classes, cssRules)` (class names and CSS computed at build time; CSS inserted by the runtime — how Fluent UI publishes). `mode: 'extract'` → `__css(classes)` + `styles.css` (today's `@sanity/ui/styles.css` contract). Also emits the CSS asset in inject mode for metrics, and fails the build on a same-class-different-rule collision. 5 `node:test` tests. |
| `button/` (1.0.0) | `Button` with 5 tones × 3 modes: `makeResetStyles` structural base (`buttonRoot`), atomic `makeStyles` root/content/fill slots, tone and mode classes that only map CSS variables (so the matrix costs tones + modes classes, not tones × modes), `:hover`/`:active` under `@media (hover: hover)`, `:focus-visible`, `[data-selected]`, `[data-disabled]`. `width="fill"` static variant; `width={200}` **dynamic style** via an inline `--btn-width` read by a precompiled rule. `ThemeProvider` publishes a `Theme` as `--sui-*` custom properties; `tokens` is a typed `var(--sui-*)` map derived from the `Theme` shape; `makeStaticStyles` for a global rule. Built by tsdown; `@griffel/react` external. |
| `button-v2/` (2.0.0) | Same component with every definition **reordered** (the "renumbering") and values **changed** (radius 3→6 px, padding 8/12→12/20 px, weight 500→600, transition 80→120 ms, + uppercase/letter-spacing), and `@griffel/react` **bundled** so the page runs two Griffel runtime copies — the worst case. |
| `app/` | Consumer that installs both versions from their **packed tarballs** (`griffel-button-v1`/`-v2` aliases, committed under `app/tarballs/`). Renders the full matrix under the default and the dark theme. `tests/two-versions.test.mjs` = Playwright on the system Chrome; `tests/ssr-and-two-copies.test.tsx` = Node SSR + cross-copy tests. `vite.extract.config.ts` additionally builds the app with `@griffel/vite-plugin`. |
| `typecheck/` | 17 wrong usages that must fail `tsc` (self-verifying via `@ts-expect-error`), 3 documented gaps that compile. |
| `bench/` | `bench.mjs` → `results/metrics.json`. |

### 2.1 Proof: two versions on one page, real browser (Chrome 148.0.7778.96, `app/results/two-versions.json`, screenshot `app/results/two-versions.png`)

Runtime build (libraries and app both through the Griffel runtime — the Studio-like configuration):

- **189 Griffel rules on the page, 114 distinct selectors, 0 selectors with two meanings.** The 75 extra rules are byte-identical duplicates inserted by the second runtime copy.
- **2 runtime copies** (10 `<style data-make-styles-bucket>` elements), bucket order global: `r r d(p-1) d(p-1) d d i i m m`.
- 78 atomic classes on v1 buttons, 76 on v2: **68 shared** (same declaration ⇒ same class ⇒ same rule), 7 v1-only and 8 v2-only (the changed declarations; 3 further v1-only classes come from the consumer override).
- All **78 buttons** compute their own version's values: `border-radius` 3 px vs 6 px, `padding` 8/12 vs 12/20 px, `font-weight` 500 vs 600, `text-transform` none vs uppercase, `transition-duration` 0.08 s vs 0.12 s — for every tone × mode, selected, disabled, fill, dynamic width.
- Theme: `primary/default` is `rgb(34,118,252)` in `defaultTheme` and `rgb(77,141,255)` in `darkTheme` for **both** versions (shared `--sui-*` contract); `bleed` is transparent in both.
- Dynamic `width={200}` → 200 px in both; `width="fill"` stretches in both.
- Hover (`@media (hover: hover)`, bucket `h`/`m`) changes the background for both copies.
- Consumer `className` override (`font-size: 14px`, `font-weight: 600`) wins via `mergeClasses` (atomic conflict resolution by property).
- No console errors.

Node tests (`vitest`, 5 passing): SSR `renderToStyleElements()` emits a rule for every class on a rendered button, including `r`, `d` and `m` buckets and the inline `--btn-width`; a library bundling its own Griffel copy ignores the app's `RendererProvider` (expected); `v1.mergeClasses(v1Classes, v2Classes)` drops v1's radius class in favour of v2's and vice-versa with `v2.mergeClasses` (lookup table shared across copies); identical declarations produce identical class names in both copies (`rjb6s26` and > 20 atomic classes).

**Mixed-mode hazard, reproduced on purpose** (`dist-extract`: app CSS extracted by `@griffel/vite-plugin`, libraries still runtime-injected): still 0 collisions, but the `<link>` precedes every runtime bucket, so the library reset (`font: inherit`, bucket `r`) beats the app's extracted `font-size: 14px` (bucket `d`) even though `mergeClasses` deduped correctly (override renders 16 px). Griffel only orders the buckets it controls — **one delivery mode per page**. Compiled documents the same class of problem.

---

## 3. Metrics (`bench/results/metrics.json`, Node v22.14, this VM)

### Compile time

| Measurement | Result |
| --- | --- |
| `@griffel/transform` on `Button.tsx` (4 style calls + 1 reset, imports `tokens` → VM evaluation path), **cold** = fresh process, first call incl. loading the oxc binding | **25.0 ms** (242 ms process total) |
| same, **warm** (median of 50 in-process calls) | **4.1 ms** (min 3.3 ms) |
| `tsdown` build of button v1 (clean `dist`, fresh process, incl. d.ts emit with TS 7) | 585 ms wall-clock |
| same with `dist` present (tsdown has no persistent cache; only the OS cache is warm) | 594 ms |
| `tsdown` build of v2 incl. bundling the Griffel runtime | 769 ms |
| `vite build` of the app, runtime mode (no plugin) | 480 ms |
| `vite build` of the app with `@griffel/vite-plugin` | 603 ms — plugin stats: **32 files, 31 ms total (AST 8 ms / VM 22 ms), 0.98 ms per file, 96.9 % AST-evaluated** |

The evaluator takes the fast AST path for literal style objects and falls back to `node:vm` + shaker for non-literal ones (imports such as `tokens`, helper calls). `collectPerfIssues` reports CJS modules / `export *` barrels that slow the VM path.

### CSS size

| Output | raw | gzip | brotli | rules |
| --- | --- | --- | --- | --- |
| button v1 `dist/styles.css` | 5 120 B | 1 445 B | 1 205 B | 86 |
| button v2 `dist/styles.css` | 5 171 B | 1 481 B | 1 244 B | 88 |
| v1 ∪ v2 deduplicated (what two versions on one page insert) | 5 468 B | **1 557 B** | 1 304 B | 95 |

A second version costs 112 B gzip — atomic CSS grows with distinct declarations, not with components or versions. (Vanilla-extract output grows per class, and two versions ship two full copies.)

### Runtime JS (rolldown, minified, production, `react`/`react-dom` external)

| Runtime | raw | gzip | brotli |
| --- | --- | --- | --- |
| `@griffel/react` — full (runtime `makeStyles`: stylis, rtl-css-js, hashing) | 39 394 B | 13 424 B | 12 147 B |
| `@griffel/react` — what precompiled (`__styles`) libraries need (`__styles`, `__resetStyles`, `__staticStyles`, `mergeClasses`, renderer, providers, `renderToStyleElements`) | 11 000 B | **4 631 B** | 4 257 B |
| `@griffel/react` — extracted mode (`__css`, no DOM insertion) | 2 516 B | **1 167 B** | 1 044 B |
| `@compiled/react/runtime` (`ax`, `CC`/`CS`) | 3 798 B | 1 775 B | 1 577 B |
| styled-components 6 (today's `@sanity/ui` runtime; `react-is` and `stylis` external, so the real cost is higher) | 24 793 B | 9 529 B | 8 715 B |
| `@vanilla-extract/dynamic` (today, inline vars) | 1 142 B | 628 B | 526 B |

Library output: button v1 `dist/index.js` 14.2 kB raw / 4.8 kB gzip (CSS strings included); v2 with the bundled runtime 43.9 kB / 12.0 kB.

### Type safety (`typecheck/`, TypeScript 7.0.2)

`tsc` passes with every `@ts-expect-error` triggered — i.e. each of these is a compile error: `tokens['tone-primray-bg']`, `tokens['focus-ring']` (names derived from the `Theme` shape), `tone="danger"`, `mode="outline"`, `width="100%"`, `makeStyles<ButtonTone>({…})` missing a tone, `classes.rooot`, `paddingTop: 8` (numbers other than 0 rejected — units mandatory, `GriffelStylesCSSValue = string | 0`), `display: true`, `position: 'absolutely'` (closed keyword sets are strict), `borderColor: 'red'` (unsupported shorthand typed `never`), `':hover': 'color: red'`, an incomplete `Theme`, numeric radius leaves, `<ThemeProvider />` without theme. **Not caught** (documented in `not-caught.ts`): misspelled property names (`colr`) because `GriffelStyle` has a string index signature for nested selectors; most values accept any string (`display: 'flexx'`); a raw `var(--sui-space-99)` string bypasses the tokens object. Lint-time help: `@griffel/eslint-plugin` (`no-shorthands`, `no-deprecated-shorthands`, `hook-naming`, `top-level-styles`, `styles-file`, …) and runtime warnings for unsupported properties.

---

## 4. Toolchain fit, migration, ecosystem, risks

### 4.1 Toolchain

| Tool | Griffel | Evidence |
| --- | --- | --- |
| **Vite 8** | Official `@griffel/vite-plugin` 1.0.1 (peer `vite ^8`, requires `@griffel/react ≥ 1.7.7`): `enforce: 'pre'` transform + `generateBundle` sorting into one stylesheet; build only — dev server uses the runtime. Processes `node_modules` too (dependencies shipping *plain* `makeStyles` calls get extracted), but does **not** handle precompiled `__styles` (only `makeStyles`/`makeResetStyles`/`makeStaticStyles` are in `functionsToTransform`). | Used in `app/vite.extract.config.ts`; 32 files / 31 ms. |
| **rolldown / tsdown** | No official plugin, but `@griffel/transform` (oxc-parser + oxc-walker + magic-string, no Babel) and `createResolverFactory` are public, so the tsdown plugin is ~130 lines of glue — versus the four vendored `@sanity/vanilla-extract-*` packages in pkg-utils. Only `transform` + `generateBundle` hooks, no Vite-specific hooks. `.d.ts` files must be excluded from the transform (tsdown's declaration pass runs plugin transforms). | `tsdown-plugin/`, builds v1 in 585 ms wall-clock. |
| **webpack / Rspack** | `@griffel/webpack-plugin` (loader + extraction, Rspack/Rsbuild supported), legacy `@griffel/webpack-loader` (Babel preset) + `@griffel/webpack-extraction-plugin`. | README in repo. |
| **Next.js (www)** | Runtime SSR: documented App Router registry (`useServerInsertedHTML` + `renderToStyleElements`, flush once) — the same shape as the styled-components registry www would need today. Static extraction: `@griffel/next-extraction-plugin` 0.1.15 is **webpack-only**; nothing for Turbopack. | `apps/website/docs/react/guides/ssr-usage.md`. |
| **React 19 / RSC** | Peer `react >=16.14 <20`; `useInsertionEffect` when available. Every module is `'use client'` (`react/src/index.ts`), including `__css` (it reads the text-direction context) — components using Griffel are client components, exactly like with styled-components now. `@griffel/core` is framework-free and could style a server component with precomputed classes. | Source. |
| **Studio module CDN** | In inject mode the package has **no CSS asset**: the JS carries the rules and inserts them. The module CDN serves JS only; nothing to map, no `styles.css` to forget. Today `packages/sanity/src/_exports/index.ts` imports both `ui5/styles.css` (5.0.0-alpha.14) and `@sanity/ui/styles.css` — two versions on one page already, and the exact pattern this proof covers. If a `styles.css` is still wanted (e.g. for strict CSP without `insertRule`), `mode: 'extract'` produces today's contract. | Prototype + sanity repo. |

Dev experience: `@griffel/devtools` (browser extension showing per-element resolved styles), `@griffel/jest-serializer`, `@griffel/postcss-syntax` (Stylelint), `@griffel/eslint-plugin`.

### 4.2 Migration effort

Inventory (from the clones at HEAD):

| Repo | vanilla-extract | styled-components | `@sanity/ui` importers |
| --- | --- | --- | --- |
| sanity-io/ui (`packages/ui`) | 27 `.css.ts`: 67 `style()`, 17 `globalStyle()`, 4 `keyframes()`, 1 `createVar()`, 1 `assignInlineVars` | 53 files, 72 `styled(...)`, 38 `` css` `` | — |
| sanity-io/sanity | 122 `.css.ts` (114 in `packages/sanity`): 211 `style()`, 40 `globalStyle()`, 2 `styleVariants`, 18 `createVar`, 1 `keyframes`, 5 `assignInlineVars`, 34 `selectors:` blocks, 3 `@media`, 2 `@supports`, 1 `@container` | 275 files, 559 `styled(...)`, 191 `` css` `` | 945 files |
| sanity-io/plugins | 26 `.css.ts`: 97 `style()`, 9 `globalStyle()`, 5 `styleVariants`, 40 `createVar`, 7 `keyframes`, 11 `assignInlineVars` | 63 files, 99 `styled(...)`, 31 `` css` `` | 384 files |

API mapping vanilla-extract → Griffel:

| vanilla-extract | Griffel | Friction |
| --- | --- | --- |
| `style({...})` | a `makeStyles` slot (atomic) or `makeResetStyles` for structural bases | `makeResetStyles` classes must not be combined on one element (dev warning). |
| `selectors: {'&:hover', '&[data-x]', '& > span', '&::after'}` | `':hover'`, `'&[data-x]'`, `'& > span'`, `'::after'` (keys must start with `&`, `:`, `[` or `>` — `isNestedSelector.ts`) | **`'.parent &'` is not supported** → `':is(.parent *)'`, a CSS variable set by the parent, or `makeStaticStyles`. **`'&&'` specificity bumps** (23 in sanity) have no equivalent — conflicts are resolved by `mergeClasses`, not specificity. |
| `globalStyle(sel, {...})` | `makeStaticStyles({[sel]: {...}})` or a CSS string | Object form does not nest (at-rules need the string form); it is a **hook** that must run in a component, not a side-effect import. |
| `styleVariants` | slots of one `makeStyles`; `makeStyles<Union>` enforces completeness | — |
| `createVar()` / `assignInlineVars` / `fallbackVar` | plain `--name` strings, inline `style`, `var(--x, fallback)` | Same model, less tooling (the prototype's `createThemeVars`/`tokens` show a typed version). |
| `keyframes()` | `animationName: {from, to}` objects | — |
| `@media`, `@supports`, `@layer`, `@container`, `createContainer` | nested `'@media …'`, `'@supports …'`, `'@layer …'`, `'@container …'` keys | — |
| `@sanity/ui/styles.css` import | nothing (inject) or the same import (extract) | Mixed modes on one page are unsafe (§2.1). |

styled-components → Griffel is the bulk of the work and is identical for every zero-runtime candidate: props-driven CSS (`$tone`, `$mode`, theme interpolations) becomes enumerated variants + CSS variables, as the Button prototype does for tone × mode. Griffel-specific additions: every `className` concatenation must go through `mergeClasses` (replace `clsx`; otherwise two atomic classes for one property resolve by bucket order, not intent); shorthands `borderColor`/`borderStyle`/`borderWidth` need `shorthands.*()`; snapshot tests need `@griffel/jest-serializer`.

Effort by repo (components/subsystems, not calendar time):

- **sanity-io/ui** — the whole styling layer: 27 `.css.ts` files (mechanical, 1–2 h each class of pattern) plus 53 styled-components files which carry the theme logic (`buttonColorStyles`, `_cardColorStyle`, `focusRingStyle`, responsive props) — that is the real work: redesign the theme as CSS variables (already partly done: `--card-bg-color`, `--card-fg-color`) and enumerate variants. Build: replace `vanillaExtract` in `@sanity/tsdown-config` with a Griffel tsdown plugin like the prototype's (small), keep `styles.css` as an optional extract output during the transition. Consumers get a semver-major: no `styles.css` import (or keep the conditional export as a no-op for one major).
- **sanity-io/sanity** — 122 `.css.ts` + 275 styled-components files; Vite build uses the official plugin (or no plugin at all — runtime mode works unchanged); the module CDN needs nothing. Must pick one delivery mode per Studio page (runtime everywhere is the zero-config option). `ui5`/`@sanity/ui` dual-version period becomes safe by construction.
- **sanity-io/plugins** — 26 `.css.ts` + 63 styled-components files; plugins stop importing any CSS; their pkg-utils builds get the same tsdown plugin. Third-party plugins that keep styled-components continue to work side by side.
- **pkg-utils** — retire the four `@sanity/vanilla-extract-*` forks; replace with one thin plugin over `@griffel/transform` (no vendored evaluator — the official package is the evaluator).

### 4.3 Ecosystem health (2026-10-13)

| | Griffel | Compiled |
| --- | --- | --- |
| Owner / flagship consumer | Microsoft; Fluent UI v9 (`@fluentui/react-components` 407 k downloads/week) | Atlassian; Atlassian Design System |
| npm downloads/week | `@griffel/react` 546 682 | `@compiled/react` 575 997 |
| GitHub | 1 281 ★, 60 open issues, 31 open PRs, 61 commits in 90 days, pushed 2026-10-09, MIT | 2 054 ★, 161 open issues, 42 open PRs, 28 commits in 90 days, pushed 2026-10-13, Apache-2.0 |
| Releases | 63 releases of `@griffel/react`, last 1.7.8 on 2026-09-23; monthly cadence | 162 releases; 0.22 → 1.0 → 2.0 between June and August 2026 |
| Maintainers | one dominant maintainer (layershifter: 445 commits; next humans 28 and 27) | several Atlassian engineers (Madou 173, itsdouges 150, JakeLane 113) + bots |
| Recent direction | oxc-based transform (3.x), Vite 8 plugin (1.0), `@container`/`@scope` support, Rspack | base-62 hash migration flag, Vite plugin 2.x, SWC transformer in Atlaspack |

(For scale: `@vanilla-extract/css` 2.6 M/week, 10.4 k ★, 17 commits/90 days; styled-components 11.1 M/week.)

### 4.4 Risks

1. **Hash space is 32-bit.** Structural guarantee is "same name ⇔ same declaration" up to a murmur2 collision; p ≈ n²/2³³ per page. Mitigations: build-time uniqueness check per package (in the prototype plugin), an optional cross-package check in Studio's build (collect all rules, assert one meaning per class), `classNameHashSalt` per major if ever needed. This is a property of every hashing candidate; the question is whether the hash is truncated — Compiled's is.
2. **Delivery modes must not be mixed on one page** (demonstrated). Studio: runtime everywhere (zero config) or everything extracted (requires libraries to ship plain `makeStyles` calls or an extraction plugin that understands `__styles`; the Vite plugin does not today — the webpack plugin does).
3. **Two runtime copies** share hashing and merge tables but not React providers (SSR, RTL, custom renderer options) — keep `@griffel/react` a single-version dependency where SSR matters (www).
4. **`mergeClasses` discipline**: atomic classes concatenated with `clsx` lose conflict resolution. Lint rule or wrapper needed; also affects consumers who override `@sanity/ui` classes.
5. **No runtime styles / no parent-context selectors / no `&&`**; `makeStaticStyles` does not nest. Known migration friction, not blockers.
6. **Griffel's AOT depends on evaluating style modules** (`node:vm` + shaker when not literal). Importing heavy modules (e.g. `@sanity/color`) into `.css`-like files slows the transform; keep tokens as literal objects. Measured 4 ms warm for a tokens-importing file.
7. **Maintainer concentration** (one primary maintainer), offset by Microsoft 365's dependency on it.
8. **Debuggability**: long atomic class lists in the DOM (78 classes per button incl. the `___` sequence hash). `@griffel/devtools` and `data-ui` attributes mitigate; snapshot tests change.
9. **Compiled-specific** (why it is not recommended): truncated hashes (default colliding, opt-in still 4-char value hash, breaking for published packages), Babel + PostCSS compiler, no rolldown/tsdown path, module-scoped bucket cache, 161 open issues.

---

## Appendix — reproduce

```sh
git fetch origin cody/css-eval-griffel-f4cc && git checkout cody/css-eval-griffel-f4cc
cd prototypes/griffel
pnpm install && pnpm build && pnpm test && pnpm typecheck && pnpm bench
```

Artifacts on the branch: `app/results/two-versions.json`, `app/results/two-versions.png`, `bench/results/metrics.json`. Source citations refer to microsoft/griffel `8a7b9d5` and atlassian-labs/compiled `fec8045`.
