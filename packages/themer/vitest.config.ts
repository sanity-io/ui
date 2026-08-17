import {vanillaExtractPlugin} from '@sanity/vanilla-extract-vite-plugin'
import {defineConfig} from 'vitest/config'

export default defineConfig({
  // The tests import @sanity/ui, which resolves to its TypeScript source
  // (dev `exports`), so its vanilla-extract `.css.ts` modules must be
  // compiled here
  plugins: [vanillaExtractPlugin()],
  test: {
    include: ['src/**/*.test.{ts,tsx}'],
  },
})
