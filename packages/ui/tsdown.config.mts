import {defineConfig} from '@sanity/tsdown-config'
import type {UserConfig} from 'tsdown'

// The annotation keeps the declaration emit portable: this file is part of the
// same TypeScript program as the build (there is no separate tsconfig for
// dist), and the inferred config type cannot be named without it (TS2883).
const config: UserConfig = await defineConfig({
  entry: {
    index: './exports/index.ts',
    theme: './exports/theme.ts',
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
  vanillaExtract: {fileName: 'styles.css', inject: false},
})

export default config
