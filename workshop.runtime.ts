import replace from '@rollup/plugin-replace'
import {defineRuntime} from '@sanity/ui-workshop'
import path from 'path'

import {prefix} from './prefix'

export default defineRuntime({
  vite: (viteConfig) => {
    return {
      ...viteConfig,

      build: {
        rollupOptions: {
          plugins: [
            replace({
              [`const PREFIX = 's-'`]: `const PREFIX = '${prefix}-'`,
            }),
          ],
        },
      },

      resolve: {
        ...viteConfig.resolve,
        alias: {
          ...viteConfig.resolve?.alias,
          '@sanity/ui': path.resolve(__dirname, 'exports'),
        },
      },
    }
  },
})
