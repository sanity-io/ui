# css-eval: next-yak

Evaluation prototype for replacing vanilla-extract with [next-yak](https://yak.js.org) (9.10.2,
npm `latest`; 10.x is being renamed to `@yak/react`). Companion report:
`css-eval-next-yak.md` (agent store) — this directory holds the reproducible part.

This is a **self-contained pnpm workspace** (own lockfile). It is deliberately not listed in the
repository root `pnpm-workspace.yaml`, so it does not touch `@sanity/ui`'s dependency graph,
lint or knip configuration.

## What is in here

| path | what |
| --- | --- |
| `packages/ui-v1` | a `@sanity/ui`-style `Button` (5 tones × 3 modes, `ThemeProvider` with light/dark themes as `--sui-*` custom properties, typed tokens in `theme.yak.ts`, dynamic padding/radius/width styles) compiled by next-yak |
| `packages/ui-v2` | the same library one release later: a `Badge` component added *above* `Button` (renumbers every generated identifier), uppercase primary tone, drop shadow, new `textWeight` prop, new defaults |
| `shared/vite-lib.ts` | the library build: `vite build` (Vite 8 / rolldown) in lib mode with `viteYak()`; `dist/` uses a per-version `prefix`, `YAK_UNSAFE=1` builds `dist-unsafe/` with next-yak's default naming |
| `shared/yak-prefix.ts` | `prefix = 's' + fnv1a(name@version) + '_'` — the only mechanism yak offers to keep two versions apart |
| `shared/yak-rolldown-plugin.ts` | feasibility probe: a ~120-line rolldown/tsdown plugin (SWC + yak wasm + yak's cross-file resolver) since yak ships no tsdown integration; `pnpm build:tsdown` produces byte-identical CSS to the Vite build plus `.d.ts` |
| `app/` | a plain consumer (no yak plugin) that renders **v1 and v2 on one page**. `index.html` loads the prefixed builds, `unsafe.html` the default-naming builds |
| `app/tests/collision.spec.ts` | Playwright: class-name intersection at stylesheet and DOM level, computed styles per version, screenshots |
| `bench/compile-bench.ts` | SWC+yak transform cold/warm, plugin overhead, `vite build` wall clock, and the record-lookup pitfall |
| `bench/sizes.ts` | CSS raw/minified/gzip/brotli, yak runtime vs styled-components, compiled library JS |
| `type-tests/negative.tsx` | `@ts-expect-error` probes (wrong tone/mode/scale/token/theme/condition) and what is *not* caught |

## Run it

Node ≥ 22.18 or the `--experimental-strip-types` flag is required for `*.yak.ts` evaluation;
`pnpm-workspace.yaml` sets `nodeOptions` so this works on Node 22.14 as well.

```sh
pnpm install
pnpm build            # libs (prefixed + default naming + tsdown) and the app
CHROME_PATH=/usr/local/bin/google-chrome pnpm test   # or `pnpm --filter ./app exec playwright install chromium` and drop CHROME_PATH
pnpm typecheck        # tsc on type-tests/
pnpm bench            # compile timings (+ pitfall output)
pnpm sizes            # output sizes
```

`pnpm --filter ./app dev` serves both pages for a manual look (`/` and `/unsafe.html`).

## Headline results

- next-yak class names are `prefix + fnv1a(relative file path) + per-file counter`
  (`packages/yak-swc/yak_swc/src/naming_convention.rs`), not content hashes. With default
  settings, v1 and v2 share 10 of 12 selectors with different meanings; v1's `Button` root class
  is v2's `Badge` class, and v1 renders visibly broken next to v2 (`unsafe.html`).
- With a per-version `prefix`, the two versions share no class names and both render correctly
  (`index.html`). Nothing is deduplicated across versions; identical rules ship twice.
- A record of mixins selected at runtime (`toneStyles[$tone]`) compiles to empty `css()` calls
  with no error — variants must be written as inline conditional `css` literals.
