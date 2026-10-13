import {defineConfig} from '@sanity/tsdown-config'
import type {UserConfig} from 'tsdown'

import {stylexTsdownPlugins} from './scripts/stylex-plugin'

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
  // `transform: 'oxc'` runs the React Compiler natively via `oxc-transform-react`
  // (the Rust port) instead of `babel-plugin-react-compiler`
  reactCompiler: {target: '19', transform: 'oxc'},
})

// `@sanity/tsdown-config` builds its own plugin list and drops a `plugins`
// field passed into `defineConfig`. Append the StyleX extractor afterwards.
// It writes `dist/styles.css` plus the node/default shim and keeps the
// conditional `./styles.css` export. Consumers still `import '@sanity/ui/styles.css'`.
const built = config as UserConfig & {plugins?: UserConfig['plugins']}

export default {
  ...built,
  plugins: [...stylexTsdownPlugins(), ...(Array.isArray(built.plugins) ? built.plugins : [])],
}
