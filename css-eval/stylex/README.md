# StyleX evaluation prototype (SAPP-4639)

A `@sanity/ui`-style **Button** written with [StyleX](https://stylexjs.com) 0.19.1,
published as a precompiled library (JS with class-name objects + `styles.css`),
built as **two versions** with changed and reordered styles, and rendered on
**one page** in both stylesheet orders — the exact `@sanity/ui` 4.4.3 / 4.4.4
failure mode, which StyleX's content-hashed class names cannot reproduce.

The full report (class-name generation from source, metrics, toolchain fit,
migration) is `css-eval-stylex.md` next to this file.

## Layout

| Path | What |
| --- | --- |
| `packages/button-v1`, `packages/button-v2` | `@sanity-eval/stylex-button` 1.0.0 and 2.0.0. Same package name, built with `@sanity/tsdown-config` + `@stylexjs/unplugin` (`tsdown.config.ts`). v2 changes token defaults (`space3` 12→14px, `radius2` 3→4px, `fontWeight` 500→600, a dark fill), inserts a new style key before `root`, reorders style groups and adds a `loading` prop. |
| `packages/*/src/tokens.stylex.ts` | Theme tokens (`stylex.defineVars`) as CSS custom properties, plus the `button` variable group that tones override. |
| `packages/*/src/theme.ts` | `darkTheme` and the five tone themes (`stylex.createTheme`, content-hashed classes). |
| `packages/*/src/button.tsx` | `tone` × `mode` variants, `selected`/`disabled` states, static `padding`/`radius` scales, `width="fill"` (`firstThatWorks`) and a **dynamic** numeric `width` (inline custom property), typed `xstyle` prop. |
| `app/` | Vite 8 + React 19 consumer: renders v1 and v2 (light, dark, and a consumer theme compiled in the app over the *published* v1 tokens). Loads the two stylesheets as `<link>` tags in the order given by `?order=`. |
| `app/tests/collision.spec.ts` | Playwright: per-version computed styles in both orders, `:root` token isolation, shared-class-name audit of the two CSS files, package `exports` contract, screenshot. |
| `next-smoke/` + `app/tests/next-rsc.spec.ts` | Next.js 16 (Turbopack) React Server Component consuming the precompiled library with **no** StyleX build config. |
| `typecheck/` | `tsc` probe: every misuse is `@ts-expect-error` (fails if StyleX's types stop catching it) + documented gaps. |
| `scripts/stylex-options.mjs` | Version-scoped `defineVars` identifiers (the one path-based hash in StyleX) shared by library builds and the consumer app. |
| `scripts/hazard-define-vars.mjs` | Shows the stock vs version-scoped vs explicit-name behaviour of `defineVars` across two package versions. |
| `scripts/specificity-groups.mjs` | Shows the per-sheet priority-group specificity bumps and when they matter. |
| `scripts/bench.mjs`, `scripts/measure.mjs` | Compile times (cold/warm) and output sizes (raw/gzip/brotli). |
| `scripts/stylex-tsdown.mjs` | Compiler selection for the library builds: `STYLEX_COMPILER=babel` (default, `@stylexjs/unplugin`) or `STYLEX_COMPILER=rs` (the Rust port `@stylexswc/rs-compiler` via `@stylexswc/unplugin`, see facebook/stylex#1623). `app/vite.config.ts` honours the same variable for Vite 8. |
| `scripts/gen-synthetic.mjs`, `scripts/bench-compilers.mjs` | Synthetic 300/1,000-file libraries and the Babel-vs-Rust benchmark: per-file cold/warm, whole-set transforms, full tsdown builds, `tsdown --watch` rebuilds, Vite 8 builds. |
| `scripts/parity.mjs` | Babel-vs-Rust output parity: rule metadata, class/variable names and assembled CSS per file, plus an end-to-end `dist/` comparison. |
| `evidence/` | Committed outputs: screenshot, Playwright JSON, class-name comparison, CSS files, bench and size JSON, hazard transcripts, Next build log. |

## Run

```sh
cd css-eval/stylex
pnpm install                 # standalone pnpm root; does not touch the repo lockfile
pnpm evidence                # build libs + app + next, playwright, tsc probe, hazards, bench, sizes
# or step by step
pnpm build:libs && pnpm build:app && pnpm build:next
pnpm test                    # starts `vite preview` (4173) and `next start` (3077)
pnpm typecheck && pnpm hazard && pnpm bench && pnpm measure
pnpm parity && pnpm bench:compilers   # Babel vs Rust compiler
STYLEX_COMPILER=rs pnpm build:libs && STYLEX_COMPILER=rs pnpm build:app && STYLEX_COMPILER=rs pnpm test
pnpm dev                     # vite dev server for the one-page demo
```

Requires the Playwright Chromium (`pnpm exec playwright install chromium`).
