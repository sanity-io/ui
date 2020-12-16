module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  modulePathIgnorePatterns: ['<rootDir>/.next/'],
  moduleNameMapper: {
    '^\\$features$': '<rootDir>/features',
    '^\\$lib\\/types$': '<rootDir>/lib/types',
  },
}
