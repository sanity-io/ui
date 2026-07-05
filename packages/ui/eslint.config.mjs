import js from '@eslint/js'
import eslintConfigPrettier from 'eslint-config-prettier/flat'
import boundaries from 'eslint-plugin-boundaries'
import _import from 'eslint-plugin-import'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import globals from 'globals'
import ts from 'typescript-eslint'

export default ts.config(
  [
    {
      ignores: ['dist'],
    },

    {
      extends: [
        js.configs.recommended,
        ...ts.configs.recommended,
        _import.flatConfigs.recommended,
        _import.flatConfigs.typescript,
      ],
      files: ['**/*.{ts,tsx}'],
      languageOptions: {
        ecmaVersion: 2018,
        globals: {
          ...globals.browser,
          ...globals.nodeBuiltin,
          ...globals.es2018,
        },
        sourceType: 'module',
      },
      linterOptions: {reportUnusedDisableDirectives: 'error'},
      rules: {
        // '@typescript-eslint/no-unused-vars': 'off',
        '@typescript-eslint/no-explicit-any': 'off', // todo: warn
        'import/no-unresolved': 'off',
        'no-console': 'error',
        'no-restricted-imports': [
          'error',
          {
            paths: [
              {
                name: 'styled-components',
                importNames: ['default'],
                message: 'Please use `import {styled} from "styled-components"` instead.',
              },
            ],
          },
        ],
        'no-warning-comments': ['warn', {location: 'start', terms: ['todo', '@todo', 'fixme']}],
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
        'react-hooks/hooks': 'error',
        'react-hooks/capitalized-calls': 'error',
        'react-hooks/memoized-effect-dependencies': 'error',
        'react-hooks/no-deriving-state-in-effects': 'error',
        'react-hooks/invariant': 'error',
        'react-hooks/todo': 'error',
        'react-hooks/syntax': 'error',
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
        'react/no-unescaped-entities': 'off', // todo: remove
      },
    },
    {
      ...react.configs.flat['jsx-runtime'],
    },

    // Ignore test files for the react compiler
    {
      files: ['**/*.test.{js,ts,tsx}'],
      rules: {
        'react-hooks/set-state-in-effect': 'off',
        'react-hooks/refs': 'off',
        'react-hooks/hooks': 'off',
      },
    },

    // jsx-a11y
    jsxA11y.flatConfigs.recommended,

    // boundaries
    {
      plugins: {boundaries},

      settings: {
        'boundaries/ignore': ['src/**/*.test.ts', 'src/**/*.test.tsx'],

        'boundaries/elements': [
          // entry points
          {
            type: '@sanity/ui',
            pattern: ['exports/index.ts'],
            mode: 'file',
          },
          {
            type: '@sanity/ui/_visual-editing',
            pattern: ['exports/_visual-editing.ts'],
            mode: 'file',
          },
          {
            type: '@sanity/ui/theme',
            pattern: ['exports/theme.ts'],
            mode: 'file',
          },

          // modules
          {
            type: 'src/core',
            pattern: ['src/core/**/*'],
            mode: 'full',
          },
          {
            type: 'src/theme',
            pattern: ['src/theme/**/*'],
            mode: 'full',
          },

          // tests
          {
            type: 'test',
            pattern: ['test/**/*', 'src/**/*.test.*'],
            mode: 'full',
          },

          // configs
          {
            type: 'configs',
            pattern: ['package.config.ts'],
            mode: 'file',
          },
          {
            type: 'typings',
            pattern: ['typings/**/*'],
            mode: 'full',
          },
        ],
      },

      rules: {
        ...boundaries.configs.recommended.rules,

        'boundaries/element-types': [
          'error',
          {
            default: 'disallow',
            rules: [
              {from: '@sanity/ui', allow: ['@sanity/ui/theme', 'src/core']},
              {from: '@sanity/ui/_visual-editing', allow: ['src/core', 'src/theme']},
              {from: '@sanity/ui/theme', allow: ['src/theme']},
              {from: 'src/core', allow: ['src/core', '@sanity/ui/theme']},
              {from: 'src/theme', allow: ['src/theme']},
              {from: 'test', allow: ['@sanity/ui', '@sanity/ui/theme']},
            ],
          },
        ],

        'boundaries/no-private': 'off',
      },
    },

    // prettier
    eslintConfigPrettier,
  ].filter(Boolean),
)
