import path from 'path'
import {env} from 'process'
import {defineConfig} from '@sanity/pkg-utils'
import {optimizeCss} from './rollup/optimize-css'
import {vanillaExtractPlugin} from './rollup/vanilla-extract'

const isProd = env['NODE_ENV'] === 'production'

const browserslist = '> 0.2% and not dead and supports css-cascade-layers and supports flexbox-gap'

export default defineConfig({
  babel: {reactCompiler: true},

  bundles: [
    {
      source: './src/cli/index.ts',
      import: './dist/cli.js',
      runtime: 'node',
    },
  ],

  dts: 'rolldown',

  extract: {
    rules: {
      'ae-internal-missing-underscore': 'off',
    },
  },

  reactCompilerOptions: {target: '19'},
  rollup: {
    output: {
      intro: (chunkInfo) => {
        if (chunkInfo.isEntry && chunkInfo.name === 'index') {
          return 'import "./index.css"'
        }

        return ''
      },
    },

    plugins: [
      vanillaExtractPlugin({
        identifiers: ({debugId, hash, filePath}) =>
          vanillaExtractIdentifiers({debugId, hash, filePath}),
        extract: {
          name: 'index.css',
          sourcemap: true,
        },
      }),
      optimizeCss({
        extractFileName: 'index.css',
        browserslist,
      }),
    ],
  },

  strictOptions: {noImplicitSideEffects: 'off'},

  tsconfig: 'tsconfig.dist.json',
})

function vanillaExtractIdentifiers({
  debugId,
  hash,
  filePath,
}: {
  debugId?: string
  hash: string
  filePath: string
}) {
  if (isProd) {
    return `ui-workshop-${hash}`
  }

  const basename = path.basename(filePath, '.css.ts')
  const name = dashCase([basename, debugId && sanitize(debugId)].filter(Boolean).join('-'))

  return `${name}-${hash}`
}

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
