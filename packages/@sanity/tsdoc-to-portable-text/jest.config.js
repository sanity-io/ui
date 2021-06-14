'use strict'

module.exports = {
  modulePathIgnorePatterns: ['<rootDir>/test/__fixtures'],
  testEnvironment: 'node',
  testTimeout: 10000,
  transform: {
    '^.+\\.tsx?$': 'esbuild-jest',
  },
  verbose: true,
}
