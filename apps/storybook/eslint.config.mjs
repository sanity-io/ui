import js from '@eslint/js'
import eslintConfigPrettier from 'eslint-config-prettier/flat'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import storybook from 'eslint-plugin-storybook'
import globals from 'globals'
import ts from 'typescript-eslint'

export default ts.config(
  [
    {
      ignores: ['storybook-static'],
    },

    {
      extends: [js.configs.recommended, ...ts.configs.recommended],
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
        '@typescript-eslint/no-explicit-any': 'off',
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

    // react-hooks
    reactHooks.configs.flat.recommended,
    {
      rules: {
        'react-hooks/exhaustive-deps': 'error',
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
      },
    },
    {
      ...react.configs.flat['jsx-runtime'],
    },

    // Relax rules that stories are allowed to break
    {
      files: ['**/*.stories.{js,ts,tsx}', 'stories/**/*.{js,ts,tsx}'],
      rules: {
        'react-hooks/set-state-in-effect': 'off',
        'react-hooks/refs': 'off',
        'react-hooks/hooks': 'off',
      },
    },

    // jsx-a11y
    jsxA11y.flatConfigs.recommended,

    // storybook
    storybook.configs['flat/recommended'],

    // prettier
    eslintConfigPrettier,
  ].filter(Boolean),
)
