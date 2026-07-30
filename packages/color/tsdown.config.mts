import {defineConfig} from '@sanity/tsdown-config'

export default await defineConfig({
  entry: {index: './src/index.ts'},
  tsconfig: 'tsconfig.dist.json',
})
