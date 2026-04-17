import { defineConfig } from "eslint/config";
import js from "@eslint/js";
import globals from 'globals'
import eslintConfigPrettier from 'eslint-config-prettier'
import eslintPluginPrettier from 'eslint-plugin-prettier/recommended'
import tsLint from 'typescript-eslint'
import * as importPlugin from 'eslint-plugin-import'
import simpleImportSort from 'eslint-plugin-simple-import-sort'

/** @type import('eslint').Linter.Config */
export default defineConfig([
  js.configs.recommended,
  eslintConfigPrettier,
  eslintPluginPrettier,
  ...tsLint.configs.recommended,
  {
    ignores: ['dist'],
  },
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      ecmaVersion: 2020,
      sourceType: "module",
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
    files: ["**/*.ts", "**/*.tsx"],
    rules: {
        "@typescript-eslint/explicit-module-boundary-types": "error",
        "@typescript-eslint/interface-name-prefix": "off",
        "@typescript-eslint/member-delimiter-style": "off",
        "@typescript-eslint/no-empty-interface": "off",
    },
  },
])
