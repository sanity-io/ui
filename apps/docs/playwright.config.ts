import {defineConfig} from '@playwright/test'

const port = Number(process.env.PORT ?? 3000)
const baseURL = process.env.BASE_URL ?? `http://localhost:${port}`

export default defineConfig({
  testDir: './e2e',
  // Keep the suffix out of vitest's `*.test.ts` / `*.spec.ts` defaults, so
  // `pnpm test` doesn't try to run the browser suite.
  testMatch: '**/*.e2e.ts',
  forbidOnly: !!process.env.CI,
  // One `next start` process serves every spec; parallel workers make it the
  // bottleneck and turn navigation assertions into a load test.
  workers: 1,
  reporter: process.env.CI ? 'github' : 'list',
  use: {baseURL, trace: 'on-first-retry'},
  // `instant()` verdicts are only valid on a production build with the testing
  // API exposed; `BASE_URL` points the suite at an already-running one.
  webServer: process.env.BASE_URL
    ? undefined
    : {
        command: `next start --port ${port}`,
        url: `${baseURL}/ui`,
        env: {EXPOSE_TESTING_API: '1'},
        reuseExistingServer: !process.env.CI,
        timeout: 120_000,
      },
  projects: [
    {name: 'desktop', use: {browserName: 'chromium', viewport: {width: 1280, height: 800}}},
    // The shell has to match the real render at both breakpoints (the sidebar
    // collapses into the breadcrumbs bar below the `media[1]` breakpoint).
    {name: 'mobile', use: {browserName: 'chromium', viewport: {width: 390, height: 844}}},
  ],
})
