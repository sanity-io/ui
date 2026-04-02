'use strict'

/** @type import('eslint').Linter.Config */
module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  plugins: ['import', 'simple-import-sort', 'prettier'],
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
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: ['./tsconfig.json'],
      },
      extends: [
        'eslint:recommended',
        'plugin:prettier/recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
      ],
      plugins: ['import', '@typescript-eslint', 'simple-import-sort', 'prettier'],
      rules: {
        '@typescript-eslint/explicit-module-boundary-types': 'error',
        '@typescript-eslint/interface-name-prefix': 'off',
        '@typescript-eslint/member-delimiter-style': 'off',
        '@typescript-eslint/no-empty-interface': 'off',
      },
    },
  ],
}
