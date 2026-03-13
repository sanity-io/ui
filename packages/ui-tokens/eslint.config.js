import {defineConfig} from '@repo/eslint-config'
import boundaries from 'eslint-plugin-boundaries'
import importPlugin from 'eslint-plugin-import'
import {layers} from './system.config.js'

export default defineConfig(import.meta.dirname, [
  {
    ignores: ['.turbo', 'dist', 'tmp'],
  },

  {
    files: ['src/**/*.ts', 'exports/**/*.ts'],
    ignores: ['**/*.test.ts', '**/*.spec.ts'],
    extends: [importPlugin.flatConfigs.recommended, importPlugin.flatConfigs.typescript],
    plugins: {boundaries},
    languageOptions: {
      parserOptions: {
        ecmaVersion: 2024,
        sourceType: 'module',
      },
    },
    settings: {
      'import/resolver': {
        node: true,
        typescript: true,
      },

      'boundaries/flag-as-external': {
        inNodeModules: true,
        unresolvableAlias: true,
        outsideRootPath: true,
      },

      'boundaries/elements': [
        // exports/*
        {type: 'exports/constants', pattern: 'exports/constants.ts', mode: 'file'},
        {type: 'exports/lib', pattern: 'exports/lib.ts', mode: 'file'},
        {type: 'exports/types', pattern: 'exports/index.ts', mode: 'file'},
        {type: 'exports/schema', pattern: 'exports/schema.ts', mode: 'file'},
        {type: 'exports/system', pattern: 'exports/system.ts', mode: 'file'},
        ...layers.flatMap((c) => {
          return [
            {
              type: `exports/${c.name}`,
              pattern: `exports/${c.path}.ts`,
              mode: 'file',
            },
          ]
        }),

        // source/*
        {type: 'source/constants', pattern: 'src/constants.ts', mode: 'file'},
        {type: 'source/lib', pattern: 'src/lib/**/*.ts', mode: 'file'},
        {type: 'source/types', pattern: 'src/types.ts', mode: 'file'},
        {type: 'source/color/lib', pattern: 'src/color/lib/*.ts', mode: 'file'},
        {type: 'source/font/lib', pattern: 'src/font/lib/*.ts', mode: 'file'},
        ...layers.flatMap((c) => {
          return [
            {
              type: `source/${c.name}`,
              pattern: `src/${c.path}/tokens.ts`,
              mode: 'file',
            },
          ]
        }),
        {
          type: 'source/system',
          pattern: 'src/system.ts',
          mode: 'file',
        },
      ],
    },
    rules: {
      'boundaries/element-types': [
        'error',
        {
          default: 'disallow',
          rules: [
            // exports/*
            {
              from: 'exports/types',
              allow: ['source/types'],
            },
            {
              from: 'exports/constants',
              allow: ['source/constants'],
            },
            ...layers.map((c) => ({
              from: `exports/${c.name}`,
              allow: [`source/${c.name}`],
            })),

            // source/*
            {
              from: 'source/lib',
              allow: ['source/color/lib', 'source/font/lib', 'source/lib'],
            },
            {
              from: 'source/types',
              allow: ['source/constants'],
            },
            ...layers.map((c) => ({
              from: `source/${c.name}`,
              allow: [
                'source/constants',
                'source/lib',
                'source/types',
                ...(c.importsFrom?.map((n) => `source/${n}`) ?? []),
              ],
            })),
            {
              from: 'source/font/lib',
              allow: ['source/lib', 'source/font/lib'],
            },
            {
              from: 'source/color/lib',
              allow: ['source/lib', 'source/constants', 'source/types', 'source/color/lib'],
            },
            {
              from: 'source/system',
              allow: ['exports/*', 'exports/constants'],
            },
          ],
        },
      ],
      'boundaries/no-unknown-files': 'error',
      'boundaries/no-unknown': 'error',
      'boundaries/external': [
        'error',
        {
          default: 'disallow',
          rules: [
            {
              from: 'source/*',
              allow: ['@sanity/color', 'zod'],
            },
            {
              from: 'source/color/lib',
              allow: ['@sanity/color', 'colorjs.io', 'zod'],
            },
            {
              from: 'source/font/lib',
              allow: ['zod'],
            },
          ],
        },
      ],
      // import plugin: correctness, not architecture
      'import/no-unresolved': 'error',
      'import/no-cycle': 'error',
      'import/no-duplicates': 'error',
      // boundaries owns path restrictions
      'import/no-restricted-paths': 'off',
      'import/no-internal-modules': 'off',
    },
  },
])
