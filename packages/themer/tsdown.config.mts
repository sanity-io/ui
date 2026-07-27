import {defineConfig} from '@sanity/tsdown-config'

export default await defineConfig({
  entry: {
    index: './src/index.ts',
    legacy: './src/legacy/index.ts',
    tool: './src/tool/index.ts',
  },
  tsconfig: 'tsconfig.dist.json',
})
