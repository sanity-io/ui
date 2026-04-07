/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')

module.exports = {
  plugins: [
    require('postcss-import')({
      path: [path.relative(process.cwd(), '../')],
    }),
    require('autoprefixer'),
  ],
}
