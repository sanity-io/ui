import {defineConfig, type PkgConfigOptions} from '@sanity/pkg-utils'

import {_vanillaExtractIdentifiers} from './vanilla-extract/identifiers'

const pkgOptions: PkgConfigOptions = {
  dts: 'rolldown',
  rollup: {
    vanillaExtract: {
      identifiers: _vanillaExtractIdentifiers,
      extract: {
        name: 'index.css',
        sourcemap: true,
      },
      browserslist: '> 0.2% and not dead and supports css-cascade-layers and supports flexbox-gap',
    },
  },
  tsconfig: 'tsconfig.dist.json',
}

export default defineConfig(pkgOptions)
