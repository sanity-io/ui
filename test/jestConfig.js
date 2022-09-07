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
  const {testRegex, transform, ...restConfig} = config

  return {
    ...restConfig,
    moduleNameMapper: {
      ...restConfig.moduleNameMapper,
      '^@sanity/(.*)$': path.resolve(ROOT_PATH, 'packages/@sanity/$1/src'),
    },
    testEnvironment: 'jsdom',
    // - match all files in `__tests__` directories
    // - match files ending with `.test.js`, `.test.ts`, `.test.jsx`, or `.test.tsx`
    testRegex: testRegex ?? '(/__tests__/.*|\\.test)\\.[jt]sx?$',
    transform: transform ?? {
      '^.+\\.tsx?$': [
        'esbuild-jest',
        {
          sourcemap: true,
          loaders: {
            '.test.tsx': 'tsx',
          },
        },
      ],
    },
  }
}
