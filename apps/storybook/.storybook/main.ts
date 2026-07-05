import type {StorybookConfig} from '@storybook/react-vite'
import viteReact from '@vitejs/plugin-react'
import {mergeConfig} from 'vite'

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
    })
  },
}
export default config
