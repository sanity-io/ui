import {defineConfig} from 'vitest/config'

export default defineConfig({
  test: {
    exclude: ['.workshop', 'dist', 'e2e', 'node_modules', 'tmp'],
  },
})
