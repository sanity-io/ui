import {defineConfig} from 'vitest/config'

export default defineConfig({
  resolve: {
    // Keep every `from 'vitest'` on this package's copy. pnpm isolates the
    // same vitest version per vite peer set.
    dedupe: ['vitest'],
  },
  test: {
    environment: 'jsdom',
    experimental: {
      // Print the slowest imports after test runs, to keep the cost of heavy
      // import graphs (e.g. barrel files) visible in CI and local runs.
      importDurations: {
        limit: 10,
        print: true,
      },
    },
    setupFiles: ['./test/setup.ts'],
  },
})
