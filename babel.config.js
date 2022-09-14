'use strict'

module.exports = {
  presets: [
    [
      '@babel/preset-react',
      {
        flow: false,
        runtime: 'automatic',
        typescript: true,
      },
    ],
    [
      '@babel/preset-typescript',
      {
        isTSX: true,
        allExtensions: true,
      },
    ],
    '@babel/preset-env',
  ],
}
