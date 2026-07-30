import {defineConfig} from '@sanity/tsdown-config'
import type {UserConfig} from 'tsdown'

// The annotation keeps the declaration emit portable: this file is part of the
// same TypeScript program as the build (there is no separate tsconfig for
// dist), and the inferred config type cannot be named without it (TS2883).
const config: UserConfig = await defineConfig({
  entry: {
    'index': './exports/index.ts',
    'theme': './exports/theme.ts',
  },
  tsconfig: 'tsconfig.dist.json',
  styledComponents: true,
  reactCompiler: {target: '19'},
})

export default config
