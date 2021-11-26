/* eslint-disable @typescript-eslint/no-var-requires */

'use strict'

const withBundleAnalyzer = require('@next/bundle-analyzer')
const withTranspileModules = require('next-transpile-modules')

module.exports = withTranspileModules([
  // Add monorepo sibling packages to includes
  '@sanity/color',
  '@sanity/icons',
  '@sanity/logos',
  '@sanity/ui',
  '@sanity/ui-workshop',
])(
  withBundleAnalyzer({
    enabled: process.env.ANALYZE === 'true',
  })({
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
)
