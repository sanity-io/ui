module.exports = {
  preset: 'ts-jest',
  setupFilesAfterEnv: ['<rootDir>/test/setupTests.ts'],
  modulePathIgnorePatterns: ['<rootDir>/lib/'],
}
