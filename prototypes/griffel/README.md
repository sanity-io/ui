# Griffel prototype — SAPP-4639 (vanilla-extract alternatives)

A `@sanity/ui`-style **Button** built on [Griffel](https://griffel.js.org) (Microsoft's
atomic CSS-in-JS, the engine of Fluent UI v9), published as a library in two versions and
rendered **on one page** to prove that the `_2mi48t0` class-collision failure of
`@sanity/ui` 4.4.3 + 4.4.4 cannot happen with content-hashed atomic classes.

This directory is a **standalone pnpm workspace** (own `pnpm-workspace.yaml` and lockfile);
the repository root workspace and the published `@sanity/ui` build are untouched.

```sh
cd prototypes/griffel
pnpm install            # also installs the two packed tarballs under app/tarballs
pnpm build              # tsdown-plugin → button (1.0.0) → button-v2 (2.0.0)
pnpm pack:tarballs      # repack app/tarballs/*.tgz from the fresh builds (then `pnpm install`)
pnpm test               # vite build ×2, Playwright proof in Chrome, Node tests (SSR, two copies)
pnpm typecheck          # type-safety probes (self-verifying @ts-expect-error)
pnpm bench              # compile times, CSS sizes, runtime sizes → bench/results/metrics.json
```

Requires Node ≥ 22.13, pnpm 12 and a system Chrome (`playwright` uses `channel: 'chrome'`).

## What is where

| Path             | Role                                                                                                                                                                                                                                                                                                                                                                                 |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `tsdown-plugin/` | ~130-line rolldown/tsdown plugin on `@griffel/transform` (oxc, the evaluator behind the official `@griffel/vite-plugin`). `mode: 'inject'` emits `__styles(classes, cssRules)` (class names and CSS computed at build time, CSS inserted by the runtime — how Fluent UI publishes); `mode: 'extract'` emits `__css(classes)` plus a `styles.css` like `@sanity/ui/styles.css` today. |
| `button/`        | **1.0.0**: `Button` (tones × modes via CSS-variable mapping, `makeResetStyles` base + atomic `makeStyles`, `width="fill"` static variant, `width={n}` dynamic style through an inline CSS variable), `ThemeProvider` + typed `tokens` (`var(--sui-*)` derived from the `Theme` shape), `makeStaticStyles` global rule. Built with tsdown; `@griffel/react` external.                 |
| `button-v2/`     | **2.0.0**: same component with every definition reordered ("renumbered") and radius / padding / weight / transition changed, uppercase added — and `@griffel/react` **bundled**, so the page runs two Griffel runtime copies.                                                                                                                                                        |
| `app/`           | Consumer installing both versions from their tarballs (`griffel-button-v1`, `griffel-button-v2` aliases). `vite.config.ts` = runtime mode (Studio-like); `vite.extract.config.ts` = app CSS extracted by `@griffel/vite-plugin`. `tests/two-versions.test.mjs` is the Playwright proof, `tests/ssr-and-two-copies.test.tsx` the Node tests. Results in `app/results/`.               |
| `typecheck/`     | `src/caught.tsx`: 17 wrong usages that must fail `tsc` (wrong tokens, tones, modes, missing variant slot, unknown slot, unit-less numbers, unsupported shorthand, incomplete theme). `src/not-caught.ts`: the documented gaps that compile.                                                                                                                                          |
| `bench/`         | `bench.mjs` → `results/metrics.json`.                                                                                                                                                                                                                                                                                                                                                |

## Results (Chrome 148, this machine — see `app/results/two-versions.json`)

- **0 collisions**: 189 Griffel rules on the page, 114 distinct selectors, every selector has exactly
  one declaration body. The 75 extra rules are byte-identical duplicates inserted by the second runtime copy.
- **2 runtime copies**, 10 `<style data-make-styles-bucket>` elements, bucket order global across both
  copies (`r r d d d d i i m m`), because `findInsertionPoint` scans all bucket elements in `<head>`.
- 78 atomic classes on v1 buttons, 76 on v2, **68 shared** (same declaration ⇒ same class ⇒ same rule),
  10 v1-only and 8 v2-only (changed declarations ⇒ new class names).
- All 78 buttons compute **their own version's** values (3px vs 6px radius, 8/12 vs 12/20px padding,
  500 vs 600, none vs uppercase, 80 vs 120ms), both themes apply through the shared `--sui-*` contract,
  hover applies for both copies, the dynamic `width={200}` is 200px in both, and a consumer `className`
  override wins through `mergeClasses`.
- `mergeClasses` of one copy correctly merges classes produced by the other copy: the definition lookup
  table lives on `globalThis[Symbol.for('@griffel/DEFINITION_LOOKUP_TABLE')]`.
- SSR (`renderToStyleElements`) emits every rule a rendered button uses; a library that bundles its own
  Griffel copy ignores the app's `RendererProvider` (the usual two-copies caveat).
- **Mixed-mode hazard (reproduced on purpose in `dist-extract`)**: with the app's CSS extracted to a
  `<link>` and the libraries inserting at runtime, the link precedes every runtime bucket, so the
  library reset (`font: inherit`, bucket `r`) beats the extracted app override (`font-size: 14px`).
  One delivery mode per page.

See `/cursor/stores/self/css-eval-griffel.md` (the report) for the full evaluation, metrics and migration plan.
