import {vanillaExtractPlugin} from '@sanity/vanilla-extract-vite-plugin'
import {defineConfig} from 'vitest/config'

export default defineConfig({
  // While the workspace `@sanity/ui` satisfies the `^4` dependency range, pnpm
  // links it and the tests import its TypeScript source (dev `exports`), so
  // its vanilla-extract `.css.ts` modules must be compiled here. The plugin
  // is a no-op once the dependency resolves to the registry build instead.
  plugins: [vanillaExtractPlugin()],
  test: {
    include: ['src/**/*.test.{ts,tsx}'],
  },
})
