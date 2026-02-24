import path from 'node:path'

import type {WorkshopRuntimeOptions} from '@sanity/ui-workshop/runtime'
import {vanillaExtractPlugin} from '@vanilla-extract/vite-plugin'
import {mergeConfig} from 'vite'

import {vanillaExtractIdentifiers} from './vanilla-extract/identifiers'

const __dirname = path.dirname(new URL(import.meta.url).pathname)

const runtime: WorkshopRuntimeOptions = {
  vite: (viteConfig) => {
    return mergeConfig(viteConfig, {
      optimizeDeps: {
        exclude: ['@sanity/ui'],
      },
      plugins: [vanillaExtractPlugin({identifiers: vanillaExtractIdentifiers})],
      resolve: {
        alias: {
          '@sanity/ui': path.resolve(__dirname, '../ui/exports'),
          '$workshop': path.resolve(__dirname, './workshop'),
        },
      },
    })
  },
}

export default runtime
