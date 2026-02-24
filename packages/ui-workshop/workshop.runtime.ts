import path from 'node:path'
import {fileURLToPath} from 'node:url'

import {defineRuntime} from '@sanity/ui-workshop/runtime'
import {vanillaExtractPlugin} from '@vanilla-extract/vite-plugin'
import {mergeConfig} from 'vite'

import {vanillaExtractIdentifiers} from './vanilla-extract/identifiers'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const DIST_PATH = path.resolve(__dirname, 'dist')
const EXPORTS_PATH = path.resolve(__dirname, 'exports')

const UI_DIST_PATH = path.resolve(__dirname, '../ui/dist')
const UI_EXPORTS_PATH = path.resolve(__dirname, '../ui/exports')

export default defineRuntime({
  vite: (viteConfig) => {
    const isProd = viteConfig.mode === 'production'

    return mergeConfig(viteConfig, {
      plugins: [vanillaExtractPlugin({identifiers: vanillaExtractIdentifiers})],

      optimizeDeps: {
        exclude: ['@sanity/ui-workshop'],
      },

      resolve: {
        alias: isProd
          ? {
              '@sanity/ui': UI_DIST_PATH,
              '@sanity/ui-workshop': DIST_PATH,
            }
          : {
              '@sanity/ui': UI_EXPORTS_PATH,
              '@sanity/ui-workshop': EXPORTS_PATH,
            },
      },
    })
  },
})
