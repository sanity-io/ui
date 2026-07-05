import path from 'node:path'

import type {StorybookConfig} from '@storybook/react-vite'
import viteReact from '@vitejs/plugin-react'
import {mergeConfig} from 'vite'

// Resolve `@sanity/ui` to the package source so that edits to `packages/ui/src`
// hot-reload without a rebuild.
const UI_EXPORTS_PATH = path.resolve(import.meta.dirname, '../../../packages/ui/exports')

const config: StorybookConfig = {
  stories: ['../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
    '@storybook/addon-links',
    '@storybook/addon-themes',
    '@storybook/addon-vitest',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  viteFinal(config) {
    return mergeConfig(config, {
      plugins: [
        viteReact({
          babel: {plugins: [['babel-plugin-react-compiler', {target: '19'}]]},
        }),
      ],
      resolve: {
        alias: {
          '@sanity/ui': UI_EXPORTS_PATH,
        },
      },
    })
  },
}
export default config
