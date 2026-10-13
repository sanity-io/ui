import {defineConfig} from '@playwright/test'

export default defineConfig({
  testDir: './app/tests',
  fullyParallel: false,
  retries: 0,
  reporter: [['list'], ['json', {outputFile: 'evidence/playwright-results.json'}]],
  use: {
    baseURL: 'http://localhost:4173',
    browserName: 'chromium',
    viewport: {width: 1400, height: 1000},
  },
  webServer: {
    // production build served statically — the same bytes a deployed app ships
    command: 'pnpm exec vite preview app --port 4173 --strictPort',
    url: 'http://localhost:4173',
    reuseExistingServer: !process.env.CI,
    timeout: 30_000,
  },
})
