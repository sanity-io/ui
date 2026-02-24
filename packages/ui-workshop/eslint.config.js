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
      ignores: ['.workshop', 'dist', '**/__fixtures__/**'],
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
        parserOptions: {
          tsconfigRootDir: import.meta.dirname,
        },
      },
      linterOptions: {reportUnusedDisableDirectives: 'error'},
      rules: {
        '@typescript-eslint/no-explicit-any': 'warn',
        'import/no-unresolved': 'off',
        'no-console': 'error',
        'no-warning-comments': ['warn', {location: 'start', terms: ['todo', '@todo', 'fixme']}],
        '@typescript-eslint/no-unused-vars': 'off',
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

    // Ignore Storybook stories and test files for the react compiler
    {
      files: ['**/__workshop__/*.{js,ts,tsx}', '**/*.stories.{js,ts,tsx}', '**/*.test.{js,ts,tsx}'],
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
        'boundaries/ignore': ['src/**/*.test.ts', 'src/**/*.test.tsx', 'src/**/__workshop__/**/*'],

        'boundaries/elements': [
          // exports
          {
            type: '@sanity/ui-workshop',
            pattern: ['exports/index.ts'],
            mode: 'file',
          },
          {
            type: '@sanity/ui/plugin-a11y',
            pattern: ['exports/plugin-a11y.ts'],
            mode: 'file',
          },
          {
            type: '@sanity/ui/plugin-perf',
            pattern: ['exports/plugin-perf.ts'],
            mode: 'file',
          },
          {
            type: '@sanity/ui/runtime',
            pattern: ['exports/runtime.ts'],
            mode: 'file',
          },

          // modules
          {
            type: 'src/cli',
            pattern: ['src/cli/**/*'],
            mode: 'full',
          },
          {
            type: 'src/core',
            pattern: ['src/core/**/*'],
            mode: 'full',
          },
          {
            type: 'src/plugin-a11y',
            pattern: ['src/plugin-a11y/**/*'],
            mode: 'full',
          },
          {
            type: 'src/plugin-perf',
            pattern: ['src/plugin-perf/**/*'],
            mode: 'full',
          },
          {
            type: 'src/runtime',
            pattern: ['src/runtime/**/*'],
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
            pattern: ['package.config.ts', 'workshop.config.ts', 'workshop.runtime.ts'],
            mode: 'file',
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
              {from: '@sanity/ui-workshop', allow: ['src/core']},
              {from: '@sanity/ui/plugin-a11y', allow: ['src/plugin-a11y']},
              {from: '@sanity/ui/plugin-perf', allow: ['src/plugin-perf']},
              {from: '@sanity/ui/runtime', allow: ['src/runtime']},

              {
                from: 'src/core',
                allow: ['src/core'],
              },
              {from: 'src/plugin-a11y', allow: ['@sanity/ui-workshop', 'src/plugin-a11y']},
              {from: 'src/plugin-perf', allow: ['@sanity/ui-workshop', 'src/plugin-perf']},
              {from: 'src/runtime', allow: ['@sanity/ui-workshop', 'src/runtime']},

              {
                from: 'test',
                allow: [
                  '@sanity/ui-workshop',
                  '@sanity/ui/plugin-a11y',
                  '@sanity/ui/plugin-perf',
                  '@sanity/ui/runtime',
                ],
              },
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
