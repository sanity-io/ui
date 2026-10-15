import {defineConfig} from '@sanity/tsdown-config'

export default defineConfig({
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
  // Consumers import `@sanity/ui/styles.css` themselves, wherever their app
  // loads global CSS (see README), so the entry chunks must not import it.
  panda: {
    fileName: 'styles.css',
    inject: false,
    cascadeLayers: false,
  },
})
