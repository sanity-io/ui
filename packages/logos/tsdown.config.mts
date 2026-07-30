import {defineConfig} from '@sanity/tsdown-config'
import type {UserConfig} from 'tsdown'

const config: UserConfig = await defineConfig({
  entry: {index: './src/index.ts'},
  tsconfig: 'tsconfig.dist.json',
})

export default config
