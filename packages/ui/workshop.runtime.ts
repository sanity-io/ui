import path from 'path'

import {defineRuntime} from '@sanity/ui-workshop'

// oxlint-disable-next-line no-restricted-globals
const EXPORTS_PATH = path.resolve(__dirname, 'exports')

export default defineRuntime({
  vite: (viteConfig) => ({
    ...viteConfig,
    resolve: {
      ...viteConfig.resolve,
      alias: {
        // oxlint-disable-next-line no-misused-spread
        ...viteConfig.resolve?.alias,
        '@sanity/ui': EXPORTS_PATH,
      },
    },
  }),
})
