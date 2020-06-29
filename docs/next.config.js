'use strict'

const path = require('path')

module.exports = {
  webpack: (config) => {
    // Includes
    config.module.rules[0].include.push(path.resolve(__dirname, '../src'))

    // Aliases
    Object.assign(config.resolve.alias, {
      '@sanity/ui': path.resolve(__dirname, '../src'),
      react: require.resolve('react'),
      'react-dom': require.resolve('react-dom'),
      'styled-components': require.resolve('styled-components'),
    })

    return config
  },
}
