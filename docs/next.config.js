'use strict'

const path = require('path')

const ROOT_PATH = path.dirname(__dirname)

module.exports = {
  webpack: (config) => {
    // Includes
    config.module.rules[0].include.push(path.join(ROOT_PATH, 'src'))

    // Aliases
    Object.assign(config.resolve.alias, {
      '@sanity/ui': path.join(ROOT_PATH, 'src'),
    })

    return config
  },
}
