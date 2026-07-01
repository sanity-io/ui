import {defineConfig} from '@sanity/tsdown-config'
import type {UserConfig} from 'tsdown'

// The explicit `UserConfig` annotation gives the default export a portable type
// name (via the direct `tsdown` dependency); without it `declaration` emit fails
// with TS2883 because `@sanity/tsdown-config` returns `tsdown`'s `UserConfig`.
const config: UserConfig = defineConfig({
  tsconfig: './tsconfig.dist.json',
  entry: './src/index.ts',
})

export default config
