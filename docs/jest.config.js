module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  modulePathIgnorePatterns: ['<rootDir>/.next/'],
  moduleNameMapper: {
    '^\\$config$': '<rootDir>/config',
    '^\\$lib\\/types$': '<rootDir>/lib/types',
  },
}
