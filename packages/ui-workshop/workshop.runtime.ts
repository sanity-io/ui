import path from 'node:path'
import {fileURLToPath} from 'node:url'

import {vanillaExtractPlugin} from '@vanilla-extract/vite-plugin'
import {mergeConfig} from 'vite'

import {defineRuntime} from './src/core'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default defineRuntime({
  server: {
    port: 1339,
  },
  vite: (viteConfig) => {
    return mergeConfig(viteConfig, {
      plugins: [
        vanillaExtractPlugin({
          identifiers: (options) => {
            const isProd = viteConfig.mode === 'production'

            const {debugId, hash, filePath} = options

            if (isProd) {
              return `ui-workshop-${hash}`
            }

            const basename = path.basename(filePath, '.css.ts')
            const name = dashCase(
              [basename, debugId && sanitize(debugId)].filter(Boolean).join('-'),
            )

            return `${name}-${hash}`
          },
        }),
      ],

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

function dashCase(str: string): string {
  return str
    .replace(/([A-Z])/g, '-$1')
    .toLowerCase()
    .replace(/^-/, '')
}

function sanitize(str: string): string {
  // remove all non-alphanumeric characters except for dashes
  return str.replace(/[^a-zA-Z0-9-]/g, '')
}
