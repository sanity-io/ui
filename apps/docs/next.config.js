'use strict'

const path = require('path')

const ROOT_PATH = path.resolve(__dirname, '../..')

module.exports = {
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
  react: {
    useSuspense: false,
  },

  webpack: (config) => {
    // Add monorepo sibling packages to includes
    config.module.rules[1].include.push(
      path.join(ROOT_PATH, 'packages/@sanity/color/src'),
      path.join(ROOT_PATH, 'packages/@sanity/icons/src'),
      path.join(ROOT_PATH, 'packages/@sanity/logos/src'),
      path.join(ROOT_PATH, 'packages/@sanity/ui/src'),
      path.join(ROOT_PATH, 'packages/@sanity/ui-workshop/src')
    )

    // Aliases
    config.resolve.alias = {
      ...config.resolve.alias,

      '@sanity/color': path.resolve(ROOT_PATH, 'packages/@sanity/color/src'),
      '@sanity/icons': path.resolve(ROOT_PATH, 'packages/@sanity/icons/src'),
      '@sanity/logos': path.join(ROOT_PATH, 'packages/@sanity/logos/src'),
      '@sanity/ui': path.resolve(ROOT_PATH, 'packages/@sanity/ui/src'),
      '@sanity/ui-workshop': path.resolve(ROOT_PATH, 'packages/@sanity/ui-workshop/src'),

      react: require.resolve('react'),
      'react-dom': require.resolve('react-dom'),
      'styled-components': require.resolve('styled-components'),
    }

    return config
  },
}
