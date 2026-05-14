import {defineConfig, devices} from '@playwright/test'

const apps = [
  {
    name: 'next',
    port: 3000,
    cwd: './next',
    command: 'pnpm run build && pnpm run start',
  },
  {
    name: 'react-router',
    port: 3001,
    cwd: './react-router',
    command: 'pnpm run build && pnpm run start',
  },
  {
    name: 'vite',
    port: 3002,
    cwd: './vite',
    command: 'pnpm run build && pnpm run preview',
  },
]

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    trace: 'on-first-retry',
  },
  projects: apps.map((app) => ({
    name: app.name,
    use: {
      ...devices['Desktop Chrome'],
      baseURL: `http://localhost:${app.port}`,
    },
  })),
  webServer: apps.map((app) => ({
    name: app.name,
    cwd: app.cwd,
    command: app.command,
    url: `http://localhost:${app.port}`,
    reuseExistingServer: !process.env.CI,
    timeout: 300_000,
  })),
})
