import {type PkgConfigOptions} from '@sanity/pkg-utils'
import path from 'path'
import {env} from 'process'

const isProd = env['NODE_ENV'] === 'production'

const browserslist = '> 0.2% and not dead and supports css-cascade-layers and supports flexbox-gap'
// We're using color-mix (https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/color-mix) which is in the 2023 baseline
// const browserslist = 'extends browserslist-config-baseline/2023'

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
    vanillaExtract: {
      identifiers: ({debugId, hash, filePath}) =>
        vanillaExtractIdentifiers({debugId, hash, filePath}),
      extract: {
        name: 'css/index.css',
        sourcemap: true,
      },
      minify: true,
      browserslist,
    },
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

export function vanillaExtractIdentifiers({
  debugId,
  hash,
  filePath,
}: {
  debugId: string | undefined
  hash: string
  filePath: string
}) {
  if (filePath === 'src/css/layers.css.ts' && debugId) {
    return `ui-${debugId}`
  }

  if (isProd) {
    return `ui-${hash}`
  }

  const basename = path.basename(filePath, '.css.ts')
  const name = dashCase([basename, debugId && sanitize(debugId)].filter(Boolean).join('-'))

  return `${name}-${hash}`
}
