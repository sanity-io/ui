import eslintConfig from '@repo/eslint-config'
import {defineConfig, globalIgnores} from 'eslint/config'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import storybook from 'eslint-plugin-storybook'
import globals from 'globals'

export default defineConfig([
  globalIgnores(['dist', 'storybook-static']),
  ...eslintConfig,
  {
    files: ['**/*.{ts,tsx}'],
    extends: [reactHooks.configs.flat.recommended, reactRefresh.configs.vite],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
  },
  ...storybook.configs['flat/recommended'],
])
