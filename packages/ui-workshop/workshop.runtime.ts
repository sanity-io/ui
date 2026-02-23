import {defineRuntime} from '@sanity/ui-workshop/runtime'
import {vanillaExtractPlugin} from '@vanilla-extract/vite-plugin'
import path from 'path'
import {fileURLToPath} from 'url'
import {mergeConfig} from 'vite'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DIST_PATH = path.resolve(__dirname, 'dist')
const EXPORTS_PATH = path.resolve(__dirname, 'exports')

const UI_DIST_PATH = path.resolve(__dirname, '../ui/dist')
const UI_EXPORTS_PATH = path.resolve(__dirname, '../ui/exports')

export default defineRuntime({
  vite: (viteConfig) => {
    const isProd = viteConfig.mode === 'production'

    return mergeConfig(viteConfig, {
      plugins: [
        vanillaExtractPlugin({
          identifiers: (options) => {
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
