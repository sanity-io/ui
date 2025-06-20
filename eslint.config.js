import js from '@eslint/js'
import eslintConfigPrettier from 'eslint-config-prettier/flat'
import boundaries from 'eslint-plugin-boundaries'
import _import from 'eslint-plugin-import'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import storybook from 'eslint-plugin-storybook'
import globals from 'globals'
import ts from 'typescript-eslint'

export default ts.config(
  [
    {
      ignores: ['.workshop', 'dist', 'figma', 'playground', 'storybook/storybook-static'],
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
      rules: {
        '@typescript-eslint/no-explicit-any': 'warn',
        'import/no-unresolved': 'off',
        'no-console': 'error',
        'no-warning-comments': ['warn', {location: 'start', terms: ['todo', '@todo', 'fixme']}],
      },
    },

    // simple-import-sort
    {
      plugins: {
        'simple-import-sort': simpleImportSort,
      },
      rules: {
        'simple-import-sort/imports': 'error',
        'simple-import-sort/exports': 'error',
      },
    },

    // react-refresh
    reactRefresh.configs.vite,

    // react-hooks and react-compiler
    {
      ...reactHooks.configs.recommended,
      rules: {
        'react-hooks/exhaustive-deps': 'error', // it's `warn` by default
        'react-hooks/react-compiler': 'error', // enable the react compiler
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

    // Ignore Storybook stories and test files for the react compiler
    {
      files: ['**/*.stories.{js,ts,tsx}', '**/*.test.{js,ts,tsx}'],
      rules: {
        'react-hooks/react-compiler': 'off',
      },
    },

    // jsx-a11y
    jsxA11y.flatConfigs.recommended,

    // storybook
    storybook.configs['flat/recommended'],

    // boundaries
    {
      plugins: {boundaries},

      settings: {
        'boundaries/ignore': ['src/**/*.test.ts', 'src/**/*.test.tsx', 'src/**/__workshop__/**/*'],

        'boundaries/elements': [
          // exports
          {
            type: '@sanity/ui',
            pattern: ['exports/index.ts'],
            mode: 'file',
          },
          {
            type: '@sanity/ui/css',
            pattern: ['exports/css.ts'],
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
            type: 'src/css',
            pattern: ['src/css/**/*'],
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

          {
            type: 'test/storybook',
            pattern: ['storybook/**/*'],
            mode: 'full',
          },

          {
            type: 'test/cypress',
            pattern: ['cypress/**/*'],
            mode: 'full',
          },

          // configs
          {
            type: 'configs',
            pattern: [
              'cypress.config.ts',
              'package.config.ts',
              'workshop.config.ts',
              'workshop.runtime.ts',
            ],
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
              {from: '@sanity/ui', allow: ['src/core']},
              {from: '@sanity/ui/_visual-editing', allow: ['src/core']},
              {from: '@sanity/ui/css', allow: ['src/css']},
              {from: '@sanity/ui/theme', allow: ['src/theme']},

              {from: 'src/core', allow: ['@sanity/ui/css', '@sanity/ui/theme', 'src/core']},
              {from: 'src/css', allow: ['@sanity/ui/theme', 'src/css']},
              {from: 'src/theme', allow: ['src/theme']},

              {from: 'test', allow: ['@sanity/ui', '@sanity/ui/css', '@sanity/ui/theme', 'test']},
              {from: 'test/storybook', allow: ['src/core', 'src/theme', 'test/storybook']},
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
