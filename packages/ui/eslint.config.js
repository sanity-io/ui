import boundaries from 'eslint-plugin-boundaries'

import {defineConfig} from '@repo/eslint-config'

export default defineConfig(import.meta.dirname, [
  {
    ignores: ['.turbo', '.workshop', 'dist', 'test-results', 'playwright-report', 'tmp'],
  },

  // boundaries
  {
    plugins: {boundaries},

    settings: {
      // Helps the plugin resolve patterns consistently in monorepos / ESM
      'boundaries/root-path': import.meta.dirname,

      'import/resolver': {
        typescript: true,
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx', '.mjs', '.cjs'],
        },
      },

      'boundaries/flag-as-external': {
        unresolvableAlias: true,
        inNodeModules: true,
        outsideRootPath: false,
        customSourcePatterns: ['@sanity/ui-css', '@sanity/ui-tokens', '@sanity/ui-workshop'],
      },

      'boundaries/elements': [
        // tests
        {
          type: 'test',
          pattern: ['test/**/*', 'src/**/*.test.*'],
          mode: 'full',
        },
        {
          type: 'test/e2e',
          pattern: ['e2e/**/*'],
          mode: 'full',
        },
        {
          type: 'test/workshop',
          pattern: ['workshop/**/*', 'src/**/__workshop__/**/*'],
          mode: 'full',
        },

        // package.json
        {
          type: 'package',
          pattern: ['package.json'],
          mode: 'file',
        },

        // configs
        {
          type: 'configs',
          pattern: [
            'cypress.config.ts',
            'eslint.config.js',
            'package.config.ts',
            'playwright.config.ts',
            'workshop.config.ts',
            'workshop.runtime.ts',
            'vitest.config.ts',
          ],
          mode: 'file',
        },

        // typings
        {
          type: 'typings',
          pattern: ['typings/**/*'],
          mode: 'full',
        },

        // exports
        {
          type: '@sanity/ui',
          pattern: ['exports/index.ts'],
          mode: 'file',
        },
        {
          type: '@sanity/ui',
          pattern: ['exports/css.ts'],
          mode: 'file',
        },
        {
          type: '@sanity/ui',
          pattern: ['exports/theme.ts'],
          mode: 'file',
        },

        // modules
        {
          type: 'src/core',
          pattern: ['src/core/**/*'],
          mode: 'full',
        },
        {
          type: 'src/css',
          pattern: ['src/css/**/*'],
          mode: 'full',
        },
        {
          type: 'src/theme',
          pattern: ['src/theme/**/*'],
          mode: 'full',
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
            {from: 'configs', allow: ['configs', 'package']},

            {from: '@sanity/ui', allow: ['src/core']},
            {from: '@sanity/ui', allow: ['src/css']},
            {from: '@sanity/ui', allow: ['src/theme']},

            {from: 'src/core', allow: ['@sanity/ui', '@sanity/ui', 'src/core']},
            {from: 'src/css', allow: ['@sanity/ui', 'src/css']},
            {from: 'src/theme', allow: ['src/theme']},

            {
              from: 'test',
              allow: ['src/core', 'src/css', 'src/theme', 'test'],
            },
            {
              from: 'test/workshop',
              allow: ['@sanity/ui', '@sanity/ui', '@sanity/ui', 'test/workshop'],
            },
          ],
        },
      ],

      'boundaries/no-private': 'off',
    },
  },

  // Keep `motion/react` (framer-motion / motion-dom) out of the static module graph. Runtime
  // imports are blocked everywhere; type-only imports are allowed (they erase at build). The lazy
  // chunk modules below are the only places motion may be imported at runtime, reached only via
  // `React.lazy(() => import(...))`.
  {
    files: ['**/*.{ts,tsx}'],
    rules: {
      '@typescript-eslint/no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              // Matches `motion`, `motion/react`, `motion/mini`, `motion/react-client`,
              // `motion/react/dist/...` and every other subpath/entrypoint.
              regex: '^motion(/.*)?$',
              allowTypeImports: true,
              message:
                'Do not import motion at runtime. Import it only from the lazy-loaded chunk modules so it stays out of the static module graph. Type-only imports are allowed.',
            },
            {
              regex: '^motion-dom(/.*)?$',
              allowTypeImports: true,
              message:
                'Do not import motion at runtime. Import it only from the lazy-loaded chunk modules so it stays out of the static module graph. Type-only imports are allowed.',
            },
            {
              regex: '^framer-motion(/.*)?$',
              allowTypeImports: true,
              message:
                'Do not import motion at runtime. Import it only from the lazy-loaded chunk modules so it stays out of the static module graph. Type-only imports are allowed.',
            },
          ],
        },
      ],
    },
  },

  // Whitelist the lazy chunk files (reached only via React.lazy()).
  {
    files: [
      'src/primitives/popover/PopoverLayerAnimated.tsx',
      'src/primitives/tooltip/TooltipLayerAnimated.tsx',
      'src/components/toast/ToastCard.tsx',
      'src/components/toast/ToastList.tsx',
    ],
    rules: {'@typescript-eslint/no-restricted-imports': 'off'},
  },
])
