import {defineRuntime} from '@sanity/ui-workshop'
import path from 'path'

const EXPORTS_PATH = path.resolve(__dirname, 'exports')

export default defineRuntime({
  vite: (viteConfig) => ({
    ...viteConfig,
    resolve: {
      ...viteConfig.resolve,
      alias: {
        ...viteConfig.resolve?.alias,
        '@sanity/ui': EXPORTS_PATH,
      },
    },
  }),
})
