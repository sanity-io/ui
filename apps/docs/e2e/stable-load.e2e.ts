/**
 * Regression guard for a stable initial load: a hard load must paint the page
 * once, in place, with no cumulative layout shift, in both color schemes.
 *
 * Two regressions have caused flashes here before, and each half of this
 * suite pins one of them:
 *
 * - A request-time read above the page (the `headers()`-based color scheme
 *   detection) turns the whole document into a Suspense fallback plus a
 *   server-resumed copy, and the client swaps one for the other on every
 *   load. The document test fails on the duplicated markup.
 * - Serving the SSR styled-components sheet without letting the client adopt
 *   it makes hydration rebuild the sheet across several paints, transiently
 *   flipping equal-specificity winners (Box's `margin: 0` vs Container's
 *   `margin: 0 auto`) and shifting the page left and back. The CLS test
 *   fails on those shifts.
 */
import {expect, test} from '@playwright/test'

import {heroSection, HOME_PATH} from './helpers'

declare global {
  interface Window {
    __cls: number
  }
}

/** Not in TypeScript's DOM lib yet. */
type LayoutShiftEntry = PerformanceEntry & {hadRecentInput: boolean; value: number}

for (const colorScheme of ['light', 'dark'] as const) {
  test.describe(`initial load is stable (prefers ${colorScheme})`, () => {
    test.use({colorScheme})

    test('hard load of /ui paints without layout shifts', async ({page}) => {
      await page.addInitScript(() => {
        window.__cls = 0
        new PerformanceObserver((list) => {
          for (const entry of list.getEntries() as LayoutShiftEntry[]) {
            if (!entry.hadRecentInput) window.__cls += entry.value
          }
        }).observe({type: 'layout-shift', buffered: true})
      })

      await page.goto(HOME_PATH, {waitUntil: 'networkidle'})
      await expect(heroSection(page)).toBeVisible()
      // Let hydration (and the deferred flip to the dark scheme) settle.
      await page.waitForTimeout(1000)

      expect(await page.evaluate(() => window.__cls)).toBeLessThan(0.01)
    })
  })
}

test('the document carries the page once, not as fallback + resumed copy', async ({request}) => {
  const html = await (await request.get(HOME_PATH)).text()

  expect(html.match(/data-testid="hero-section"/g)).toHaveLength(1)
})
