import path from 'node:path'

import {defineConfig} from 'vitest/config'

export default defineConfig({
  resolve: {
    // Resolve `@sanity/ui` to the package source so that tests run without a build
    alias: {
      '@sanity/ui': path.resolve(import.meta.dirname, 'exports'),
    },
  },
  test: {
    include: ['src/**/*.test.{ts,tsx}'],
    setupFiles: ['./test/setup.ts'],
  },
})
