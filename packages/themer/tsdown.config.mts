import {defineConfig} from '@sanity/tsdown-config'
import type {UserConfig} from 'tsdown'

// The annotation keeps the declaration emit portable: this file is part of the
// same TypeScript program as the build (there is no separate tsconfig for
// dist), and the inferred config type cannot be named without it (TS2883).
const config: UserConfig = await defineConfig({
  entry: {
    index: './src/index.ts',
    legacy: './src/legacy/index.ts',
    tool: './src/tool/index.ts',
  },
  // `transform: 'oxc'` runs the React Compiler natively via `oxc-transform-react`
  // (the Rust port) instead of `babel-plugin-react-compiler`; `target: '19'`
  // emits `react/compiler-runtime` imports, which the React 19.3 peer range ships
  reactCompiler: {target: '19', transform: 'oxc'},
  // Extracts the CSS of the vanilla-extract `.css.ts` modules into
  // `dist/bundle.css` and wires up the conditional `./bundle.css` export
  // (`browser`/`style` resolve to the stylesheet, `node`/`default` to a no-op
  // shim), like `@sanity/vision` ships its styles. The `tool` entry is the only
  // one with styles, so it is the only one that gets the self-referential
  // `import '@sanity/themer/bundle.css'` injected — which is why package.json
  // lists `./dist/tool.js` in `sideEffects` next to `*.css`: flagged
  // side-effect free, bundlers may bypass the entry and drop the bare CSS
  // import with it before the stylesheet's own side-effect status is consulted
  vanillaExtract: true,
})

export default config
