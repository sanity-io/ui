import {defineConfig} from '@sanity/tsdown-config'
import type {UserConfig} from 'tsdown'

// The annotation keeps the declaration emit portable: this file is part of the
// same TypeScript program as the build (there is no separate tsconfig for
// dist), and the inferred config type cannot be named without it (TS2883).
const config: UserConfig = await defineConfig({
  // One entry point per file in `src/exports/`. The glob form maps e.g.
  // `src/exports/toast.ts` → `@sanity/ui/toast` (the matched filename replaces
  // the `*` in the key, which is what drives the generated `package.json`
  // `exports` subpaths; `index.ts` maps to the root `.` export). Adding a file
  // to `src/exports/` is all it takes to publish a new subpath. Components
  // with heavy dependencies (motion, @floating-ui/react-dom, react-refractor)
  // live on their own subpaths so that importing the root entry never
  // references those dependencies, regardless of bundler treeshaking.
  entry: {
    '*': './src/exports/*.{ts,tsx}',
  },
  tsconfig: 'tsconfig.dist.json',
  styledComponents: true,
  reactCompiler: {target: '19'},
  // Extract vanilla-extract `.css.ts` styles into dist/styles.css. Unlike the
  // default (`inject: {nodeCompat: true}`, which self-imports
  // `@sanity/ui/bundle.css` from every entry), `inject: false` leaves loading
  // the stylesheet to the consumer: `import '@sanity/ui/styles.css'` — the
  // same file name and consumer contract as the vanilla-extract based
  // successor of this library, to minimize churn when upgrading later.
  //
  // `minify: false` + `target: false` skip the lightningcss pass entirely, so
  // the stylesheet ships exactly as authored. That is what keeps the
  // `overflow: hidden` fallback ahead of `overflow: clip` (needed by browsers
  // in the support matrix without `overflow: clip`, e.g. iOS Safari 15): no
  // browser target can preserve it, because lightningcss's OverflowHandler
  // always collapses duplicate `overflow` declarations to the last value —
  // unlike e.g. colors, it never consults compat data for the `clip` keyword —
  // and setting any of `minify`, `target` or `lightningcss` runs that pass.
  // Revisit when lightningcss learns to preserve keyword fallbacks, or when
  // every supported browser understands `overflow: clip` and the `hidden`
  // fallbacks can be deleted from the `.css.ts` sources instead.
  vanillaExtract: {fileName: 'styles.css', inject: false, minify: false, target: false},
})

export default config
