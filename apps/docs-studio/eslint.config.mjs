import {defineConfig} from '@repo/eslint-config'
import * as figmaPlugin from '@figma/eslint-plugin-figma-plugins'
import tseslint from 'typescript-eslint'

export default defineConfig(import.meta.dirname, [
  {
    ignores: ['.sanity', '.turbo', 'dist', 'static', 'tmp'],
  },
])
