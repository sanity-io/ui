'use strict'

/** @type {import('jest').Config} */
module.exports = {
  moduleFileExtensions: ['cjs', 'js', 'jsx', 'mjs', 'ts', 'tsx'],
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
  setupFilesAfterEnv: ['<rootDir>/test/setupFilesAfterEnv.ts'],
  testRegex: '(/__tests__/.*|\\.test)\\.[jt]sx?$',
  transform: {
    '\\.[jt]sx?$': [
      'babel-jest',
      {
        configFile: false,
        presets: [
          ['@babel/preset-env', {modules: 'commonjs'}],
          ['@babel/preset-react', {runtime: 'automatic'}],
          '@babel/preset-typescript',
        ],
      },
    ],
  },
}
