/**
 * Regression guard for instant navigation into the home page. See
 * `instant-nav.rig.md` — only valid against a production build with the
 * testing API exposed.
 *
 * The home page reads no URL data and every fetch behind it is cached, so its
 * shell is the whole page: hero, headline and all. Nothing is gated under the
 * lock, so there is no skeleton to assert — these assertions go red if a
 * request-time read pushes any of it back to request time. The hero heading is
 * the LCP element, which is the part that most needs to stay in the shell.
 *
 * The suite's protection against a vacuous pass is `instant-nav.e2e.ts`, whose
 * gated-half assertion fails if the build is missing the testing API.
 */
import {instant} from '@next/playwright'
import {expect, test} from '@playwright/test'

import {articleContent, DOCS_PATH, heroSection, homeLink, HOME_PATH} from './helpers'

test.describe('instant navigation: /ui', () => {
  test('initial load serves the whole page', async ({page, baseURL}) => {
    await instant(
      page,
      async () => {
        await page.goto(HOME_PATH)
        await expect(heroSection(page)).toBeVisible()
        await expect(page.getByRole('heading', {level: 1})).toBeVisible()
      },
      {baseURL},
    )
  })

  test('the brand link commits the whole page', async ({page}) => {
    await page.goto(DOCS_PATH)
    await expect(articleContent(page)).toBeVisible({timeout: 20000})
    // The docs page renders no hero, so the assertions below cannot be
    // satisfied by what was already on screen before the click.
    await expect(heroSection(page)).toHaveCount(0)
    const brand = homeLink(page)
    await expect(brand).toBeVisible({timeout: 20000})

    await instant(page, async () => {
      await brand.click()
      await expect(heroSection(page)).toBeVisible()
      await expect(page.getByRole('heading', {level: 1})).toBeVisible()
    })

    await expect(page).toHaveURL(new RegExp(`${HOME_PATH}$`))
  })
})
