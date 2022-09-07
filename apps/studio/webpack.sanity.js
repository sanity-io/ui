/* eslint-disable @typescript-eslint/no-var-requires */

'use strict'

const path = require('path')

const ROOT_PATH = path.resolve(__dirname, '../..')

module.exports = (baseConfig) => ({
  ...baseConfig,
  resolve: {
    ...baseConfig?.resolve,
    alias: {
      '@sanity/color': path.resolve(ROOT_PATH, 'packages/@sanity/color/src'),
      '@sanity/icons': path.resolve(ROOT_PATH, 'packages/@sanity/icons/src'),
      '@sanity/logos': path.resolve(ROOT_PATH, 'packages/@sanity/logos/src'),
      '@sanity/ui': path.resolve(ROOT_PATH, 'packages/@sanity/ui/src'),
      ...baseConfig?.resolve?.alias,
    },
  },
})
