'use strict'

module.exports = {
  testEnvironment: 'node',
  transform: {
    '^.+\\.tsx?$': 'esbuild-jest',
  },
  verbose: true,
  modulePathIgnorePatterns: ['<rootDir>/test/__fixtures'],
}
