/* eslint-disable @typescript-eslint/no-var-requires */

'use strict'

const path = require('path')

const ROOT_PATH = path.resolve(__dirname, '..')

/**
 * @returns {import('@jest/types').Config.InitialOptions}
 */
exports.createJestConfig = (
  /** @type {import('@jest/types').Config.InitialOptions} */
  config = {}
) => {
  const {
    moduleFileExtensions = [],
    modulePathIgnorePatterns = [],
    moduleNameMapper,
    setupFilesAfterEnv = [],
    // - match all files in `__tests__` directories
    // - match files ending with `.test.js`, `.test.ts`, `.test.jsx`, or `.test.tsx`
    testRegex = '(/__tests__/.*|\\.test)\\.[jt]sx?$',
  } = config

  return {
    ...config,
    moduleFileExtensions: [...moduleFileExtensions, 'cjs', 'js', 'jsx', 'mjs', 'ts', 'tsx'],
    modulePathIgnorePatterns: [...modulePathIgnorePatterns, '<rootDir>/dist/'],
    moduleNameMapper: {
      ...moduleNameMapper,
      '^@sanity/(.*)$': path.resolve(ROOT_PATH, 'packages/@sanity/$1/src'),
    },
    setupFilesAfterEnv: [...setupFilesAfterEnv, path.resolve(__dirname, 'setupFilesAfterEnv.ts')],
    testRegex,
    transform: {
      '\\.[jt]sx?$': [
        'babel-jest',
        // rootMode upwards makes use of the global babel.config.js
        {rootMode: 'upward'},
      ],
    },
  }
}
