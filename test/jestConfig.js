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
  return {
    ...config,
    moduleFileExtensions: [...(config.moduleFileExtensions || []), 'ts', 'tsx', 'js', 'jsx'],
    moduleNameMapper: {
      ...config.moduleNameMapper,
      '^@sanity/(.*)$': path.resolve(ROOT_PATH, 'packages/@sanity/$1/src'),
    },
    testEnvironment: config.testEnvironment || 'jsdom',
    // - match all files in `__tests__` directories
    // - match files ending with `.test.js`, `.test.ts`, `.test.jsx`, or `.test.tsx`
    testRegex: config.testRegex || '(/__tests__/.*|\\.test)\\.[jt]sx?$',
    transform: config.transform || {
      '\\.[jt]sx?$': [
        'babel-jest',
        {
          // rootMode upwards makes use of the global babel.config.js
          rootMode: 'upward',
          sourceMaps: true,
        },
      ],
    },
  }
}
