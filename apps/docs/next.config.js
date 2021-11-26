/* eslint-disable @typescript-eslint/no-var-requires */

'use strict'

const withTranspileModules = require('next-transpile-modules')

module.exports = withTranspileModules([
  // Add monorepo sibling packages to includes
  '@sanity/color',
  '@sanity/icons',
  '@sanity/logos',
  '@sanity/ui',
  '@sanity/ui-workshop',
])({
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
  react: {
    useSuspense: false,
  },

  webpack: (config) => {
    // Aliases
    config.resolve.alias = {
      ...config.resolve.alias,

      react: require.resolve('react'),
      'react-dom': require.resolve('react-dom'),
      'styled-components': require.resolve('styled-components'),
    }

    return config
  },
})
