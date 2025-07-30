import {type PkgConfigOptions} from '@sanity/pkg-utils'
import {vanillaExtractPlugin} from '@vanilla-extract/rollup-plugin'
import path from 'path'
import {env} from 'process'

// import {cssBundle} from './rollup/cssBundle'
import {optimizeCss} from './rollup/optimizeCss'

const isProd = env['NODE_ENV'] === 'production'

const config: PkgConfigOptions = {
  babel: {reactCompiler: true},
  // dts: 'rolldown',
  extract: {
    rules: {
      'ae-internal-missing-underscore': 'off',
    },
  },
  reactCompilerOptions: {target: '19'},
  rollup: {
    output: {
      assetFileNames: '[name][extname]',
    },
    plugins: [
      vanillaExtractPlugin({
        identifiers: (options) => {
          const {debugId, hash, filePath} = options

          if (filePath === 'src/css/layers.css.ts' && debugId) {
            return `ui-${debugId}`
          }

          if (isProd) {
            return `ui-${hash}`
          }

          const basename = path.basename(filePath, '.css.ts')
          const name = dashCase([basename, debugId && sanitize(debugId)].filter(Boolean).join('-'))

          return `${name}-${hash}`
        },
        extract: {
          name: 'css/index.css',
          // sourcemap: true,
        },
      }),
      optimizeCss(),
      // postcss({
      //   plugins: [postcssPresetEnv, autoprefixer, cssnano({preset: 'default'})],
      // }),
      // cssBundle({
      //   cleanAssets: isProd,
      //   assetFileName: ({name}) => `${name}/index.css`,
      // }),
    ],
  },
  strictOptions: {
    // disable warning when not using browserslist in package.json
    noImplicitBrowsersList: 'off',
  },
  tsconfig: 'tsconfig.dist.json',
}

export default config

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
