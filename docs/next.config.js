'use strict'

const path = require('path')
const resolve = require('resolve')

const ROOT_PATH = path.dirname(__dirname)

module.exports = {
  webpack: (config) => {
    // Includes
    config.module.rules[0].include.push(path.resolve(__dirname, '../src'))

    // Aliases
    Object.assign(config.resolve.alias, {
      '@sanity/ui': path.resolve(ROOT_PATH, 'src'),
      react: resolve.sync('react', {basedir: ROOT_PATH}),
      'react-dom': resolve.sync('react-dom', {basedir: ROOT_PATH}),
    })

    return config
  },
}
