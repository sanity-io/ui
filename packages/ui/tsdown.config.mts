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
  // `minify: false` keeps the output readable so CSS diffs between published
  // versions are easy to eval. The lightningcss pass still runs with the
  // lowering targets resolved from `@sanity/browserslist-config` (the
  // `@sanity/tsdown-config` default when no `target` is set). Note that it
  // collapses duplicate declarations to the last value regardless of targets
  // (e.g. an authored `overflow: hidden` fallback before `overflow: clip`
  // ships as just `overflow: clip` — fine, since `overflow: clip` is
  // Baseline).
  vanillaExtract: {fileName: 'styles.css', inject: false, minify: false},
})

export default config
