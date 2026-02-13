import {vanillaExtractPlugin} from '@vanilla-extract/vite-plugin'
import path from 'path'
import type {UserConfig} from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

const config: UserConfig = {
  plugins: [tsconfigPaths(), vanillaExtractPlugin()],
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
  resolve: {
    alias: {
      $test: path.resolve(__dirname, 'test'),
    },
  },
}

export default config
