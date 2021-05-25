module.exports = {
  transform: {'^.+\\.tsx?$': 'esbuild-jest'},
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/test/setupTests.ts'],
  modulePathIgnorePatterns: ['<rootDir>/lib/'],
}
