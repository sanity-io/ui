import {defineConfig} from '@sanity/tsdown-config'
import type {UserConfig} from 'tsdown'

const config: UserConfig = await defineConfig({
  entry: {
    'index': './exports/index.ts',
    'theme': './exports/theme.ts',
    '_visual-editing': './exports/_visual-editing.ts',
  },
  format: ['esm', 'cjs'],
  tsconfig: 'tsconfig.dist.json',
  reactCompiler: {target: '18'},
  styledComponents: true,
})

// Emit sourcemaps for both formats, like @sanity/pkg-utils did
config.sourcemap = true

export default config
