'use strict'

module.exports = {
  moduleFileExtensions: ['cjs', 'js', 'jsx', 'mjs', 'ts', 'tsx'],
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
  setupFilesAfterEnv: ['<rootDir>/test/setupFilesAfterEnv.ts'],
  testRegex: '(/__tests__/.*|\\.test)\\.[jt]sx?$',
  transform: {
    '\\.[jt]sx?$': [
      'babel-jest',
      {
        // Don't look for babel.config.{ts,js,json} files or .babelrc files
        configFile: false,
        babelrc: false,
        // The rest is only needed by Jest, if Jest is updated to no longer need babel then this can be removed as well as related dependencies
        presets: [
          ['@babel/preset-env', {modules: 'commonjs'}],
          ['@babel/preset-react', {runtime: 'automatic'}],
          '@babel/preset-typescript',
        ],
      },
    ],
  },
}
