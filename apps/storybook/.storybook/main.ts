import {vanillaExtractPlugin} from '@sanity/vanilla-extract-vite-plugin'
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
        // `compiler` runs the React Compiler natively via `oxc-transform-react`
        // (the Rust port) in the same pass as TypeScript/JSX — no babel
        viteReact({compiler: {target: '19'}}),
        // @sanity/ui resolves to its TypeScript source (dev `exports`), so its
        // vanilla-extract `.css.ts` modules must be compiled here
        vanillaExtractPlugin(),
      ],
    })
  },
}
export default config
