import path from 'node:path'

import {vanillaExtractPlugin} from '@sanity/vanilla-extract-vite-plugin'
import {storybookTest} from '@storybook/addon-vitest/vitest-plugin'
import viteReact from '@vitejs/plugin-react'
import {playwright} from '@vitest/browser-playwright'
import type {Plugin} from 'vite'
import {defineConfig} from 'vitest/config'

// 1×1 opaque PNG
const PNG = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==',
  'base64',
)

/**
 * Serves `/__slow-image?delay=<ms>` after the given delay, for tests that
 * need an image that is still loading when React commits.
 */
function slowImage(): Plugin {
  return {
    name: 'sanity-ui:slow-image',
    configureServer(server) {
      server.middlewares.use('/__slow-image', (req, res) => {
        const delay = Number(new URL(req.url ?? '', 'http://localhost').searchParams.get('delay'))

        setTimeout(() => {
          res.setHeader('Cache-Control', 'no-store')
          res.setHeader('Content-Type', 'image/png')
          res.end(PNG)
        }, delay || 0)
      })
    },
  }
}

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
          // Large color-matrix stories exceed 15s on styled-components 6.1.
          testTimeout: 120_000,
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
        // (vanillaExtractPlugin compiles the `.css.ts` modules of the
        // @sanity/ui source that the dev `exports` resolve to)
        plugins: [viteReact(), vanillaExtractPlugin(), slowImage()],
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
      {
        // Pure helpers of the dev scripts (the Chrome launcher's environment allowlist and argv); plain
        // node, no browser
        test: {
          name: 'scripts',
          include: ['scripts/**/*.test.ts'],
          environment: 'node',
          fileParallelism: false,
        },
      },
    ],
  },
})
