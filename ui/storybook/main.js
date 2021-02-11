'use strict'

const path = require('path')

const ROOT_PATH = path.resolve(__dirname, '..', '..')
const SRC_PATH = path.resolve(__dirname, '../src')

module.exports = {
  stories: [path.resolve(SRC_PATH, '**/*.stories.@(ts|tsx)')],
  addons: [
    '@storybook/addon-a11y',
    '@storybook/addon-actions/register',
    '@storybook/addon-links/register',
    '@storybook/addon-knobs/register',
  ],
  babel: (options) => {
    options.presets = options.presets.map((preset) => {
      if (Array.isArray(preset) && preset[0].includes('@babel/preset-react')) {
        return [require.resolve('@babel/preset-react'), {runtime: 'classic'}]
      }

      return preset
    })

    return options
  },
  webpackFinal: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      $storybook: __dirname,
      '@sanity/color': path.resolve(ROOT_PATH, 'color/src'),
      '@sanity/icons': path.resolve(ROOT_PATH, 'icons/src'),
      '@sanity/logos': path.resolve(ROOT_PATH, 'logos/src'),
      '@sanity/ui': path.resolve(ROOT_PATH, 'ui/src'),
      react: require.resolve('react'),
      'react-dom': require.resolve('react-dom'),
      'styled-components': require.resolve('styled-components'),
    }

    return config
  },
}
