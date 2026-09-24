import {defineConfig} from '@sanity/tsdown-config'
import type {UserConfig} from 'tsdown'

const stylesCssExport = {
  types: './src/styles.css.d.ts',
  browser: './dist/styles.css',
  style: './dist/styles.css',
  node: './src/styles.css.node.js',
  default: './src/styles.css.node.js',
}

// Annotated because this file is in the same program as `ts:check`, where the
// inferred config type cannot be named (TS2883).
const config: UserConfig = await defineConfig({
  entry: {index: './src/index.ts', polyfills: './src/polyfills.ts'},
  tsconfig: 'tsconfig.dist.json',
  reactCompiler: {target: '19', transform: 'oxc'},
  clean: false,
  exports: {devExports: 'source', customExports: {'./styles.css': stylesCssExport}},
})

export default config
