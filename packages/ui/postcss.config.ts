import path from 'node:path'

import autoprefixer from 'autoprefixer'
import cssnano from 'cssnano'
import type {AcceptedPlugin} from 'postcss'
import postcssImport from 'postcss-import'
import prefixer from 'postcss-prefix-selector'

import breakpoints from './postcss-breakpoints'
import {suffixSelectors} from './postcss-suffix-selectors'
import {VERSION} from './src/version'

const config = {
  plugins: [
    postcssImport({
      path: [path.relative(process.cwd(), '../')],
    }),
    prefixer({
      prefix: VERSION,
      transform: suffixSelectors,
    } as Parameters<typeof prefixer>[0]),
    breakpoints,
    autoprefixer,
    ...(process.env['NODE_ENV'] === 'production'
      ? [
          cssnano({
            preset: 'default',
          }),
        ]
      : []),
  ] as AcceptedPlugin[],
}

export default config
