import {expect, test} from '@playwright/test'

test.describe('Primitives/TextInput', () => {
  test('read-only input should have focus styling', async ({page}) => {
    await page.goto('/iframe.html?id=primitives-textinput--read-only&viewMode=story')

    await page.locator('#text-input-example').click()

    await expect(page.locator('#text-input-example + span')).toHaveCSS(
      'box-shadow',
      'rgb(85, 107, 252) 0px 0px 0px 1px inset, rgb(227, 228, 232) 0px 0px 0px 1px inset',
    )
  })
})
