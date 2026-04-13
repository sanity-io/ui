import {expect, test} from '@playwright/test'

test.describe('Components/Tab', () => {
  test('should use keys to navigate tabs', async ({page}) => {
    await page.goto('/frame/?path=/components/tab/example')

    await page.locator('#example-tab-foo').click()
    await page.keyboard.press('ArrowRight')

    await expect(page.locator('#example-tab-bar')).toBeFocused()
    await page.keyboard.press('ArrowRight')

    await expect(page.locator('#example-tab-baz')).toBeFocused()
    await page.keyboard.press('ArrowRight')

    await expect(page.locator('#example-tab-foo')).toBeFocused()

    // Trigger "Tab"
    await page.keyboard.press('Tab')

    // Expect the panel to be focus
    await expect(page.locator('#example-panel-foo')).toBeFocused()
  })
})
