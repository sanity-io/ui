import {defineConfig} from '@playwright/test'

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  reporter: [['list']],
  use: {
    baseURL: 'http://localhost:4173',
    viewport: {width: 1400, height: 1000},
  },
  webServer: {
    command: 'node_modules/.bin/vite --config consumer/vite.config.ts',
    url: 'http://localhost:4173',
    reuseExistingServer: true,
    timeout: 60_000,
  },
})
