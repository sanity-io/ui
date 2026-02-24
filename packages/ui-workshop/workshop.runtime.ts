import path from 'node:path'
import {fileURLToPath} from 'node:url'

import {vanillaExtractPlugin} from '@vanilla-extract/vite-plugin'
import {mergeConfig} from 'vite'

import {defineRuntime} from './src/core'

import {vanillaExtractIdentifiers} from './vanilla-extract/identifiers'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default defineRuntime({
  server: {
    port: 1339,
  },
  vite: (viteConfig) => {
    return mergeConfig(viteConfig, {
      plugins: [vanillaExtractPlugin({identifiers: vanillaExtractIdentifiers})],

      optimizeDeps: {
        exclude: ['@sanity/ui', '@sanity/ui-workshop'],
      },

      resolve: {
        alias: {
          '@sanity/ui': path.resolve(__dirname, '../ui/exports'),
          '@sanity/ui-workshop': path.resolve(__dirname, 'exports'),
        },
      },
    })
  },
})
