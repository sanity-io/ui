'use strict'

const path = require('path')

const ROOT_PATH = path.resolve(__dirname, '..')

module.exports = {
  stories: [path.resolve(ROOT_PATH, '**/*.stories.@(ts|tsx)')],
  addons: [
    '@storybook/addon-actions/register',
    '@storybook/addon-links/register',
    '@storybook/addon-knobs/register',
  ],
  webpackFinal: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '~': ROOT_PATH,
      '@sanity/ui': path.resolve(ROOT_PATH, 'src'),
    }

    return config
  },
}
