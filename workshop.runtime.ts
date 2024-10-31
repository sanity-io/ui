import {defineRuntime} from '@sanity/ui-workshop'
import path from 'path'

export default defineRuntime({
  vite: (viteConfig) => ({
    ...viteConfig,
    resolve: {
      ...viteConfig.resolve,
      alias: {
        ...viteConfig.resolve?.alias,
        '@sanity/ui': path.resolve(__dirname, 'exports'),
      },
    },
  }),
})
