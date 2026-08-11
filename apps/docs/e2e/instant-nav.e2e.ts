/**
 * Regression guard for instant navigation into a docs article, per the
 * `next-cache-components-optimizer` workflow. `instant()` gates dynamic data,
 * so the static shell has to commit without it: a blocking route cannot.
 *
 * Only valid against a production build with the testing API exposed — see
 * `instant-nav.rig.md`.
 */
import {instant} from '@next/playwright'
import {expect, test} from '@playwright/test'

import {
  ARTICLE_PATH,
  articleChrome,
  articleContent,
  articleFallback,
  popoverLink,
  SIBLING_ARTICLE_PATH,
  SIDEBAR_BREAKPOINT,
} from './helpers'

test.describe('instant navigation: /ui/docs/primitive/popover', () => {
  // The article is prerendered (`generateStaticParams`) and every read behind
  // it is cached, so the whole page — chrome and body — belongs to the static
  // shell on a hard load. Nothing is left to defer, which is why this spec has
  // no gated half; the soft-nav spec below is what proves the lock engages.
  test('initial load serves the whole article', async ({page, baseURL}) => {
    await instant(
      page,
      async () => {
        await page.goto(ARTICLE_PATH)
        await expect(articleChrome(page)).toBeVisible()
        await expect(articleContent(page)).toBeVisible()
      },
      {baseURL},
    )
  })

  test('a sidebar click commits the article slot', async ({page}) => {
    test.skip(
      page.viewportSize()!.width < SIDEBAR_BREAKPOINT,
      'the sidebar is collapsed behind the breadcrumbs menu below media[1]',
    )
    await page.goto(SIBLING_ARTICLE_PATH)
    const trigger = popoverLink(page)
    await expect(trigger).toBeVisible({timeout: 20000})

    await instant(page, async () => {
      await trigger.click()
      // The destination's slot commits its loading UI while the body — which
      // is keyed by `params` and so can never be in the shared App Shell — is
      // still gated. The chrome is part of that shell, so it must not blink.
      await expect(articleFallback(page)).toBeVisible()
      await expect(articleChrome(page)).toBeVisible()
      await expect(articleContent(page)).toHaveCount(0)
    })

    await expect(articleContent(page)).toBeVisible()
    await expect(
      articleChrome(page).locator(`li[data-selected] a[href="${ARTICLE_PATH}"]`),
    ).toBeVisible()
    await expect(page).toHaveURL(new RegExp(`${ARTICLE_PATH}$`))
  })
})
