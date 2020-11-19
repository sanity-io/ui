'use strict'

const path = require('path')

const ROOT_PATH = path.resolve(__dirname, '..')

module.exports = {
  stories: [path.resolve(ROOT_PATH, '**/*.stories.@(ts|tsx)')],
  addons: [
    '@storybook/addon-a11y',
    '@storybook/addon-actions/register',
    '@storybook/addon-links/register',
    '@storybook/addon-knobs/register',
  ],
  webpackFinal: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '~/storybook': path.resolve(ROOT_PATH, 'ui-storybook'),
      '@sanity/color': path.resolve(ROOT_PATH, 'color/src'),
      '@sanity/icons': path.resolve(ROOT_PATH, 'icons/src'),
      '@sanity/logos': path.resolve(ROOT_PATH, 'logos/src'),
      '@sanity/ui': path.resolve(ROOT_PATH, 'ui/src'),
    }

    return config
  },
}
