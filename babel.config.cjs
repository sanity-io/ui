'use strict'

//
// NOTE: this file is only here to make Jest tests run on CI
// This should be removed (along with babel dependencies) when possible
//

module.exports = {
  presets: [
    ['@babel/preset-env', {modules: 'commonjs'}],
    ['@babel/preset-react', {runtime: 'automatic'}],
    '@babel/preset-typescript',
  ],
}
