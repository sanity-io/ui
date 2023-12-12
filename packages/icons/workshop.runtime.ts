import path from 'path'
import {defineRuntime} from '@sanity/ui-workshop'

export default defineRuntime({
  vite: (viteConfig) => ({
    ...viteConfig,
    resolve: {
      ...viteConfig.resolve,
      alias: {
        ...viteConfig.resolve?.alias,
        '@sanity/icons': path.resolve(__dirname, 'src'),
      },
    },
  }),
})
