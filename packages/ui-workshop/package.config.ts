import {defineConfig} from '@sanity/pkg-utils'

import {optimizeCss} from './rollup/optimize-css'
import {vanillaExtractPlugin} from './rollup/vanilla-extract'
import {vanillaExtractIdentifiers} from './vanilla-extract/identifiers'

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
        identifiers: vanillaExtractIdentifiers,
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
