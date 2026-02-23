import {defineConfig} from '@repo/eslint-config'
import * as figmaPlugin from '@figma/eslint-plugin-figma-plugins'
import tseslint from 'typescript-eslint'

export default defineConfig(import.meta.dirname, [
  {
    ignores: ['.turbo', 'dist', 'tmp'],
  },

  {
    files: ['src/**/*.ts'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: './tsconfig.json',
      },
    },
    plugins: {
      '@figma/figma-plugins': figmaPlugin,
    },
    rules: {
      ...figmaPlugin.flatConfigs.recommended.rules,
    },
  },
])
