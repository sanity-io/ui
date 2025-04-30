/** @type import('eslint').Linter.Config */
module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'eslint:recommended',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  plugins: ['import', 'jsx-a11y', 'react', 'react-hooks', 'simple-import-sort', 'prettier'],
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
    'react/prop-types': 'off',
    'react-hooks/exhaustive-deps': 'error', // Checks effect dependencies
    'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
    'react-hooks/react-compiler': 'error',
    'react/no-unescaped-entities': 'off',
    'simple-import-sort/exports': 'warn',
    'simple-import-sort/imports': 'warn',
    'strict': ['warn', 'global'],
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: ['./tsconfig.json'],
      },
      extends: [
        'plugin:react/recommended',
        'plugin:react/jsx-runtime',
        'eslint:recommended',
        'plugin:prettier/recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
      ],
      plugins: [
        'import',
        'jsx-a11y',
        'react',
        'react-hooks',
        '@typescript-eslint',
        'simple-import-sort',
        'prettier',
      ],
      rules: {
        '@typescript-eslint/explicit-module-boundary-types': 'error',
        '@typescript-eslint/no-empty-interface': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
      },
    },
  ],
}
