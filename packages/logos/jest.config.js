'use strict'

/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
  moduleFileExtensions: ['cjs', 'js', 'jsx', 'mjs', 'ts', 'tsx'],
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
  setupFilesAfterEnv: ['<rootDir>/test/setupFilesAfterEnv.ts'],
  testRegex: '(/__tests__/.*|\\.test)\\.[jt]sx?$',
  transform: {
    '\\.[jt]sx?$': [
      'babel-jest',
      // rootMode upwards makes use of the global babel.config.js
      {rootMode: 'upward'},
    ],
  },
}
