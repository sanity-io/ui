'use strict'

const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

const ROOT_PATH = path.join(__dirname, '..', '..')

module.exports = {
  mode: 'development',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    hot: true,
    historyApiFallback: true,
  },
  devtool: 'inline-source-map',
  entry: ['react-hot-loader/patch', './src/main.hot.tsx'],
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
      'react-dom': require.resolve('@hot-loader/react-dom'),
      'styled-components': require.resolve('styled-components'),
    },
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  plugins: [
    new HtmlWebpackPlugin({template: path.join(__dirname, 'src/template.html')}),
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
    }),
  ],
}
