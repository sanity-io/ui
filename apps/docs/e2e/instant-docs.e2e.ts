/**
 * Regression guard for instant navigation into the docs landing screen. See
 * `instant-nav.rig.md` — only valid against a production build with the
 * testing API exposed.
 *
 * Unlike the article guard, nothing on this screen is gated under the lock, so
 * there is no skeleton to assert: `generateStaticParams` enumerates `screen`
 * and every read behind it is cached, so the shell for this path carries the
 * whole page — with or without a full prefetch on the link. These assertions
 * lock that in; they go red if a request-time read (`cookies()`, `headers()`,
 * `connection()`, an uncached fetch) or a dropped `generateStaticParams` pushes
 * the screen back to request time.
 *
 * The suite's protection against a vacuous pass is `instant-nav.e2e.ts`, whose
 * gated-half assertion fails if the build is missing the testing API.
 */
import {instant} from '@next/playwright'
import {expect, test} from '@playwright/test'

import {articleChrome, articleContent, DOCS_PATH, docsLink, HOME_PATH} from './helpers'

test.describe('instant navigation: /ui/docs', () => {
  test('initial load serves the whole screen', async ({page, baseURL}) => {
    await instant(
      page,
      async () => {
        await page.goto(DOCS_PATH)
        await expect(articleChrome(page)).toBeVisible()
        await expect(articleContent(page)).toBeVisible()
      },
      {baseURL},
    )
  })

  test('the navbar link commits the whole screen', async ({page}) => {
    await page.goto(HOME_PATH)
    // The home page renders no article chrome, so the assertions below cannot
    // be satisfied by what was already on screen before the click.
    await expect(articleChrome(page)).toHaveCount(0)
    const trigger = docsLink(page)
    await expect(trigger).toBeVisible({timeout: 20000})

    await instant(page, async () => {
      await trigger.click()
      await expect(articleChrome(page)).toBeVisible()
      await expect(articleContent(page)).toBeVisible()
    })

    await expect(page).toHaveURL(new RegExp(`${DOCS_PATH}$`))
  })
})
