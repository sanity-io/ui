# Panda CSS 2.x evaluation prototype

Evaluation branch for replacing vanilla-extract in `sanity-io/ui`, `sanity-io/sanity` and
`sanity-io/plugins` (background: Linear SAPP-4639, where `@sanity/ui` 4.4.3 and 4.4.4 shared
the class name `_2mi48t0` for different rules and broke the Studio navbar). This directory is a
self-contained pnpm workspace (own lockfile), **not** part of the root workspace. It is a
prototype, not something to ship.

Panda version under test: `@pandacss/dev` 2.2.0 (the first 2.x line, released 2026-09-29; the
compiler is a Rust/Oxc rewrite shipped as a napi binding).

## Layout

| Path | What it is |
| --- | --- |
| `packages/button-v1` | `@sanity-eval/panda-button-v1@4.4.3`: a @sanity/ui-style `Button` (`tone` × `mode` via a `cva` atomic recipe), a CSS-variable theme with light/dark scheme and runtime overrides (`ThemeProvider`), dynamic styles through inline CSS variables (`width`, `radius`), and a config-recipe `Badge` used as a **negative control**. Built with `panda codegen` → `panda cssgen --outfile dist/styles.css` → `tsdown` (`@sanity/tsdown-config`). |
| `packages/button-v2` | The same library at 4.4.4 with changed styles: a style inserted *before* the recipe (the vanilla-extract "renumbering" scenario), variant groups and declarations reordered, padding/radius/gap/font-weight/hover changed, an `_active` state added, the primary token default darkened, and the Badge recipe changed. |
| `apps/demo` | A Vite app that consumes both versions from their built `dist` + `styles.css` (no Panda plugin, like `sanity` consumes `@sanity/ui`), rendering both on one page (`index.html`), plus `skew.html`: v4.4.4 JavaScript with only the v4.4.3 stylesheet (the SAPP-4639 publishing-race shape). |
| `apps/vite-panda-app` | An app that runs Panda itself through `@pandacss/vite` on Vite 8 (rolldown-vite) with `transform: true`, next to the pre-built library; `check.mjs` verifies the output, `postcss-check.mjs` exercises the PostCSS plugin (the Next.js path). |
| `scripts/` | The proofs and measurements (below). |
| `results/` | Committed outputs: JSON verdicts, the two generated stylesheets, screenshots, benchmark numbers. |

## Run it

```sh
cd prototypes/panda-css
pnpm install
pnpm exec playwright install chromium   # once
pnpm build                              # both libraries, both apps
pnpm test                               # all proofs and checks
pnpm bench                              # compile-time benchmark (~30 s)
pnpm runtime-size                       # JS runtime and CSS sizes
pnpm hash-collisions                    # hashed-class collision estimate + in-build reproduction
```

## What the proofs show

- `scripts/check-css-collisions.mjs` parses both published stylesheets: every selector present in
  both has identical declarations, except the two predicted name-addressed cases (the config
  recipe `badge` and the `:root` token defaults). It also scans each stylesheet for duplicate
  selectors with different declarations (what a hash collision inside one build looks like).
- `scripts/browser-proof.mjs` (headless Chromium) asserts 74 computed styles across both
  versions on one page, computes the class-name overlap from the live DOM/CSSOM, documents the
  two pitfalls, asserts the version-skew page degrades to UA defaults instead of the old
  version's values, and saves the screenshots in `results/`.
- `scripts/type-safety.mjs` runs `tsc` (TypeScript 7) over 13 deliberately wrong usages
  (unknown token, raw value under `strictTokens`, invalid keyword, typo'd property/condition,
  wrong variant value/name, wrong `token()` path, wrong config-recipe variant, wrong theme path,
  wrong token category) that must fail, and correct usages that must pass.
- `apps/vite-panda-app/check.mjs` verifies that static `css()`/`cva()` call sites were rewritten
  to class strings by the source transform and that `app-*` and `sui-v4-*` classes coexist.
- `apps/demo/ssr-check.mjs` renders the library with `react-dom/server` in plain Node and checks
  the shipped JavaScript for client-only React APIs (none).
- `scripts/hash-collision-estimate.mjs` measures how Panda's 32-bit hash behaves over hundreds of
  thousands of realistic atomic names, and reproduces a colliding pair inside one build (the
  compiler emits both rules under one selector, with no diagnostic).

The full write-up with source citations, metrics and scores lives in the evaluation report
(`css-eval-panda-css.md`).
