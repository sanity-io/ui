import {defineConfig} from '@playwright/test'

export default defineConfig({
  testDir: './app/tests',
  fullyParallel: false,
  retries: 0,
  reporter: [['list'], ['json', {outputFile: 'evidence/playwright-results.json'}]],
  use: {
    browserName: 'chromium',
    viewport: {width: 1400, height: 1000},
  },
  projects: [
    {
      name: 'vite-app (v1 + v2 on one page)',
      testMatch: /collision\.spec\.ts/,
      use: {baseURL: 'http://localhost:4173'},
    },
    {
      name: 'next-16 RSC (precompiled library)',
      testMatch: /next-rsc\.spec\.ts/,
      use: {baseURL: 'http://localhost:3077'},
    },
  ],
  webServer: [
    {
      // production build served statically — the same bytes a deployed app ships
      command: 'pnpm exec vite preview app --port 4173 --strictPort',
      url: 'http://localhost:4173',
      reuseExistingServer: !process.env.CI,
      timeout: 30_000,
    },
    {
      command: 'pnpm --filter css-eval-stylex-next-smoke exec next start -p 3077',
      url: 'http://localhost:3077',
      reuseExistingServer: !process.env.CI,
      timeout: 60_000,
    },
  ],
})
