module.exports = {
  transform: {'^.+\\.tsx?$': 'esbuild-jest'},
  testEnvironment: 'jsdom',
  modulePathIgnorePatterns: ['<rootDir>/.next/'],
  moduleNameMapper: {
    '^\\$config$': '<rootDir>/config',
    '^\\$lib\\/types$': '<rootDir>/lib/types',
  },
}
