import {defineConfig} from '@playwright/test'

const PORT = 4173

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  retries: 0,
  reporter: [['list']],
  use: {
    baseURL: `http://localhost:${PORT}`,
    viewport: {width: 1400, height: 1000},
    launchOptions: {
      // Use the system Chrome when Playwright's own browsers are not installed
      executablePath: process.env.CHROME_PATH || undefined,
    },
  },
  webServer: {
    command: `pnpm preview`,
    port: PORT,
    reuseExistingServer: true,
    timeout: 30_000,
  },
})
