import {defineConfig} from '@repo/eslint-config'
import boundaries from 'eslint-plugin-boundaries'
import {layers} from './system.config.js'

export default defineConfig(import.meta.dirname, [
  {
    ignores: ['.turbo', 'dist', 'tmp'],
  },

  {
    files: ['src/**/*.ts', 'exports/**/*.ts'],
    ignores: ['**/*.test.ts', '**/*.spec.ts'],
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
              pattern: `exports/${c.name}.ts`,
              mode: 'file',
            },
          ]
        }),

        // source/*
        {type: 'source/constants', pattern: 'src/constants.ts', mode: 'file'},
        {type: 'source/types', pattern: 'src/types.ts', mode: 'file'},
        {type: 'source/lib/color', pattern: 'src/lib/color/*.ts', mode: 'file'},
        {type: 'source/lib', pattern: 'src/lib/**/*.ts', mode: 'file'},
        {type: 'source/primitive/font/lib', pattern: 'src/primitive/font/lib/*.ts', mode: 'file'},
        {type: 'source/decision/color/lib', pattern: 'src/decision/color/*.ts', mode: 'file'},
        {type: 'source/build/color/scheme', pattern: 'src/build/color/scheme/*.ts', mode: 'file'},
        {type: 'source/semantic/tokens', pattern: 'src/semantic/tokens.ts', mode: 'file'},
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
              allow: ['source/lib/color', 'source/computed/color/lib', 'source/primitive/font/lib', 'source/lib'],
            },
            {
              from: 'source/lib/color',
              allow: ['source/lib', 'source/lib/color', 'source/types', 'source/constants'],
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
                'source/lib/color',
                'source/types',
                ...(c.importsFrom?.map((n) => `source/${n}`) ?? []),
              ],
            })),
            {
              from: 'source/primitive/font/lib',
              allow: ['source/lib', 'source/primitive/font/lib'],
            },
            {
              from: 'source/decision/color/lib',
              allow: ['source/lib', 'source/types', 'source/constants', 'source/decision/color/lib'],
            },
            {
              from: 'source/build/color/scheme',
              allow: ['source/lib', 'source/lib/color', 'source/types', 'source/constants', 'source/decision/color/lib', 'source/color/palette'],
            },
            {
              from: 'source/semantic/tokens',
              allow: ['source/lib', 'source/lib/color', 'source/types', 'source/constants', 'source/build/color/scheme', 'source/color/palette'],
            },
            {
              from: 'source/computed/color/lib',
              allow: [
                'source/lib',
                'source/lib/color',
                'source/constants',
                'source/types',
                'source/computed/color/lib',
              ],
            },
            {
              from: 'source/system',
              allow: [
                'exports/*',
                'exports/primitive/**/*',
                'exports/build/**/*',
                'exports/semantic/**/*',
                'exports/decision/**/*',
                'exports/context/**/*',
                'exports/component/**/*',
              ],
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
              from: 'source/lib/color',
              allow: ['@sanity/color', 'colorjs.io', 'zod'],
            },
            {
              from: 'source/decision/color/lib',
              allow: ['@sanity/color', 'zod'],
            },
            {
              from: 'source/build/color/scheme',
              allow: ['@sanity/color', 'colorjs.io', 'zod'],
            },
            {
              from: 'source/computed/color/lib',
              allow: ['@sanity/color', 'colorjs.io', 'zod'],
            },
            {
              from: 'source/primitive/font/lib',
              allow: ['zod'],
            },
            {
              from: 'source/primitive/color/palette',
              allow: ['@sanity/color', 'zod'],
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
