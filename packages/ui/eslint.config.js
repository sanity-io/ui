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
          type: 'test/cypress',
          pattern: ['cypress/**/*'],
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
          type: 'configs/vanilla-extract',
          pattern: ['vanilla-extract/**/*'],
          mode: 'full',
        },
        {
          type: 'configs',
          pattern: [
            'cypress.config.ts',
            'eslint.config.js',
            'package.config.ts',
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
          type: '@sanity/ui/components/autocomplete',
          pattern: ['exports/components/autocomplete.ts'],
          mode: 'file',
        },
        {
          type: '@sanity/ui/components/breadcrumbs',
          pattern: ['exports/components/breadcrumbs.ts'],
          mode: 'file',
        },
        {
          type: '@sanity/ui/components/dialog',
          pattern: ['exports/components/dialog.ts'],
          mode: 'file',
        },
        {
          type: '@sanity/ui/components/hotkeys',
          pattern: ['exports/components/hotkeys.ts'],
          mode: 'file',
        },
        {
          type: '@sanity/ui/components/menu',
          pattern: ['exports/components/menu.ts'],
          mode: 'file',
        },
        {
          type: '@sanity/ui/components/tab',
          pattern: ['exports/components/tab.ts'],
          mode: 'file',
        },
        {
          type: '@sanity/ui/components/toast',
          pattern: ['exports/components/toast.ts'],
          mode: 'file',
        },
        {
          type: '@sanity/ui/components/tree',
          pattern: ['exports/components/tree.ts'],
          mode: 'file',
        },
        {
          type: '@sanity/ui/components/virtual-list',
          pattern: ['exports/components/virtualList.ts'],
          mode: 'file',
        },
        {
          type: '@sanity/ui/css',
          pattern: ['exports/css.ts'],
          mode: 'file',
        },
        {
          type: '@sanity/ui/primitives/_syntax',
          pattern: ['exports/primitives/_syntax.ts'],
          mode: 'file',
        },
        {
          type: '@sanity/ui/primitives/avatar',
          pattern: ['exports/primitives/avatar.ts'],
          mode: 'file',
        },
        {
          type: '@sanity/ui/primitives/badge',
          pattern: ['exports/primitives/badge.ts'],
          mode: 'file',
        },
        {
          type: '@sanity/ui/primitives/box',
          pattern: ['exports/primitives/box.ts'],
          mode: 'file',
        },
        {
          type: '@sanity/ui/primitives/button',
          pattern: ['exports/primitives/button.ts'],
          mode: 'file',
        },
        {
          type: '@sanity/ui/primitives/card',
          pattern: ['exports/primitives/card.ts'],
          mode: 'file',
        },
        {
          type: '@sanity/ui/primitives/checkbox',
          pattern: ['exports/primitives/checkbox.ts'],
          mode: 'file',
        },
        {
          type: '@sanity/ui/primitives/code',
          pattern: ['exports/primitives/code.ts'],
          mode: 'file',
        },
        {
          type: '@sanity/ui/primitives/container',
          pattern: ['exports/primitives/container.ts'],
          mode: 'file',
        },
        {
          type: '@sanity/ui/primitives/flex',
          pattern: ['exports/primitives/flex.ts'],
          mode: 'file',
        },
        {
          type: '@sanity/ui/primitives/grid',
          pattern: ['exports/primitives/grid.ts'],
          mode: 'file',
        },
        {
          type: '@sanity/ui/primitives/heading',
          pattern: ['exports/primitives/heading.ts'],
          mode: 'file',
        },
        {
          type: '@sanity/ui/primitives/inline',
          pattern: ['exports/primitives/inline.ts'],
          mode: 'file',
        },
        {
          type: '@sanity/ui/primitives/kbd',
          pattern: ['exports/primitives/kbd.ts'],
          mode: 'file',
        },
        {
          type: '@sanity/ui/primitives/label',
          pattern: ['exports/primitives/label.ts'],
          mode: 'file',
        },
        {
          type: '@sanity/ui/primitives/layer',
          pattern: ['exports/primitives/layer.ts'],
          mode: 'file',
        },
        {
          type: '@sanity/ui/primitives/popover',
          pattern: ['exports/primitives/popover.ts'],
          mode: 'file',
        },
        {
          type: '@sanity/ui/primitives/radio',
          pattern: ['exports/primitives/radio.ts'],
          mode: 'file',
        },
        {
          type: '@sanity/ui/primitives/select',
          pattern: ['exports/primitives/select.ts'],
          mode: 'file',
        },
        {
          type: '@sanity/ui/primitives/selectable',
          pattern: ['exports/primitives/selectable.ts'],
          mode: 'file',
        },
        {
          type: '@sanity/ui/primitives/skeleton',
          pattern: ['exports/primitives/skeleton.ts'],
          mode: 'file',
        },
        {
          type: '@sanity/ui/primitives/spinner',
          pattern: ['exports/primitives/spinner.ts'],
          mode: 'file',
        },
        {
          type: '@sanity/ui/primitives/sr-only',
          pattern: ['exports/primitives/sr-only.ts'],
          mode: 'file',
        },
        {
          type: '@sanity/ui/primitives/stack',
          pattern: ['exports/primitives/stack.ts'],
          mode: 'file',
        },
        {
          type: '@sanity/ui/primitives/switch',
          pattern: ['exports/primitives/switch.ts'],
          mode: 'file',
        },
        {
          type: '@sanity/ui/primitives/text-area',
          pattern: ['exports/primitives/text-area.ts'],
          mode: 'file',
        },
        {
          type: '@sanity/ui/primitives/text-input',
          pattern: ['exports/primitives/text-input.ts'],
          mode: 'file',
        },
        {
          type: '@sanity/ui/primitives/text',
          pattern: ['exports/primitives/text.ts'],
          mode: 'file',
        },
        {
          type: '@sanity/ui/primitives/tooltip',
          pattern: ['exports/primitives/tooltip.ts'],
          mode: 'file',
        },
        {
          type: '@sanity/ui/theme',
          pattern: ['exports/theme.ts'],
          mode: 'file',
        },
        {
          type: '@sanity/ui',
          pattern: ['exports/index.ts'],
          mode: 'file',
        },

        // modules
        {
          type: 'src/components/autocomplete',
          pattern: ['src/components/autocomplete/**/*'],
          mode: 'full',
        },
        {
          type: 'src/components/breadcrumbs',
          pattern: ['src/components/breadcrumbs/**/*'],
          mode: 'full',
        },
        {
          type: 'src/components/dialog',
          pattern: ['src/components/dialog/**/*'],
          mode: 'full',
        },
        {
          type: 'src/components/hotkeys',
          pattern: ['src/components/hotkeys/**/*'],
          mode: 'full',
        },
        {
          type: 'src/components/menu',
          pattern: ['src/components/menu/**/*'],
          mode: 'full',
        },
        {
          type: 'src/components/tab',
          pattern: ['src/components/tab/**/*'],
          mode: 'full',
        },
        {
          type: 'src/components/toast',
          pattern: ['src/components/toast/**/*'],
          mode: 'full',
        },
        {
          type: 'src/components/tree',
          pattern: ['src/components/tree/**/*'],
          mode: 'full',
        },
        {
          type: 'src/components/virtual-list',
          pattern: ['src/components/virtualList/**/*'],
          mode: 'full',
        },
        {
          type: 'src/primitives/_syntax',
          pattern: ['src/primitives/_syntax/**/*'],
          mode: 'full',
        },
        {
          type: 'src/primitives/avatar',
          pattern: ['src/primitives/avatar/**/*'],
          mode: 'full',
        },
        {
          type: 'src/primitives/badge',
          pattern: ['src/primitives/badge/**/*'],
          mode: 'full',
        },
        {
          type: 'src/primitives/box',
          pattern: ['src/primitives/box/**/*'],
          mode: 'full',
        },
        {
          type: 'src/primitives/button',
          pattern: ['src/primitives/button/**/*'],
          mode: 'full',
        },
        {
          type: 'src/primitives/card',
          pattern: ['src/primitives/card/**/*'],
          mode: 'full',
        },
        {
          type: 'src/primitives/checkbox',
          pattern: ['src/primitives/checkbox/**/*'],
          mode: 'full',
        },
        {
          type: 'src/primitives/code',
          pattern: ['src/primitives/code/**/*'],
          mode: 'full',
        },
        {
          type: 'src/primitives/container',
          pattern: ['src/primitives/container/**/*'],
          mode: 'full',
        },
        {
          type: 'src/primitives/flex',
          pattern: ['src/primitives/flex/**/*'],
          mode: 'full',
        },
        {
          type: 'src/primitives/grid',
          pattern: ['src/primitives/grid/**/*'],
          mode: 'full',
        },
        {
          type: 'src/primitives/heading',
          pattern: ['src/primitives/heading/**/*'],
          mode: 'full',
        },
        {
          type: 'src/primitives/inline',
          pattern: ['src/primitives/inline/**/*'],
          mode: 'full',
        },
        {
          type: 'src/primitives/kbd',
          pattern: ['src/primitives/kbd/**/*'],
          mode: 'full',
        },
        {
          type: 'src/primitives/label',
          pattern: ['src/primitives/label/**/*'],
          mode: 'full',
        },
        {
          type: 'src/primitives/layer',
          pattern: ['src/primitives/layer/**/*'],
          mode: 'full',
        },
        {
          type: 'src/primitives/popover',
          pattern: ['src/primitives/popover/**/*'],
          mode: 'full',
        },
        {
          type: 'src/primitives/radio',
          pattern: ['src/primitives/radio/**/*'],
          mode: 'full',
        },
        {
          type: 'src/primitives/select',
          pattern: ['src/primitives/select/**/*'],
          mode: 'full',
        },
        {
          type: 'src/primitives/selectable',
          pattern: ['src/primitives/selectable/**/*'],
          mode: 'full',
        },
        {
          type: 'src/primitives/skeleton',
          pattern: ['src/primitives/skeleton/**/*'],
          mode: 'full',
        },
        {
          type: 'src/primitives/spinner',
          pattern: ['src/primitives/spinner/**/*'],
          mode: 'full',
        },
        {
          type: 'src/primitives/sr-only',
          pattern: ['src/primitives/sr-only/**/*'],
          mode: 'full',
        },
        {
          type: 'src/primitives/stack',
          pattern: ['src/primitives/stack/**/*'],
          mode: 'full',
        },
        {
          type: 'src/primitives/switch',
          pattern: ['src/primitives/switch/**/*'],
          mode: 'full',
        },
        {
          type: 'src/primitives/text-area',
          pattern: ['src/primitives/text-area/**/*'],
          mode: 'full',
        },
        {
          type: 'src/primitives/text-input',
          pattern: ['src/primitives/text-input/**/*'],
          mode: 'full',
        },
        {
          type: 'src/primitives/text',
          pattern: ['src/primitives/text/**/*'],
          mode: 'full',
        },
        {
          type: 'src/primitives/tooltip',
          pattern: ['src/primitives/tooltip/**/*'],
          mode: 'full',
        },
        {
          type: 'src/core',
          pattern: ['src/core/**/*'],
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
            {from: 'configs', allow: ['configs', 'configs/vanilla-extract', 'package']},

            {from: '@sanity/ui/components/autocomplete', allow: ['src/components/autocomplete']},
            {from: '@sanity/ui/components/breadcrumbs', allow: ['src/components/breadcrumbs']},
            {from: '@sanity/ui/components/dialog', allow: ['src/components/dialog']},
            {from: '@sanity/ui/components/hotkeys', allow: ['src/components/hotkeys']},
            {from: '@sanity/ui/components/menu', allow: ['src/components/menu']},
            {from: '@sanity/ui/components/tab', allow: ['src/components/tab']},
            {from: '@sanity/ui/components/toast', allow: ['src/components/toast']},
            {from: '@sanity/ui/components/tree', allow: ['src/components/tree']},
            {from: '@sanity/ui/components/virtual-list', allow: ['src/components/virtual-list']},

            {from: '@sanity/ui/primitives/_syntax', allow: ['src/primitives/_syntax']},
            {from: '@sanity/ui/primitives/avatar', allow: ['src/primitives/avatar']},
            {from: '@sanity/ui/primitives/badge', allow: ['src/primitives/badge']},
            {from: '@sanity/ui/primitives/box', allow: ['src/primitives/box']},
            {from: '@sanity/ui/primitives/button', allow: ['src/primitives/button']},
            {from: '@sanity/ui/primitives/breadcrumbs', allow: ['src/primitives/breadcrumbs']},
            {from: '@sanity/ui/primitives/button', allow: ['src/primitives/button']},
            {from: '@sanity/ui/primitives/card', allow: ['src/primitives/card']},
            {from: '@sanity/ui/primitives/checkbox', allow: ['src/primitives/checkbox']},
            {from: '@sanity/ui/primitives/code', allow: ['src/primitives/code']},
            {from: '@sanity/ui/primitives/container', allow: ['src/primitives/container']},
            {from: '@sanity/ui/primitives/flex', allow: ['src/primitives/flex']},
            {from: '@sanity/ui/primitives/grid', allow: ['src/primitives/grid']},
            {from: '@sanity/ui/primitives/heading', allow: ['src/primitives/heading']},
            {from: '@sanity/ui/primitives/inline', allow: ['src/primitives/inline']},
            {from: '@sanity/ui/primitives/kbd', allow: ['src/primitives/kbd']},
            {from: '@sanity/ui/primitives/label', allow: ['src/primitives/label']},
            {from: '@sanity/ui/primitives/layer', allow: ['src/primitives/layer']},
            {from: '@sanity/ui/primitives/popover', allow: ['src/primitives/popover']},
            {from: '@sanity/ui/primitives/radio', allow: ['src/primitives/radio']},
            {from: '@sanity/ui/primitives/select', allow: ['src/primitives/select']},
            {from: '@sanity/ui/primitives/selectable', allow: ['src/primitives/selectable']},
            {from: '@sanity/ui/primitives/skeleton', allow: ['src/primitives/skeleton']},
            {from: '@sanity/ui/primitives/spinner', allow: ['src/primitives/spinner']},
            {from: '@sanity/ui/primitives/sr-only', allow: ['src/primitives/sr-only']},
            {from: '@sanity/ui/primitives/stack', allow: ['src/primitives/stack']},
            {from: '@sanity/ui/primitives/switch', allow: ['src/primitives/switch']},
            {from: '@sanity/ui/primitives/text-area', allow: ['src/primitives/text-area']},
            {from: '@sanity/ui/primitives/text-input', allow: ['src/primitives/text-input']},
            {from: '@sanity/ui/primitives/text', allow: ['src/primitives/text']},
            {from: '@sanity/ui/primitives/tooltip', allow: ['src/primitives/tooltip']},
            {from: '@sanity/ui/css', allow: []},
            {from: '@sanity/ui/theme', allow: []},
            {from: '@sanity/ui', allow: []},

            {
              from: 'src/components/autocomplete',
              allow: [
                '@sanity/ui/css',
                '@sanity/ui/primitives/*',
                '@sanity/ui/theme',
                'src/components/autocomplete',
              ],
            },
            {
              from: 'src/components/breadcrumbs',
              allow: ['@sanity/ui/css', '@sanity/ui/primitives/*', 'src/components/breadcrumbs'],
            },
            {
              from: 'src/components/dialog',
              allow: [
                '@sanity/ui/css',
                '@sanity/ui/theme',
                '@sanity/ui/primitives/*',
                'src/components/dialog',
              ],
            },
            {
              from: 'src/components/hotkeys',
              allow: ['@sanity/ui/css', '@sanity/ui/primitives/*', 'src/components/hotkeys'],
            },
            {
              from: 'src/components/menu',
              allow: [
                '@sanity/ui/components/hotkeys',
                '@sanity/ui/css',
                '@sanity/ui/primitives/*',
                '@sanity/ui/theme',
                'src/components/menu',
              ],
            },
            {
              from: 'src/components/tab',
              allow: [
                '@sanity/ui/css',
                '@sanity/ui/primitives/*',
                '@sanity/ui/theme',
                'src/components/tab',
              ],
            },
            {
              from: 'src/components/toast',
              allow: ['@sanity/ui/css', '@sanity/ui/primitives/*', 'src/components/toast'],
            },
            {
              from: 'src/components/tree',
              allow: [
                '@sanity/ui/css',
                '@sanity/ui/primitives/*',
                '@sanity/ui/theme',
                'src/components/tree',
              ],
            },
            {
              from: 'src/components/virtual-list',
              allow: [
                '@sanity/ui/css',
                '@sanity/ui/primitives/*',
                '@sanity/ui/theme',
                'src/components/virtual-list',
              ],
            },

            // primitives
            {
              from: 'src/primitives/_syntax',
              allow: ['@sanity/ui/css', 'src/primitives/_syntax'],
            },
            {
              from: 'src/primitives/avatar',
              allow: [
                '@sanity/ui/css',
                '@sanity/ui/primitives/box',
                '@sanity/ui/primitives/label',
                '@sanity/ui/theme',
                'src/primitives/avatar',
              ],
            },
            {
              from: 'src/primitives/badge',
              allow: [
                '@sanity/ui/css',
                '@sanity/ui/primitives/text',
                '@sanity/ui/theme',
                'src/primitives/badge',
              ],
            },
            {
              from: 'src/primitives/button',
              allow: [
                '@sanity/ui/css',
                '@sanity/ui/primitives/box',
                '@sanity/ui/primitives/spinner',
                '@sanity/ui/primitives/text',
                '@sanity/ui/primitives/tooltip',
                '@sanity/ui/theme',
                'src/primitives/button',
              ],
            },
            {
              from: 'src/primitives/box',
              allow: ['@sanity/ui/css', 'src/primitives/box'],
            },
            {
              from: 'src/primitives/card',
              allow: [
                '@sanity/ui/css',
                '@sanity/ui/primitives/box',
                '@sanity/ui/theme',
                'src/primitives/card',
              ],
            },
            {
              from: 'src/primitives/checkbox',
              allow: ['@sanity/ui/css', 'src/primitives/checkbox'],
            },
            {
              from: 'src/primitives/code',
              allow: ['@sanity/ui/css', '@sanity/ui/primitives/_syntax', 'src/primitives/code'],
            },
            {
              from: 'src/primitives/container',
              allow: [
                '@sanity/ui/css',
                '@sanity/ui/primitives/box',
                '@sanity/ui/theme',
                'src/primitives/container',
              ],
            },
            {
              from: 'src/primitives/flex',
              allow: ['@sanity/ui/css', '@sanity/ui/primitives/box', 'src/primitives/flex'],
            },
            {
              from: 'src/primitives/grid',
              allow: ['@sanity/ui/css', '@sanity/ui/primitives/box', 'src/primitives/grid'],
            },
            {
              from: 'src/primitives/heading',
              allow: ['@sanity/ui/css', 'src/primitives/heading'],
            },
            {
              from: 'src/primitives/inline',
              allow: ['@sanity/ui/css', '@sanity/ui/primitives/box', 'src/primitives/inline'],
            },
            {
              from: 'src/primitives/kbd',
              allow: ['@sanity/ui/css', 'src/primitives/kbd'],
            },
            {
              from: 'src/primitives/label',
              allow: ['@sanity/ui/css', 'src/primitives/label'],
            },
            {
              from: 'src/primitives/layer',
              allow: ['@sanity/ui/css', '@sanity/ui/primitives/card', 'src/primitives/layer'],
            },
            {
              from: 'src/primitives/popover',
              allow: [
                '@sanity/ui/css',
                '@sanity/ui/primitives/flex',
                '@sanity/ui/primitives/layer',
                '@sanity/ui/theme',
                'src/primitives/popover',
              ],
            },
            {
              from: 'src/primitives/radio',
              allow: ['@sanity/ui/css', 'src/primitives/radio'],
            },
            {
              from: 'src/primitives/select',
              allow: ['@sanity/ui/css', '@sanity/ui/primitives/text', 'src/primitives/select'],
            },
            {
              from: 'src/primitives/selectable',
              allow: ['@sanity/ui/css', 'src/primitives/selectable'],
            },
            {
              from: 'src/primitives/skeleton',
              allow: ['@sanity/ui/css', '@sanity/ui/theme', 'src/primitives/skeleton'],
            },
            {
              from: 'src/primitives/spinner',
              allow: [
                '@sanity/ui/css',
                '@sanity/ui/primitives/text',
                '@sanity/ui/theme',
                'src/primitives/spinner',
              ],
            },
            {
              from: 'src/primitives/stack',
              allow: ['@sanity/ui/css', '@sanity/ui/primitives/box', 'src/primitives/stack'],
            },
            {
              from: 'src/primitives/switch',
              allow: ['@sanity/ui/core', '@sanity/ui/css', 'src/primitives/switch'],
            },
            {
              from: 'src/primitives/text',
              allow: [
                '@sanity/ui/core',
                '@sanity/ui/css',
                '@sanity/ui/primitives/_syntax',
                'src/primitives/text',
              ],
            },
            {
              // TODO: make this a component
              from: 'src/primitives/tooltip',
              allow: [
                '@sanity/ui/core',
                '@sanity/ui/css',
                '@sanity/ui/components/hotkeys',
                '@sanity/ui/primitives/layer',
                '@sanity/ui/primitives/text',
                '@sanity/ui/theme',
                'src/primitives/tooltip',
              ],
            },

            {from: 'src/core', allow: ['@sanity/ui/css', 'src/core']},

            {
              from: 'test',
              allow: [
                // TODO: consider if this is good practice
                'src/*',
                'src/*/*',
                'test',
              ],
            },
            {
              from: 'test/workshop',
              allow: ['@sanity/ui', '@sanity/ui/css', '@sanity/ui/theme', 'test/workshop'],
            },
          ],
        },
      ],

      'boundaries/no-private': 'off',
    },
  },
])
