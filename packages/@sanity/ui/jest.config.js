module.exports = {
  transform: {'^.+\\.tsx?$': 'esbuild-jest'},
  testEnvironment: 'jsdom',
  // - match all files in `__tests__` directories
  // - match files ending with `.test.js`, `.test.ts`, `.test.jsx`, or `.test.tsx
  testRegex: '(/__tests__/.*|\\.test)\\.[jt]sx?$',
  setupFilesAfterEnv: ['<rootDir>/test/setupTests.ts'],
  modulePathIgnorePatterns: ['<rootDir>/lib/'],
}
