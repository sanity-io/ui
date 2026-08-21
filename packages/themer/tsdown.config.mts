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
  styledComponents: true,
  // `transform: 'oxc'` runs the React Compiler natively via `oxc-transform-react`
  // (the Rust port) instead of `babel-plugin-react-compiler`; `target: '18'`
  // keeps emitting `react-compiler-runtime` imports for the React 18 peer range
  reactCompiler: {target: '18', transform: 'oxc'},
})

export default config
