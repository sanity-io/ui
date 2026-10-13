# CSS eval — vanilla-extract (baseline, upstream features only, content-safe names)

Framework under evaluation: **vanilla-extract 1.21.3, kept as is, with class names made content-safe through its public `identifiers` option** — no fork of `@vanilla-extract/*`, no change to the `@sanity/vanilla-extract-*` plugins in pkg-utils. Rule-content hashing is assessed separately as an upstream contribution (patch sketch, measured through `pnpm patch`).

Branch: `cody/css-eval-vanilla-extract-f105` (the required `-f105` suffix applies to every branch of this agent). Prototype: `prototypes/vanilla-extract/` plus the real `@sanity/ui` migration in `packages/ui/tsdown.config.mts`. No PR opened.

## TL;DR

- vanilla-extract names identifiers `murmur2(packageName + filePath)` + a per-file counter. Nothing in that input changes between releases, so reordering `style()` calls renumbers names: the SAPP-4639 failure is structural, not a short-hash accident. Verified from source and from the published tarballs: `@sanity/ui` 4.4.2 and 4.4.4 share 64 of 64/72 names and **8 of them mean different rules**.
- Upstream's own answer to "several versions of one library on a page" is the `identifiers` function (PR #1160, merged 2023 for exactly that scenario). A 65-line function that salts the per-file prefix with `name@version` and keeps the counter makes every release's names unique with **zero fork changes**: 0 shared names between the prototype's two releases, 0 between the rebuilt 4.4.4 and the published 4.4.2 *and* 4.4.4, same compile time, +0.3 % CSS gzip. Proven in a browser with both releases on one page.
- True *rule-content* hashing is impossible with the upstream API (the identifier function never sees the rule). It needs a +25/−9-line additive change in `@vanilla-extract/css` (`content` argument), prototyped and measured here: it deduplicates identical rules across releases (3 of 38 in the prototype; would be 56 of 64 for the real 4.4.2/4.4.4 pair) at +7 % CSS gzip. Worth proposing upstream, not worth blocking on: upstream has left a comparable identifier-function PR (#1229) open since 2023.
- Verdict: this path fully removes the incident class with the least change of any option (config-level, no new framework, no styled-components churn). What it does **not** buy is content-addressed deduplication or any relief from the structural reason the forks exist (rolldown/tsdown support, ~3.4k LOC in pkg-utils).

## 1. How class names are generated (from source) and when they collide

`@vanilla-extract/css@1.21.3`, `packages/css/src/identifier.ts` (identical in the installed `dist/vanilla-extract-css.esm.js` lines 131–171):

```ts
const refCount = getAndIncrementRefCounter().toString(36);          // per-file counter
const { filePath, packageName } = getFileScope();
const fileScopeHash = hash(packageName ? `${packageName}${filePath}` : filePath); // @emotion/hash = murmur2, 32-bit, base36
let identifier = `${fileScopeHash}${refCount}`;
…
if (typeof identOption === 'function') {
  identifier = identOption({ hash: identifier, debugId, filePath, packageName });   // ← no rule content
  if (!identifier.match(/^[A-Z_][0-9A-Z_-]+$/i)) throw …
}
```

`packages/css/src/fileScope.ts`: `setFileScope(filePath, packageName)` resets `refCounter = 0`; the integration wraps every `.css.ts` module with it. `packages/css/src/style.ts`: `const className = generateIdentifier(debugId); … appendCss({type:'local', selector: className, rule}, …)` — the name is fixed before the rule reaches the adapter. The fork does the same wrapping without a version: `@sanity/vanilla-extract-integration` `addFileScope` emits `setFileScope("<root-relative path>", "<package.json name>")`.

So the name is **neither content-hashed, atomic nor deduplicated**: it is (package, file, declaration-order index). Consequences, all verified:

| situation | default names | version-salted (`identifiers`) | content (upstream patch) |
| --- | --- | --- | --- |
| two copies of the same version | same names, same rules — harmless duplicate | same | same |
| two versions, styles reordered/changed (the incident) | **same names, different rules** — published 4.4.2 vs 4.4.4: 64 shared, 8 different (`_2mi48t0` = loading overlay → Button root; 7 Avatar classes) | 0 shared names (rebuilt 4.4.4 vs published 4.4.2: 0; prototype 1.0.0 vs 2.0.0: 0 of 39/41) | shared only when rules are byte-identical (prototype: 3 shared, 3 identical, 0 conflicting) |
| same version, different styles (unreleased/CDN preview reusing a version) | collides | collides unless `version+module` mode (hashes the module source too) | safe |
| residual collision | structural | per-file prefix is 7 base36 chars ≈ 36 bits; two files across releases colliding on a prefix *and* a counter ≈ N_files²/2³⁷ (~7·10⁻⁹ for 30-file packages) | ≈ 41-bit content hash per identifier |

"Zero chance" is unattainable for any hash-based scheme (StyleX/Panda included); what this path does is remove the *systematic* failure mode entirely and leave only hash collisions.

Why the salted mode keeps upstream's `prefix + counter` shape: the first prototype hashed every identifier independently and cost **+24 % CSS gzip** (names in a module no longer shared a prefix). Keeping a fixed-length per-file prefix (`sha256(name@version \0 path)` → base36) plus upstream's counter brought that back to +0.3 %. The counter is recovered by stripping upstream's `murmur2(packageName + filePath)` prefix from `hash` (same `@emotion/hash` upstream uses); if that layout ever changes the function keeps the whole `hash` (longer, still unique).

## 2. Prototype (branch `cody/css-eval-vanilla-extract-f105`)

`prototypes/vanilla-extract/` — its own pnpm workspace so two releases of one package name can coexist:

- `lib-v1/`, `lib-v2/`: `@css-eval/ve-button` 1.0.0 and 2.0.0. A `@sanity/ui`-style `Button` with `tone` (default/primary/positive/caution/critical) × `mode` (default/ghost/bleed) via `@vanilla-extract/recipes` incl. compound variants; a theme contract (`createThemeContract`, light/dark `createTheme`) whose tokens are CSS variables; a dynamic `accent` variable set with `@vanilla-extract/dynamic`'s `assignInlineVars`; a spinner `keyframes`. 2.0.0 declares the root before the overlay (what sanity-io/ui#3169 did in 4.4.3/4.4.4), adds a style, changes tokens and inserts a token in the contract.
- Built with the real toolchain (tsdown + `@sanity/tsdown-config` → `@sanity/vanilla-extract-tsdown-plugin`), `VE_IDENTIFIERS=default|version|version+module|content` → `<lib>/dist/<mode>/{index.js,index.d.ts,styles.css}`; consumers import `@css-eval/ve-button/styles.css`.
- `consumer/`: Vite + React 19 page loading **both** releases' built CSS (1.0.0 first) and JS. `tests/collision.spec.ts` (Playwright, Chromium) samples computed styles and the class names in each release's DOM:

| mode | shared class names in the two DOMs | rendering |
| --- | ---: | --- |
| `default` | 12 | **both broken**: 1.0.0 primary button white instead of blue, its dark theme caution-orange, its loading overlay no longer `absolute`; 2.0.0 primary button animates with 1.0.0's spinner keyframes |
| `version` | 0 | both exactly as built (blue/3px vs purple/6px, overlay absolute, magenta accent ring) |
| `version+module` | 0 | same |
| `content` (patched) | 2 (overlay, spinner — byte-identical rules) | both exactly as built |

Screenshots: `/opt/cursor/artifacts/ve-eval-{default,version,version+module,content}.png` (also `results/browser-*.png` on the branch). CSS-level analysis (`scripts/compare-css.mjs` → `results/compare.md`): default 36 shared / 34 different rules; version and version+module 0; content 3 shared / 0 different.

- `scripts/build-upstream-vite.mjs`: the same libraries through the **upstream** `@vanilla-extract/vite-plugin` 5.2.6 (Vite 8 library mode) with the same function → identifier sets **identical** to the fork/tsdown build in all four modes (the naming is toolchain-independent). `scripts/build-fork-vite.mjs`: `@sanity/vanilla-extract-vite-plugin` (the CDN-bundle plugin) applies custom functions to every identifier too (recipe-free module; see risks for the recipes limitation).
- Real-world: `packages/ui/tsdown.config.mts` now passes `identifiers: versionedIdentifiers(readPackageIdentity(…))` (8 lines + `packages/ui/scripts/versionedIdentifiers.ts`, 65 lines, + `@emotion/hash` devDependency). `node scripts/compare-files.mjs` on the outputs: baseline build ≡ published 4.4.4 (72/72 identical — tool sanity check); salted build vs baseline: 1 shared name (`--switch-box-shadow`, an authored global name, correctly unchanged); salted build vs published 4.4.2: 0 shared.
- `upstream-content-hash.patch` (+25/−9 in `packages/css/src/{identifier,style,theme,types}.ts` + docs/changeset): passes `content: JSON.stringify(rule | keyframes | fontFace | [contract, tokens])` to custom identifier functions. Applied to the installed package via `pnpm patch` (`patches/`) to build the `content` mode.

## 3. Metrics

Compile time (Node 22.14, 5 runs; `results/metrics.md`):

| build | default | version | version+module | content |
| --- | ---: | ---: | ---: | ---: |
| prototype lib, tsdown wall (cold / warm median) | 330 / 338 ms | 327 / 324 ms | 338 / 331 ms | 329 / 325 ms |
| prototype lib, tsdown-reported build | 170 ms | 162 ms | 168 ms | 168 ms |
| prototype lib, upstream vite-plugin lib build (warm) | ~125 ms | ~120 ms | ~130 ms | ~120 ms |
| `@sanity/ui` 4.4.4 full `pnpm build` (27 `.css.ts`, 72 identifiers, incl. dts), wall / reported | 1.58–1.63 s / 924–1016 ms | 1.39–1.50 s / 815–886 ms | — | — |

The identifier function is a sha256 per *file* and a murmur2 per identifier: unmeasurable against build noise. Cold vs warm differ only by OS file cache; tsdown keeps no persistent cache (Vite dev gets upstream's compiler cache and HMR; unchanged by this).

Output size:

| artifact | raw | gzip | brotli |
| --- | ---: | ---: | ---: |
| prototype 1.0.0 `styles.css`, default | 2,976 B | 890 B | 715 B |
| … version | 3,058 B (+2.8 %) | 893 B (+0.3 %) | 714 B |
| … version+module | 3,058 B | 891 B | 717 B |
| … content | 3,046 B | 953 B (+7 %) | 783 B (+9.5 %) |
| `@sanity/ui` 4.4.4 `styles.css`, default (= published) | 10,588 B | 2,342 B | 2,063 B |
| … version-salted | 10,630 B (+0.4 %) | 2,362 B (+0.9 %) | 2,082 B (+0.9 %) |
| prototype `index.js` default → version | 2,464 → 2,496 B | 931 → 934 B | — |

Runtime JS: `@vanilla-extract/css` is build-time only (0 B). Everything vanilla-extract can put in the browser — `@vanilla-extract/dynamic` (`assignInlineVars`, `setElementVars`) + `@vanilla-extract/recipes/createRuntimeFn` — minifies to **4,064 B raw / 1,562 B gzip / 1,383 B brotli**; `@sanity/ui` 4.x ships only `dynamic` (~0.6 KB gzip). No runtime style injection, no hydration work, no React dependency.

Type safety (`typecheck/negative.ts`, each line a required `tsc` error — removing a directive fails the run): wrong variant value (`tone: 'brand'`) ✔, unknown variant group ✔, unknown token path (`vars.color.brand.bg`, `vars.radius.nope`) ✔, misspelled property name ✔, wrong keyword value for closed unions (`position: 'fixedd'`) ✔, theme missing a contract token ✔, `assignInlineVars(contract, …)` with an unknown token ✔, component props derived from `RecipeVariants` ✔. Gaps: open-ended csstype properties accept `(string & {})` (`display: 'flexx'` compiles); the string form `assignInlineVars({'--x': …})` accepts any key; generated names are plain `string`.

## 4. Toolchain fit, migration, ecosystem

Toolchain:

| tool | status | notes |
| --- | --- | --- |
| Vite 8 | ✔ upstream `@vanilla-extract/vite-plugin` 5.2.6 (`peer vite ^5–^8`) and the fork `@sanity/vanilla-extract-vite-plugin`; both accept `identifiers` (verified) | upstream compiles recipes; the fork does not (below) |
| rolldown / tsdown | **fork only** (`@sanity/vanilla-extract-{integration,rolldown-plugin,tsdown-plugin}`, 1,269 + 729 + 171 LOC) | upstream has no rolldown plugin; its `@vanilla-extract/integration` compiles via esbuild + babel. This is why the forks exist and nothing here changes it |
| Next.js (www) | `@vanilla-extract/next-plugin` 2.5.2 (webpack) ✔; `@vanilla-extract/turbopack-plugin` 0.1.4 (experimental, `@swc/core`) | `identifiers` option available in both |
| React 19 / RSC | ✔ static class strings; `assignInlineVars`/`createRuntimeFn` are pure functions, usable in server components; `'use client'` not required | |
| library publishing | ✔ already the `@sanity/ui/styles.css` conditional-export pattern; names are baked into both JS and CSS at build | version-salted names make a JS/CSS *version mismatch* fail-safe: unstyled instead of mis-styled (content-hashed: partially styled) |
| module CDN (Studio) | `package.bundle.ts` already receives `version`; `vanillaExtractPlugin({identifiers: versionedIdentifiers({name: 'sanity', version})})` is the whole change | the race in SAPP-4639 then degrades to missing styles for the mismatch window |

Migration effort (config-only; no `.css.ts` or component changes anywhere):

| repo | change | notes |
| --- | --- | --- |
| sanity-io/ui (4.x) | done on the branch: `tsdown.config.mts` +8 lines, 65-line helper, 1 devDependency; one release | 4.4.3/4.4.4 keep colliding with ≤4.4.2 forever — consider deprecating them. The UI 5 alpha (`v5-alpha` branch, `@sanity/ui@5.0.0-alpha.14`) has already left vanilla-extract for postcss with `sui-Button-<sha256(version)[:6]>` names — the same version-salt strategy, so nothing to do there |
| sanity-io/sanity | `packages/sanity/tsdown.config.ts`, `packages/@sanity/vision/tsdown.config.ts` (or once in `@repo/tsdown.config`), `packages/@repo/package.bundle/src/package.bundle.ts`: ~10 lines across 3 files; 122 `.css.ts` files untouched; dev studios (`sanity.cli.ts`) stay on `debug` names | `sanity` already ships `@sanity/ui@4.4.4` and `ui5` side by side (`pnpm-workspace.yaml` catalog) — a two-versions page is its normal state today |
| sanity-io/plugins | 5 plugins with `vanillaExtract: true` through `@sanity/tsdown-config`: 0 lines if the helper becomes the config default, else 1 line each; `@sanity/plugin-kit` templates | |
| pkg-utils forks | **0 lines** in `@sanity/vanilla-extract-*`. The helper belongs in `@sanity/tsdown-config` (Sanity-owned config, already resolves the package name) as a default; pkg-utils PRs #3617/#3618 (salting inside the fork's `transform()`: 48 source + 624 test lines, both open) become unnecessary — or a belt-and-braces default for the built-in `short` mode | |

Fork drift summary: the naming fix needs none. The drift that remains is the existing one (rolldown/tsdown support, ~3.4k LOC), and it is independent of which naming scheme is chosen. Content hashing adds drift only until the +25/−9 upstream change lands (carried as a `pnpm patch` against `@vanilla-extract/css`, not against the plugins).

Ecosystem health: `@vanilla-extract/css` 2.63 M downloads/week (vs `@stylexjs/stylex` 1.96 M, `@pandacss/dev` 0.54 M, `next-yak` 14 k), 10.4 k stars, 73 open issues, releases roughly monthly (css 1.21.3 on 2026-10-08), 101 commits in the last year — 53 by one maintainer (askoufis) plus bots. Identifier-function PRs stall: #1229 "Debug id for custom identifiers" open since 2023-11, #1446 since 2024-07. Mark Dalgleish and Matt Jones (original authors) are no longer active.

Risks and caveats:

- Dev mode: a custom function replaces upstream's readable `debug` names and upstream does not inject debug ids for custom functions (#1229). Salt production builds only (the Vite plugin's default `mode === 'production' ? fn : 'debug'`); library builds are always production.
- Builds that reuse a version with changed styles (CDN previews setting only `PKG_VERSION`, local links): use the `version+module` mode or unique prerelease versions.
- Every release renames every class: DOM snapshots containing class names churn per release; nobody should target generated names from outside (already true).
- `@sanity/vanilla-extract-vite-plugin` cannot compile modules that use `@vanilla-extract/recipes` (its compiler resolves `@vanilla-extract/css` as ESM while the externalized `recipes` loads the CJS build — two `fileScope` instances; upstream's plugin has no such issue). Pre-existing, unrelated to naming, irrelevant while `sanity`/`plugins` use no recipes — but a concrete example of fork divergence.
- Upstream acceptance of the `content` argument is uncertain (small, additive, but review latency is years for this area); content-hashed names also cost ~7 % CSS gzip and only deduplicate rules that reference no generated variables (3 of 38 in the prototype's contract-based theme; 56 of 64 in `@sanity/ui` 4.x, whose rules use authored `--card-*` variables).
- Residual hash-collision probability is non-zero (≈ 2⁻³⁷ per file pair); a longer `prefixLength` buys more bits for ~1 byte per occurrence.

## 5. Scores (1–10)

| objective | score | why |
| --- | ---: | --- |
| 1. Safe generated CSS (no collisions across versions/copies) | **8** | Structural collisions eliminated with upstream features only; only hash collisions remain. Not content-hashed: identical rules are not deduplicated across versions (bytes, not correctness). 9 with the upstream `content` patch |
| 2. Type-safe authoring (tokens, variants) | **8** | Token paths, variant values/groups, property names, closed keyword unions and theme completeness all fail `tsc`; open-ended property values and string-keyed vars do not |
| 3. Fast compiler, fits Vite / rolldown / tsdown / Next.js / module CDN | **7** | 160–180 ms for the library, +0 ms for salting; Vite/Next upstream; rolldown/tsdown only through the ~3.4k-LOC forks, unchanged by this work |
| React 19 / RSC | 9 | zero-runtime static classes; dynamic vars via pure functions |
| Zero/tiny runtime | 10 | 0 B unless `dynamic`/`recipes` are used (≤ 1.6 KB gzip) |
| Publishing library CSS to npm consumers | 9 | existing `styles.css` export pattern; names baked identically into JS and CSS |
| Theming with CSS variables | 8 | contracts + `createTheme`; variables version-scoped too (or `createGlobalThemeContract` for intentionally shared names) |
| Dynamic styles | 6 | inline CSS variables only; variants must be known at build time |
| Migration cost from current state | 10 | config-level; no component, `.css.ts` or styled-components changes; `@sanity/ui` done in 73 lines |
| Ecosystem health | 6 | largest user base of the candidates, steady releases, but effectively one maintainer and multi-year PR latency in exactly this area |
| Bundle size | 9 | +0.4 % raw / +0.9 % gzip on `@sanity/ui`'s CSS; JS unchanged |

Recommendation for this baseline: adopt the `identifiers` salt now as a default in `@sanity/tsdown-config` (and the CDN bundle config), release `@sanity/ui` 4.x, `sanity` and the plugins once, deprecate `@sanity/ui` 4.4.3/4.4.4, and propose the `content` argument upstream as a follow-up rather than a prerequisite. This closes the incident class without a framework change; the open question for the judge is whether the remaining fork cost (rolldown/tsdown integration) and the lack of content-addressing justify a framework move at all.

## Evidence index

- Branch `cody/css-eval-vanilla-extract-f105`: `prototypes/vanilla-extract/` (README, libs, consumer, tests, scripts, `results/*.md|json|png`, `upstream-content-hash.patch`, `patches/`), `packages/ui/tsdown.config.mts`, `packages/ui/scripts/versionedIdentifiers.ts`.
- Artifacts: `/opt/cursor/artifacts/ve-eval-{default,version,version+module,content}.png`.
- Sources read: `@vanilla-extract/css@1.21.3` dist and upstream `packages/css/src/{identifier,fileScope,style,theme,types}.ts`, `@sanity/vanilla-extract-{integration,rolldown-plugin,tsdown-plugin,vite-plugin}` dist + pkg-utils source, pkg-utils PRs #3617/#3618, vanilla-extract PRs #673/#1160/#657/#1229/#1446, published `@sanity/ui` 4.4.2/4.4.4/5.0.0-alpha.14 tarballs, sanity-io/sanity and sanity-io/plugins (read-only clones).
