import path from 'node:path'

import autoprefixer from 'autoprefixer'
import cssnano from 'cssnano'
import postcssImport from 'postcss-import'

import breakpoints from './postcss-breakpoints'

export default {
  plugins: [
    postcssImport({
      path: [path.relative(process.cwd(), '../')],
    }),
    breakpoints,
    autoprefixer,
    ...(process.env['NODE_ENV'] === 'production'
      ? [
          cssnano({
            preset: 'default',
          }),
        ]
      : []),
  ],
}
