import {expect, test} from '@playwright/test'

test.describe('Primitives/TextInput', () => {
  test('read-only input should be focusable', async ({page}) => {
    await page.goto('/frame/?path=/primitives/text-input/read-only')

    const input = page.locator('#text-input-example')
    await input.click()

    // Verify the read-only input is focused
    await expect(input).toBeFocused()

    // Verify it's read-only
    await expect(input).toHaveAttribute('readonly', '')
  })
})
