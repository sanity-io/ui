import {defineConfig} from '@sanity/pkg-utils'

export default defineConfig({
  tsconfig: 'tsconfig.dist.json',
  strictOptions: {
    noImplicitBrowsersList: 'off',
  },
  babel: {reactCompiler: true},
  reactCompilerOptions: {target: '19'},
  rollup: {
    output: {
      banner: () => `'use client';`,
    },
  },
})
