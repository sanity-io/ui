import path from 'node:path'

import type {StorybookConfig} from '@storybook/react-vite'
import viteReact from '@vitejs/plugin-react'
import {mergeConfig} from 'vite'

// oxlint-disable-next-line no-restricted-globals
const EXPORTS_PATH = path.resolve(__dirname, '../exports')

const config: StorybookConfig = {
  stories: ['../stories/**/*.mdx', '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-a11y',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-storysource',
    '@storybook/addon-themes',
    '@storybook/addon-mdx-gfm',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  viteFinal(config) {
    return mergeConfig(config, {
      plugins: [
        viteReact({
          babel: {plugins: [['babel-plugin-react-compiler', {target: '19'}]]},
        }),
      ],
      resolve: {
        // Resolve `@sanity/ui` self-references to source, like the
        // `@sanity/ui:source` condition in package.json `exports` does for tsc
        alias: {'@sanity/ui': EXPORTS_PATH},
      },
    })
  },
}
export default config
