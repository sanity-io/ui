import js from '@eslint/js'
import eslintConfigPrettier from 'eslint-config-prettier'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import globals from 'globals'
import ts from 'typescript-eslint'

/**
 * Extends the default `eslint` config with the given configs.
 *
 * @type (...configs: import('typescript-eslint').InfiniteDepthConfigWithExtends[]) => import('typescript-eslint').ConfigArray
 */
export function defineConfig(root, ...configs) {
  return ts.config(
    [
      {
        extends: [js.configs.recommended, ...ts.configs.recommended],
        files: ['**/*.{ts,tsx}'],
        languageOptions: {
          ecmaVersion: 2024,
          globals: {
            ...globals.browser,
            ...globals.nodeBuiltin,
            ...globals.es2024,
          },
          sourceType: 'module',
          parserOptions: {
            tsconfigRootDir: root,
          },
        },
        linterOptions: {reportUnusedDisableDirectives: 'error'},
        plugins: {
          'simple-import-sort': simpleImportSort,
        },
        rules: {
          'import/no-unresolved': 'off',
          'no-console': 'error',
          'no-duplicate-imports': 'error',
          'no-warning-comments': ['warn', {location: 'start', terms: ['todo', '@todo', 'fixme']}],
          '@typescript-eslint/no-unused-vars': 'off', // Let TS handle unused vars
          'simple-import-sort/imports': 'error',
          'simple-import-sort/exports': 'error',
          '@typescript-eslint/adjacent-overload-signatures': 'error',
        },
      },

      // react-refresh
      reactRefresh.configs.vite,

      // react-hooks
      reactHooks.configs.flat.recommended,

      // react-hooks custom rules
      {
        rules: {
          'react-hooks/exhaustive-deps': 'error',
          // Disabled by default, enabled here
          'react-hooks/rules-of-hooks': 'error',
        },
      },

      // react
      {
        ...react.configs.flat.recommended,
        settings: {
          react: {version: 'detect'},
        },
        rules: {
          'react/prop-types': 'off',
          'react/no-unescaped-entities': 'off',
          'react/jsx-sort-props': [
            'error',
            {
              callbacksLast: true,
              shorthandFirst: false,
              ignoreCase: true,
              reservedFirst: true,
            },
          ],
        },
      },
      {
        ...react.configs.flat['jsx-runtime'],
      },

      // Ignore test files for stricter react-hooks rules
      {
        files: ['**/*.test.{js,ts,tsx}', '**/*.spec.{js,ts,tsx}', 'playwright/**/*.{js,ts,tsx}'],
        rules: {
          'react-hooks/exhaustive-deps': 'off',
        },
      },

      // jsx-a11y
      jsxA11y.flatConfigs.recommended,

      ...configs,

      // prettier
      eslintConfigPrettier,
    ].filter(Boolean),
  )
}
