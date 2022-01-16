/* eslint-disable @typescript-eslint/no-var-requires */

'use strict'

const {createJestConfig} = require('../../test/jestConfig')

/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = createJestConfig({
  displayName: require('./package.json').name,
  modulePathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/build/'],
  moduleNameMapper: {
    '^\\$config$': '<rootDir>/config',
    '^\\$lib\\/config$': '<rootDir>/lib/config',
    '^\\$lib\\/types$': '<rootDir>/lib/types',
  },
})
