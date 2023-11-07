import path from 'path'
import {defineRuntime} from '@sanity/ui-workshop'

const SRC_PATH = path.resolve(__dirname, 'src')

export default defineRuntime({
  vite: (viteConfig) => ({
    ...viteConfig,
    resolve: {
      ...viteConfig.resolve,
      alias: {
        ...viteConfig.resolve?.alias,
        '@sanity/ui': SRC_PATH,
      },
    },
  }),
})
