import {defineConfig, devices} from '@playwright/test'

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: Boolean(process.env['CI']),
  retries: process.env['CI'] ? 2 : 0,
  reporter: [['list'], ['html', {open: 'never'}]],
  use: {
    baseURL: 'http://localhost:6006',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: {...devices['Desktop Chrome']},
    },
  ],
  webServer: {
    command: 'run-s storybook:build storybook:start',
    url: 'http://localhost:6006',
    reuseExistingServer: !process.env['CI'],
    timeout: 300_000,
  },
})
