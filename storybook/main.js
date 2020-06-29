'use strict'

const path = require('path')

module.exports = {
  stories: ['../**/*.stories.(ts|tsx)'],
  addons: [
    require.resolve('@storybook/preset-typescript'),
    '@storybook/addon-actions/register',
    '@storybook/addon-links/register',
    '@storybook/addon-knobs/register',
  ],
  webpackFinal: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '~': path.resolve(__dirname, '..'),
      '@sanity/ui': path.resolve(__dirname, '../src'),
    }

    return config
  },
}
