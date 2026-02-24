import {type PkgConfigOptions} from '@sanity/pkg-utils'

import {vanillaExtractIdentifiers} from './vanilla-extract/identifiers'

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
