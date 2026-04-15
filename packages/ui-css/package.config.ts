import {defineConfig, type PkgConfigOptions} from '@sanity/pkg-utils'

import {_vanillaExtractIdentifiers} from './vanilla-extract/identifiers'

const browserslist = '> 0.2% and not dead and supports css-cascade-layers and supports flexbox-gap'

const pkgOptions: PkgConfigOptions = {
  dts: 'rolldown',
  extract: {
    rules: {
      'ae-internal-missing-underscore': 'off',
    },
  },
  rollup: {
    vanillaExtract: {
      identifiers: _vanillaExtractIdentifiers,
      extract: {
        name: 'index.css',
        sourcemap: true,
      },
      // minify: true,
      browserslist,
    },
  },
  tsconfig: 'tsconfig.dist.json',
}

export default defineConfig(pkgOptions)
