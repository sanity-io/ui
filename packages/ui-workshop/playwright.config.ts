import {env} from 'node:process'

import {defineConfig, devices} from '@playwright/test'
const isDev = env['PLAYWRIGHT_DEV'] === 'true'

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!env['CI'],
  retries: env['CI'] ? 2 : 0,
  workers: env['CI'] ? 1 : undefined,
  reporter: 'list',
  use: {
    baseURL: 'http://localhost:1337',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: {...devices['Desktop Chrome']},
    },
  ],
  webServer: {
    command: isDev ? 'pnpm workshop:dev' : 'pnpm workshop:build && pnpm workshop:preview',
    url: 'http://localhost:1337',
    reuseExistingServer: !env['CI'],
    timeout: 120000,
  },
})
