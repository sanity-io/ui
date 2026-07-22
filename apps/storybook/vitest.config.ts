import path from 'node:path'

import {storybookTest} from '@storybook/addon-vitest/vitest-plugin'
import viteReact from '@vitejs/plugin-react'
import {playwright} from '@vitest/browser-playwright'
import {defineConfig} from 'vitest/config'

export default defineConfig({
  test: {
    projects: [
      {
        // Runs every story as a browser test, executing `play` interactions
        plugins: [storybookTest({configDir: path.join(import.meta.dirname, '.storybook')})],
        test: {
          name: 'storybook',
          // Run story files sequentially in a single iframe instead of one
          // iframe per file. Parallel isolated iframes intermittently fail on
          // resource-starved CI runners with "Failed to fetch dynamically
          // imported module" / "Cannot connect to the iframe", per
          // https://storybook.js.org/docs/writing-tests/integrations/vitest-addon#why-do-my-tests-fail-in-ci-with-failed-to-fetch-dynamically-imported-module-or-cannot-connect-to-the-iframe
          isolate: false,
          fileParallelism: false,
          retry: process.env.CI ? 2 : 0,
          browser: {
            enabled: true,
            headless: true,
            provider: playwright(),
            instances: [{browser: 'chromium'}],
          },
        },
      },
      {
        // Browser tests that need direct control over the viewport
        plugins: [viteReact()],
        test: {
          name: 'tests',
          include: ['tests/**/*.test.{ts,tsx}'],
          // Keep maxWorkers identical to the storybook project — vitest
          // refuses to schedule projects with different maxWorkers in the
          // same sequence group
          fileParallelism: false,
          retry: process.env.CI ? 2 : 0,
          browser: {
            enabled: true,
            headless: true,
            provider: playwright(),
            instances: [{browser: 'chromium'}],
          },
          setupFiles: ['./.storybook/vitest.setup.ts'],
        },
      },
    ],
  },
})
