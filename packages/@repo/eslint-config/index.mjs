import js from '@eslint/js'
import {defineConfig} from 'eslint/config'
import eslintConfigPrettier from 'eslint-config-prettier'
import * as importPlugin from 'eslint-plugin-import'
import eslintPluginPrettier from 'eslint-plugin-prettier/recommended'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import globals from 'globals'
import tsLint from 'typescript-eslint'

/** @type import('eslint').Linter.Config */
export default defineConfig([
  js.configs.recommended,
  eslintConfigPrettier,
  eslintPluginPrettier,
  ...tsLint.configs.recommended,
  {
    ignores: ['.DS_Store', 'node_modules', 'dist', 'pnpm-lock.yaml'],
  },
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      ecmaVersion: 2020,
      sourceType: 'module',
      parserOptions: {},
    },
    plugins: {
      'simple-import-sort': simpleImportSort,
      'import': importPlugin,
    },
    rules: {
      'no-console': 'error',
      'no-shadow': 'error',
      'no-warning-comments': [
        'warn',
        {
          location: 'start',
          terms: ['todo', 'fixme'],
        },
      ],
      'quote-props': ['warn', 'consistent-as-needed'],
      'simple-import-sort/exports': 'warn',
      'simple-import-sort/imports': 'warn',
      'strict': ['warn', 'global'],
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      '@typescript-eslint/explicit-module-boundary-types': 'error',
      '@typescript-eslint/interface-name-prefix': 'off',
      '@typescript-eslint/member-delimiter-style': 'off',
      '@typescript-eslint/no-empty-interface': 'off',
    },
  },
])
