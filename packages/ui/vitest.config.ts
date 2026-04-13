import {vanillaExtractPlugin} from '@vanilla-extract/vite-plugin'
import react from '@vitejs/plugin-react'
import path from 'path'
import tsconfigPaths from 'vite-tsconfig-paths'
import {defineConfig} from 'vitest/config'

export default defineConfig({
  plugins: [react(), tsconfigPaths(), vanillaExtractPlugin()],
  test: {
    globals: true,
    environment: 'jsdom',
    coverage: {
      reporter: ['text', 'json', 'html'],
    },
    // Enable rich PR failed test annotation on the CI
    reporters: process.env['GITHUB_ACTIONS'] ? ['default', 'github-actions'] : 'default',
    setupFiles: ['test/setup.ts'],
    exclude: ['.workshop', 'dist', 'e2e', 'node_modules', 'tmp'],
  },
  resolve: {
    alias: {
      $test: path.resolve(__dirname, 'test'),
    },
  },
})
