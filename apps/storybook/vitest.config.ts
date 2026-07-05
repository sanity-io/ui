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
