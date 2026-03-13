import {_vanillaExtractIdentifiers} from '@sanity/ui-css/vanilla-extract'
import type {WorkshopRuntimeOptions} from '@sanity/ui-workshop/runtime'
import {vanillaExtractPlugin} from '@vanilla-extract/vite-plugin'
import path from 'path'
import {fileURLToPath} from 'url'
import {mergeConfig} from 'vite'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const runtime: WorkshopRuntimeOptions = {
  server: {
    port: 1338,
  },
  vite: (viteConfig) => {
    return mergeConfig(viteConfig, {
      optimizeDeps: {
        exclude: ['@sanity/ui-css', '@sanity/ui-tokens'],
      },
      plugins: [
        vanillaExtractPlugin({
          identifiers: _vanillaExtractIdentifiers,
        }),
      ],
      resolve: {
        alias: {
          '@sanity/ui': path.resolve(__dirname, '../ui/dist'),
          '@sanity/ui-css': path.resolve(__dirname, './exports'),
          '@sanity/ui-tokens': path.resolve(__dirname, '../ui-tokens/exports'),
        },
      },
    })
  },
}

export default runtime
