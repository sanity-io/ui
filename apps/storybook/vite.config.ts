/* eslint-disable-next-line @typescript-eslint/triple-slash-reference */
/// <reference types="vitest/config" />
// https://vite.dev/config/
import path from 'node:path'
import {fileURLToPath} from 'node:url'

import {storybookTest} from '@storybook/addon-vitest/vitest-plugin'
import react from '@vitejs/plugin-react'
import {playwright} from '@vitest/browser-playwright'
import {defineConfig} from 'vite'
import {coverageConfigDefaults} from 'vitest/config'
const dirname =
  typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url))
const monorepoDirname = path.resolve(dirname, '../..')

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  plugins: [react()],
  test: {
    coverage: {
      provider: 'v8',
      allowExternal: true,
      exclude: [...coverageConfigDefaults.exclude, '**/assets/**', '**/utils/**'],
      include: [
        '**/stories/**',
        path.join(monorepoDirname, 'packages/ui/src/components/**/*.{ts,tsx}'),
      ],
    },
    projects: [
      {
        extends: true,
        plugins: [
          // The plugin will run tests for the stories defined in your Storybook config
          // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
          storybookTest({
            configDir: path.join(dirname, '.storybook'),
          }),
        ],
        test: {
          name: 'storybook',
          browser: {
            enabled: true,
            headless: true,
            provider: playwright({}),
            instances: [
              {
                browser: 'chromium',
              },
            ],
          },
        },
      },
    ],
  },
})
