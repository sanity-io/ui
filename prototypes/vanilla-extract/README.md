# CSS eval prototype: vanilla-extract with content-safe class names (upstream features only)

Companion to the css-eval report (`css-eval-vanilla-extract.md`). Background: Linear SAPP-4639 —
`@sanity/ui` 4.4.3/4.4.4 renumbered their styles, so `_2mi48t0` meant the Button loading overlay in
4.4.2 and the Button root in 4.4.4, and a page carrying both versions' CSS broke.

This prototype stays on vanilla-extract and fixes the naming through its public `identifiers`
option (vanilla-extract PR #1160, merged 2023 for exactly this "two versions of a shared library on
one page" scenario) — no fork of `@vanilla-extract/*` and no change to the `@sanity/vanilla-extract-*`
plugins. It also sketches what rule-content hashing would need upstream, and measures it.

## Layout

| path | what |
| --- | --- |
| `identifiers/versionedIdentifiers.ts` | the `identifiers` functions: `versionedIdentifiers` (name@version salt, optional module-source salt) and `contentIdentifiers` (rule-content hash; needs the upstream patch) |
| `lib-v1/`, `lib-v2/` | two releases (1.0.0, 2.0.0) of the same package `@css-eval/ve-button`: a `@sanity/ui`-style Button with `tone` × `mode` recipe variants, a theme contract with light/dark `createTheme`, a dynamic `accent` var set with `assignInlineVars`, and a spinner `keyframes`. 2.0.0 declares the root before the overlay (the 4.4.4 layout), adds a style, and changes tokens |
| `lib-*/tsdown.config.mts` | the real toolchain: tsdown + `@sanity/tsdown-config` → `@sanity/vanilla-extract-tsdown-plugin`; `VE_IDENTIFIERS` selects the naming mode |
| `consumer/` | a Vite + React 19 page that loads **both** releases' built CSS and JS (`?mode=<naming mode>`) |
| `tests/collision.spec.ts` | Playwright: proves the collision in `default` mode and its absence in the salted modes, samples computed styles, takes the screenshots |
| `scripts/` | `build.mjs` (all modes), `compare-css.mjs` (identifier collisions per mode), `compare-files.mjs` (any two stylesheets, e.g. published tarballs), `build-upstream-vite.mjs` (same build through the upstream `@vanilla-extract/vite-plugin`), `build-fork-vite.mjs` (through `@sanity/vanilla-extract-vite-plugin`, the CDN-bundle plugin), `bench.mjs` (compile time, sizes, runtime) |
| `typecheck/negative.ts` | which authoring mistakes `tsc` catches (and which it does not) |
| `upstream-content-hash.patch` | the proposed upstream change (`@vanilla-extract/css`: pass serialized `content` to custom identifier functions; +25/−9 lines) |
| `patches/` | the same change applied to the installed `@vanilla-extract/css@1.21.3` through `pnpm patch`, so the `content` mode can be built and measured |
| `results/` | generated evidence: `compare.md`, `metrics.md`, `browser-*.json/png`, `upstream-vite.json` |

## Naming modes

| `VE_IDENTIFIERS` | what the names are | needs |
| --- | --- | --- |
| `default` | upstream `short`: `murmur2(name + path)` + per-file counter — the control, reproduces the incident | nothing |
| `version` | `sha256(name@version + path)[:7]` + the same per-file counter | upstream `identifiers` option only |
| `version+module` | as above, plus the module's own source in the hash | upstream `identifiers` option only (one file read per module) |
| `content` | `c` + `sha256(serialized rule)[:8]` for styles/keyframes/font faces/themes; `version` names for variables and containers | the upstream patch |

The salted modes keep upstream's `prefix + counter` shape on purpose: every name in a module shares
its prefix, so names stay as short and as compressible as the defaults (+0.3 % gzip).

## Run

```sh
pnpm install                 # own workspace root; does not touch the monorepo lockfile
pnpm build                   # lib-v1 + lib-v2 in every mode → <lib>/dist/<mode>/
pnpm compare                 # results/compare.md
pnpm test                    # Playwright (needs `playwright install chromium`)
pnpm run build:upstream-vite # same libs through upstream @vanilla-extract/vite-plugin, compares names
pnpm run build:fork-vite     # through @sanity/vanilla-extract-vite-plugin (see the note inside)
pnpm bench                   # results/metrics.md
pnpm typecheck               # typecheck/negative.ts
pnpm dev                     # open http://localhost:4173/?mode=default|version|version+module|content
```

The real-world check lives in the monorepo: `packages/ui/tsdown.config.mts` on this branch builds
`@sanity/ui` with `versionedIdentifiers` (see `packages/ui/scripts/versionedIdentifiers.ts`), and
`node scripts/compare-files.mjs <a.css> <b.css>` compares its output with the published tarballs.
