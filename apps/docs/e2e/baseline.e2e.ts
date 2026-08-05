/**
 * Phase B scaffold of the `next-cache-components-optimizer` workflow: prove the
 * markers are real and reachable WITHOUT the `instant()` lock, so a red locked
 * test means "not instant" rather than "marker absent".
 *
 * DELETE THIS FILE before opening the PR; only the locked spec ships.
 */
import {expect, test} from '@playwright/test'

import {
  ARTICLE_PATH,
  articleChrome,
  articleContent,
  expectPublishedPerspective,
  HOME_PATH,
  popoverLink,
  SIBLING_ARTICLE_PATH,
  SIDEBAR_BREAKPOINT,
} from './helpers'

test('baseline: the popover article renders its chrome and body on initial load', async ({
  page,
}) => {
  await page.goto(ARTICLE_PATH)
  await expectPublishedPerspective(page)
  await expect(articleChrome(page)).toBeVisible({timeout: 15000})
  await expect(articleContent(page)).toBeVisible({timeout: 15000})
})

test('baseline: clicking the sidebar link reaches the popover article', async ({page}) => {
  test.skip(
    page.viewportSize()!.width < SIDEBAR_BREAKPOINT,
    'the sidebar is collapsed behind the breadcrumbs menu below media[1]',
  )
  await page.goto(SIBLING_ARTICLE_PATH)
  const trigger = popoverLink(page)
  await expect(trigger).toBeVisible({timeout: 20000})
  await trigger.click()
  await expect(page).toHaveURL(new RegExp(`${ARTICLE_PATH}$`))
  await expect(articleContent(page)).toBeVisible({timeout: 15000})
})

test('baseline: the article slot has a loading placeholder in its shell', async ({page}) => {
  // The C-gate question for the soft-nav marker: `article-loading` is the
  // route's own `loading.tsx`, and it ships inside the prerendered document,
  // so a locked test that never sees it is reporting a blocked navigation
  // rather than a marker that does not exist.
  const response = await page.request.get(ARTICLE_PATH)
  expect(response.ok()).toBe(true)
  expect(await response.text()).toContain('data-testid="article-loading"')
})

test('baseline: the docs chrome is reachable from the home page', async ({page}) => {
  await page.goto(HOME_PATH)
  const trigger = page.locator('a[href^="/ui/docs/motivation"]').first()
  await expect(trigger).toBeVisible({timeout: 20000})
  await trigger.click()
  await expect(articleChrome(page)).toBeVisible({timeout: 15000})
})
