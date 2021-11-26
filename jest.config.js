'use strict'

module.exports = {
  modulePathIgnorePatterns: ['<rootDir>/lib/'],
  setupFilesAfterEnv: ['<rootDir>/test/setupTests.ts'],
  testEnvironment: 'jsdom',
  // - match all files in `__tests__` directories
  // - match files ending with `.test.js`, `.test.ts`, `.test.jsx`, or `.test.tsx`
  testRegex: '(/__tests__/.*|\\.test)\\.[jt]sx?$',
  transform: {'^.+\\.tsx?$': 'esbuild-jest'},
}
