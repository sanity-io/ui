import path from 'path'
import {defineRuntime} from '@sanity/ui-workshop'

const EXPORTS_PATH = path.resolve(__dirname, 'exports')

export default defineRuntime({
  vite: (viteConfig) => ({
    ...viteConfig,
    resolve: {
      ...viteConfig.resolve,
      alias: {
        ...viteConfig.resolve?.alias,
        '@sanity/ui-workshop/plugin-a11y': path.resolve(EXPORTS_PATH, 'plugin-a11y'),
        '@sanity/ui-workshop/plugin-perf': path.resolve(EXPORTS_PATH, 'plugin-perf'),
        '@sanity/ui-workshop/runtime': path.resolve(EXPORTS_PATH, 'runtime'),
        '@sanity/ui-workshop': EXPORTS_PATH,
      },
    },
  }),
})
