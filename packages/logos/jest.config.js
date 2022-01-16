/* eslint-disable @typescript-eslint/no-var-requires */

'use strict'

const {createJestConfig} = require('../../../test/jestConfig')

/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = createJestConfig({
  displayName: require('./package.json').name,
})
