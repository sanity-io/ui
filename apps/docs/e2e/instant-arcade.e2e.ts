/**
 * Regression guard for instant navigation into the arcade screen. See
 * `instant-nav.rig.md` — only valid against a production build with the
 * testing API exposed.
 *
 * The arcade editor is client-only by design (`ssr: false`), so the server has
 * no arcade markup to send. Two things therefore matter here, and neither is a
 * timing assertion:
 *
 * 1. The navigation commits under the lock (the two `instant()` specs).
 * 2. The shell it commits isn't an empty slot — the prerendered document
 *    carries the segment's loading UI, which the chunk swaps out (the third
 *    spec). Asserting that on the document rather than in the browser keeps it
 *    deterministic: the client mounts the arcade a moment later either way.
 */
import {instant} from '@next/playwright'
import {expect, test} from '@playwright/test'

import {ARCADE_PATH, arcadeLink, arcadeScreen, articleFallback, HOME_PATH} from './helpers'

test.describe('instant navigation: /ui/arcade', () => {
  test('initial load commits the arcade', async ({page, baseURL}) => {
    await instant(
      page,
      async () => {
        await page.goto(ARCADE_PATH)
        await expect(arcadeScreen(page)).toBeVisible()
      },
      {baseURL},
    )
  })

  test('the navbar link commits the arcade', async ({page}) => {
    await page.goto(HOME_PATH)
    await expect(arcadeScreen(page)).toHaveCount(0)
    const trigger = arcadeLink(page)
    await expect(trigger).toBeVisible({timeout: 20000})

    await instant(page, async () => {
      await trigger.click()
      await expect(arcadeScreen(page)).toBeVisible()
    })

    // The arcade encodes its editor state in the query string once it mounts
    await expect(page).toHaveURL(new RegExp(`${ARCADE_PATH}(\\?|$)`))
  })

  test('the prerendered shell fills the arcade slot', async ({page}) => {
    const response = await page.request.get(ARCADE_PATH)
    expect(response.ok()).toBe(true)
    expect(await response.text()).toContain('data-testid="article-loading"')
    // And the placeholder is what a reader actually sees there, not a hidden node
    await page.goto(ARCADE_PATH)
    await expect(articleFallback(page).or(arcadeScreen(page)).first()).toBeVisible()
  })
})
