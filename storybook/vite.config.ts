import {vanillaExtractPlugin} from '@vanilla-extract/vite-plugin'
import react from '@vitejs/plugin-react'
import path from 'path'
import {env} from 'process'
import {defineConfig} from 'vite'

const isDev = env.NODE_ENV === 'development'

// https://vite.dev/config/
export default defineConfig({
  optimizeDeps: {
    exclude: ['@sanity/ui'],
  },
  plugins: [
    react({
      // babel: {plugins: [['babel-plugin-react-compiler', {target: '19'}]]},
    }),
    vanillaExtractPlugin({
      identifiers: (options) => {
        const {debugId, hash, filePath} = options

        if (filePath === 'src/css/layers.css.ts' && debugId) {
          return `ui-${debugId}`
        }

        if (isDev) {
          const basename = path.basename(filePath, '.css.ts')
          const name = dashCase([basename, debugId && sanitize(debugId)].filter(Boolean).join('-'))

          return `${name}-${hash}`
        }

        return `ui-${hash}`
      },
    }),
  ],
  resolve: {
    alias: {
      '@sanity/ui': path.resolve(__dirname, '../exports'),
    },
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
