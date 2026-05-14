import {test, expect} from '@playwright/test'

test('has welcome text', async ({page}) => {
  await page.goto('/')

  await expect(page.getByRole('heading', {name: 'Sanity UI'})).toBeVisible()

  await expect(
    page.getByText('A sandbox for testing Sanity UI component installation and rendering.'),
  ).toBeVisible()

  await expect(page.getByRole('separator')).toBeVisible()
})
