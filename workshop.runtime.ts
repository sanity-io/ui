import path from 'path'
import {pigment} from '@pigment-css/vite-plugin'
import {defineRuntime} from '@sanity/ui-workshop'
import {vanillaExtractPlugin} from '@vanilla-extract/vite-plugin'
import {stylex} from 'vite-plugin-stylex-dev'
import {buildTheme} from './src/theme'

const EXPORTS_PATH = path.resolve(__dirname, 'exports')

export default defineRuntime({
  vite: (viteConfig) => ({
    ...viteConfig,
    plugins: [
      ...(viteConfig.plugins || []),
      pigment({
        theme: buildTheme(),
      }),
      stylex(),
      vanillaExtractPlugin(),
    ],
    resolve: {
      ...viteConfig.resolve,
      alias: {
        ...viteConfig.resolve?.alias,
        '@sanity/ui': EXPORTS_PATH,
      },
    },
  }),
})
