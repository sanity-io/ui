import {defineConfig} from '@sanity/tsdown-config'

export default await defineConfig({
  entry: {index: './src/index.ts'},
  format: ['esm', 'cjs'],
  tsconfig: 'tsconfig.dist.json',
})
