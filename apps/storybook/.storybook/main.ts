import type {StorybookConfig} from '@storybook/react-vite'
import {Features} from 'lightningcss'

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@chromatic-com/storybook',
    '@storybook/addon-vitest',
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
    'storybook-dark-mode',
  ],
  framework: '@storybook/react-vite',
  typescript: {
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
    },
  },
  async viteFinal(viteConfig) {
    return {
      ...viteConfig,
      css: {
        ...viteConfig.css,
        lightningcss: {
          ...viteConfig.css?.lightningcss,
          exclude: Features.LightDark,
        },
      },
    }
  },
}
export default config
