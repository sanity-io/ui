'use strict'

const path = require('path')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

const ROOT_PATH = path.join(__dirname, '..', '..')

module.exports = {
  mode: 'production',
  devtool: 'source-map',
  entry: ['./src/main.tsx'],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        include: [
          __dirname,
          path.join(ROOT_PATH, 'color/src'),
          path.join(ROOT_PATH, 'icons/src'),
          path.join(ROOT_PATH, 'logos/src'),
          path.join(ROOT_PATH, 'ui/src'),
        ],
        options: {
          configFile: path.resolve(__dirname, 'tsconfig.build.json'),
        },
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      '@sanity/color': path.join(ROOT_PATH, 'color/src'),
      '@sanity/icons': path.join(ROOT_PATH, 'icons/src'),
      '@sanity/logos': path.join(ROOT_PATH, 'logos/src'),
      '@sanity/ui': path.join(ROOT_PATH, 'ui/src'),
      react: require.resolve('react'),
      'react-dom': require.resolve('react-dom'),
      'styled-components': require.resolve('styled-components'),
    },
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({template: path.join(__dirname, 'src/template.html')}),
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'production'),
    }),
  ],
}
