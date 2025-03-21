'use strict'

module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    'plugin:boundaries/recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:storybook/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'boundaries',
    'import',
    'jsx-a11y',
    'react',
    'react-hooks',
    'react-compiler',
    '@typescript-eslint',
  ],
  rules: {
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-empty-object-type': 'off',
    'boundaries/element-types': [
      'error',
      {
        default: 'disallow',
        rules: [
          {
            // export
            from: '@sanity/ui',
            allow: ['@sanity/ui__contents'],
          },
          {
            from: '@sanity/ui__contents',
            allow: ['@sanity/ui__contents', '@sanity/ui/theme'],
          },
          {
            // export
            from: '@sanity/ui/theme',
            allow: ['@sanity/ui/theme__contents'],
          },
          {
            from: '@sanity/ui/theme__contents',
            allow: ['@sanity/ui/theme__contents'],
          },
        ],
      },
    ],
    'import/order': [
      'error',
      {
        alphabetize: {
          caseInsensitive: true,
          order: 'asc',
        },
      },
    ],
    'no-console': 'error',
    'no-warning-comments': ['warn', {location: 'start', terms: ['todo', '@todo', 'fixme']}],
    'padding-line-between-statements': [
      'warn',
      {blankLine: 'always', prev: '*', next: 'block'},
      {blankLine: 'always', prev: '*', next: 'block-like'},
      {blankLine: 'always', prev: 'const', next: 'expression'},
      {blankLine: 'always', prev: 'let', next: 'expression'},
      {blankLine: 'always', prev: 'var', next: 'expression'},
      {blankLine: 'always', prev: 'block', next: '*'},
      {blankLine: 'always', prev: 'block-like', next: '*'},
      {blankLine: 'always', prev: '*', next: 'return'},
    ],
    'react/prop-types': 'off',
    'react-hooks/exhaustive-deps': 'error', // Checks effect dependencies
    'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
    'react-compiler/react-compiler': 'warn', // Set to error once existing warnings are fixed
    'react/no-unescaped-entities': 'off',
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
  },
  overrides: [
    // Ignore Storybook stories and test files for the react compiler
    {
      files: [`**/*.stories.{js,ts,tsx}`, '**/*.test.{js,ts,tsx}'],
      rules: {
        'react-compiler/react-compiler': 'off',
      },
    },
  ],
  settings: {
    'boundaries/elements': [
      {
        type: '@sanity/ui',
        pattern: ['exports/index.ts'],
        mode: 'full',
      },
      {
        type: '@sanity/ui__contents',
        pattern: ['src/core/**/*.*'],
        mode: 'full',
      },
      {
        type: '@sanity/ui/theme',
        pattern: ['exports/theme.ts'],
        mode: 'full',
      },
      {
        type: '@sanity/ui/theme__contents',
        pattern: ['src/theme/**/*.*'],
        mode: 'full',
      },
    ],
    'react': {version: 'detect'},
  },
}
