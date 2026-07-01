import path from 'path'

import {defineRuntime} from '@sanity/ui-workshop'

export default defineRuntime({
  vite: (viteConfig) => ({
    ...viteConfig,
    resolve: {
      ...viteConfig.resolve,
      alias: {
        // oxlint-disable-next-line typescript/no-misused-spread
        ...viteConfig.resolve?.alias,
        '@sanity/icons': path.resolve(__dirname, 'src'),
      },
    },
  }),
})
