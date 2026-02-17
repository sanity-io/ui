import {defineConfig} from '@repo/eslint-config'
import boundaries from 'eslint-plugin-boundaries'

export default defineConfig(import.meta.dirname, [
  {
    ignores: ['**/__fixtures__/**', '.workshop', 'dist', 'tmp'],
  },

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
])
