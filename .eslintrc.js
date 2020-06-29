'use strict'

const common = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  parser: 'babel-eslint',
  plugins: ['react', 'react-hooks', 'prettier'],
  extends: ['plugin:react/recommended', 'eslint:recommended', 'plugin:prettier/recommended'],
  settings: {react: {version: 'detect'}},
  rules: {
    'react/no-unescaped-entities': 0,
    'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
    'react-hooks/exhaustive-deps': 'warn', // Checks effect dependencies
  },
}

module.exports = {
  ...common,
  overrides: [
    {
      ...common,
      files: ['**/*.ts', '**/*.tsx'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        ecmaVersion: 2018,
        sourceType: 'module',
      },
      plugins: ['react', 'react-hooks', '@typescript-eslint', 'prettier'],
      extends: [
        'plugin:react/recommended',
        'eslint:recommended',
        'plugin:prettier/recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
      ],
      rules: {
        ...common.rules,
        '@typescript-eslint/explicit-module-boundary-types': 0,
        '@typescript-eslint/interface-name-prefix': 0,
        '@typescript-eslint/member-delimiter-style': 0,
        '@typescript-eslint/no-empty-interface': 0,
      },
    },
  ],
}
