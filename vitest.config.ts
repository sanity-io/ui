import tsconfigPaths from 'vite-tsconfig-paths'
import {defineConfig} from 'vitest/config'

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    globals: true,
    environment: 'jsdom',
    coverage: {
      reporter: ['text', 'json', 'html'],
    },
    // Enable rich PR failed test annotation on the CI
    reporters: process.env['GITHUB_ACTIONS'] ? ['default', 'github-actions'] : 'default',
    setupFiles: ['test/setup.ts'],
  },
})
