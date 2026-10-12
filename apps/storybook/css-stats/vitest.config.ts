import path from 'node:path'

import {vanillaExtractPlugin} from '@sanity/vanilla-extract-vite-plugin'
import viteReact from '@vitejs/plugin-react'
import {playwright} from '@vitest/browser-playwright'
import {defineConfig} from 'vitest/config'

const root = path.join(import.meta.dirname, '..')

export default defineConfig({
  root,
  // The same transforms as the Storybook build (`.storybook/main.ts`)
  plugins: [viteReact({compiler: {target: '19'}}), vanillaExtractPlugin()],
  // Scan every story up front: a dependency discovered mid-run makes Vite re-optimize and
  // reload the page, which ends the browser session
  optimizeDeps: {entries: ['stories/**/*.stories.tsx', '.storybook/**/*.{ts,tsx}']},
  test: {
    include: ['css-stats/**/*.test.tsx'],
    provide: {
      cssStatsOutFile: path.resolve(process.env.CSS_STATS_OUT ?? 'css-stats/out/stats.json'),
    },
    testTimeout: 30 * 60_000,
    browser: {
      enabled: true,
      headless: true,
      provider: playwright(),
      instances: [{browser: 'chromium', viewport: {width: 1280, height: 900}}],
    },
    // `setup.ts` instruments styled-components before the preview imports any component
    setupFiles: [
      path.join(import.meta.dirname, 'setup.ts'),
      path.join(root, '.storybook/vitest.setup.ts'),
    ],
  },
})
