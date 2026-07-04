import {defineConfig} from '@sanity/tsdown-config'
import type {UserConfig} from 'tsdown'

const config = await defineConfig({
  entry: {index: './src/index.ts'},
  tsconfig: 'tsconfig.dist.json',
})

const userConfig: UserConfig = {
  ...config,
  // The Figma plugin sandbox runs an older JavaScript engine; transpile
  // modern syntax (this replaces the previous babel object-rest-spread
  // transform from the @sanity/pkg-utils setup).
  target: 'es2017',
}

export default userConfig
