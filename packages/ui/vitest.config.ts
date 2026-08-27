import {vanillaExtractPlugin} from '@sanity/vanilla-extract-vite-plugin'
import {defineConfig} from 'vitest/config'

export default defineConfig({
  // Compiles the vanilla-extract `.css.ts` modules imported by the source
  // under test (vitest stubs the resulting virtual CSS, but the class name
  // exports must evaluate)
  plugins: [vanillaExtractPlugin()],
  test: {
    coverage: {
      exclude: ['src/**/*.test.{ts,tsx}', 'src/**/*.css.ts'],
      include: ['src/**/*.{ts,tsx}'],
      provider: 'v8',
      reporter: ['text', 'json-summary', 'html'],
      reportsDirectory: 'coverage',
      thresholds: {
        branches: 37,
        functions: 53,
        lines: 50,
        statements: 48,
      },
    },
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
