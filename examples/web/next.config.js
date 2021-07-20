'use strict'

const path = require('path')

const ROOT_PATH = path.resolve(__dirname, '../..')

module.exports = {
  webpack: (config) => {
    // Add monorepo sibling packages to includes
    config.module.rules[1].include.push(path.join(ROOT_PATH, 'packages/@sanity/color/src'))
    config.module.rules[1].include.push(path.join(ROOT_PATH, 'packages/@sanity/icons/src'))
    config.module.rules[1].include.push(path.join(ROOT_PATH, 'packages/@sanity/logos/src'))
    config.module.rules[1].include.push(path.join(ROOT_PATH, 'packages/@sanity/ui/src'))

    // Aliases
    config.resolve.alias = {
      ...config.resolve.alias,
      '@sanity/color': path.join(ROOT_PATH, 'packages/@sanity/color/src'),
      '@sanity/icons': path.join(ROOT_PATH, 'packages/@sanity/icons/src'),
      '@sanity/logos': path.join(ROOT_PATH, 'packages/@sanity/logos/src'),
      '@sanity/ui': path.join(ROOT_PATH, 'packages/@sanity/ui/src'),

      react: require.resolve('react'),
      'react-dom': require.resolve('react-dom'),
      'styled-components': require.resolve('styled-components'),
    }

    return config
  },
}
