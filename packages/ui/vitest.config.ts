import {vanillaExtractPlugin} from '@sanity/vanilla-extract-vite-plugin'
import {defineConfig} from 'vitest/config'

export default defineConfig({
  // Compiles the vanilla-extract `.css.ts` modules imported by the source
  // under test (vitest stubs the resulting virtual CSS, but the class name
  // exports must evaluate)
  plugins: [vanillaExtractPlugin()],
  resolve: {
    // Keep every `from 'vitest'` (setup files, jest-dom, vitest-axe) on this
    // package's copy. pnpm isolates the same vitest version per vite peer set.
    dedupe: ['vitest'],
  },
  test: {
    experimental: {
      // Print the slowest imports after test runs, to keep the cost of heavy
      // import graphs (e.g. barrel files) visible in CI and local runs.
      importDurations: {
        limit: 10,
        print: true,
      },
    },
    include: ['src/**/*.test.{ts,tsx}'],
    setupFiles: ['./test/setup.ts'],
  },
})
