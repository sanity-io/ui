import path from 'node:path'

import autoprefixer from 'autoprefixer'
import postcssImport from 'postcss-import'

import breakpoints from './postcss-breakpoints'

export default {
  plugins: [
    postcssImport({
      path: [path.relative(process.cwd(), '../')],
    }),
    breakpoints,
    autoprefixer,
  ],
}
