'use strict'

// oxlint-disable-next-line no-commonjs
module.exports = {
  moduleFileExtensions: ['cjs', 'js', 'jsx', 'mjs', 'ts', 'tsx'],
  // Resolve `@sanity/ui` to TypeScript source so tests don't require a build.
  // This cannot use the package `exports` map: jest always matches the `node`
  // condition, which points at `dist` for Node-only consumers (like the
  // workshop CLI) that cannot load .tsx source.
  moduleNameMapper: {
    '^@sanity/ui$': '<rootDir>/exports/index.ts',
    '^@sanity/ui/_visual-editing$': '<rootDir>/exports/_visual-editing.ts',
    '^@sanity/ui/theme$': '<rootDir>/exports/theme.ts',
  },
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
        // `@sanity/ui` resolves to its TypeScript source in the monorepo
        // (dev exports), so apply the React Compiler here to keep testing the
        // same compiled behavior that `tsdown` ships in `dist`
        plugins: [['babel-plugin-react-compiler', {target: '18'}]],
      },
    ],
  },
}
