import {defineConfig} from '@sanity/tsdown-config'
import {mergeConfig} from 'tsdown'

const stylesCssExport = {
  types: './src/styles.css.d.ts',
  browser: './dist/styles.css',
  style: './dist/styles.css',
  node: './src/styles.css.node.js',
  default: './src/styles.css.node.js',
}

const config = mergeConfig(
  await defineConfig({
    entry: {index: './src/index.ts', polyfills: './src/polyfills.ts'},
    tsconfig: 'tsconfig.dist.json',
    reactCompiler: {target: '19', transform: 'oxc'},
    clean: false,
    exports: {devExports: 'source', customExports: {'./styles.css': stylesCssExport}},
  }),
  {banner: {js: `'use client';`}},
)

export default config
