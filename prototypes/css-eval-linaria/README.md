# css-eval: Linaria (wyw-in-js) prototype

Evaluation prototype for replacing vanilla-extract (see `REPORT.md` for the
findings). Everything here is a standalone pnpm workspace; it does not touch the
monorepo lockfile.

| Directory | What it is |
| --- | --- |
| `button-lib/` | `@sanity-css-eval/button-linaria@1.0.0`: a @sanity/ui-style `Button` (tone × mode variants, CSS-variable theme tokens, a dynamic `styled` prop) built with tsdown + `@wyw-in-js/rollup`. `WYW_FLAVOR=default\|namespaced\|atomic` selects the class-name strategy; `pnpm build:vite` builds the same library through Vite 8 + `@wyw-in-js/vite`. `typecheck/` holds the type-safety probes. |
| `button-lib-v2/` | The same package at `2.0.0` with a `brand` tone inserted before `primary` (renumbers the later `css` calls) and changed theme values (purple primary, pill radius). Same relative file paths as v1, as a real next version would have. |
| `demo/` | Vite app rendering v1 and v2 on one page per flavor, plus `tests/collisions.mjs` (Playwright): computed-style checks for every tone/mode of both versions and screenshots. |
| `pigment-probe/` | The same Button written against Pigment CSS 0.0.31 (`styled` + `variants`), built with its Vite plugin (pinned to Vite 6: the plugin does not load under Vite 7/8). |
| `scripts/analyze-css.mjs` | Static postcss comparison of the v1 and v2 stylesheets per flavor: selectors emitted by both versions and whether their declarations agree. |
| `scripts/measure.mjs` | Build time (fresh process), in-process wyw `transform()` cold/warm/incremental timings, output sizes (raw/gzip/brotli), runtime bundle size, tsc probes. |
| `results/` | Committed outputs: `browser-results.json`, `css-analysis.json`, `metrics.json`, `pigment-metrics.json`, screenshots. |

## Run it

```sh
cd prototypes/css-eval-linaria
pnpm install
pnpm --filter @sanity-css-eval/demo exec playwright install chromium

pnpm --filter @sanity-css-eval/button-linaria build:all   # dist/{default,namespaced,atomic}
pnpm --filter @sanity-css-eval/button-linaria-v2 build:all
node scripts/analyze-css.mjs                               # static v1-vs-v2 selector comparison
pnpm --filter @sanity-css-eval/demo build && pnpm --filter @sanity-css-eval/demo test   # browser test + screenshots
node scripts/measure.mjs                                   # metrics
pnpm --filter @sanity-css-eval/pigment-probe build && node pigment-probe/scripts/measure.mjs
```

## What the three flavors show

- `default` (stock Linaria): class = `<first letter of display name><murmurhash2("<root-relative file>:<index of the css/styled call in the file>")>`.
  v1 `positive` and v2 `primary` are both `.p1dloej8`; v1 `critical` and v2 `caution` are both `.c482hkv`; both theme classes are shared with different declarations. With both stylesheets on the page the v1 panel renders with v2's rules (17 of 59 computed-style checks wrong).
- `namespaced` (`classNameSlug: (hash) => \`${pkg}-${version}-${hash}\``): zero shared selectors, both versions render correctly. Version-unique, not content-addressed: the same lever Sanity's pkg-utils fix pulls for vanilla-extract.
- `atomic` (`@linaria/atomic`): one class per declaration, named `atm_<hash(property + nesting)>_<hash(value)>`. 102 selectors are shared between the versions and every one carries identical declarations; both versions render correctly.
