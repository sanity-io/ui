import {expect, test} from '@playwright/test'

test.describe('Components/Tab', () => {
  test('should use keys to navigate tabs', async ({page}) => {
    await page.goto('/iframe.html?id=components-tab--example&viewMode=story')

    await page.locator('#example-tab-foo').click()
    await page.keyboard.press('ArrowRight')

    await expect(page.locator('#example-tab-bar')).toBeFocused()
    await page.keyboard.press('ArrowRight')

    await expect(page.locator('#example-tab-baz')).toBeFocused()
    await page.keyboard.press('ArrowRight')

    await expect(page.locator('#example-tab-foo')).toBeFocused()

    // Trigger "Tab"
    await page.keyboard.press('Tab')

    // Expect the panel to be focused
    await expect(page.locator('#example-panel-foo')).toBeFocused()
  })
})
