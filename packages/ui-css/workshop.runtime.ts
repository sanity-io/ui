import {vanillaExtractIdentifiers} from '@sanity/ui-css/vanilla-extract'
import type {WorkshopRuntimeOptions} from '@sanity/ui-workshop/runtime'
import {vanillaExtractPlugin} from '@vanilla-extract/vite-plugin'
import path from 'path'
import {mergeConfig} from 'vite'

const __dirname = path.dirname(new URL(import.meta.url).pathname)

const runtime: WorkshopRuntimeOptions = {
  vite: (viteConfig) =>
    mergeConfig(viteConfig, {
      optimizeDeps: {
        exclude: ['@sanity/ui-css', '@sanity/ui-tokens'],
      },
      plugins: [vanillaExtractPlugin({identifiers: vanillaExtractIdentifiers})],
      resolve: {
        alias: {
          '@sanity/ui-css': path.resolve(__dirname, '../../packages/ui-css/exports'),
          '@sanity/ui-tokens': path.resolve(__dirname, '../../packages/ui-tokens/exports'),
        },
      },
    }),
}

export default runtime
