import {expect, test} from '@playwright/test'

test.describe('Components/Autocomplete', () => {
  test('should use key arrows', async ({page}) => {
    await page.goto('/frame/?path=/components/autocomplete/custom')

    await page.locator('#custom').click()

    // Search for "nor"
    await page.locator('#custom').fill('nor')

    // The listbox is expanded
    await expect(page.locator('#custom[aria-expanded="true"]')).toBeVisible()
    await expect(page.locator('#custom-listbox')).toBeVisible()

    // Arrow down 3 times
    await page.keyboard.press('ArrowDown')
    await page.keyboard.press('ArrowDown')
    await page.keyboard.press('ArrowDown')

    // The 3rd option should be focused
    await expect(page.locator('[data-qa="option-NO"]')).toBeFocused()

    // Escape to close listbox and clear input
    await page.keyboard.press('Escape')
    await expect(page.locator('#custom[aria-expanded="false"][value=""]')).toBeVisible()
  })

  test('should press clear button to clear', async ({page}) => {
    await page.goto('/frame/?path=/components/autocomplete/custom')

    await page.locator('#custom').click()

    // Search for "nor"
    await page.locator('#custom').fill('nor')

    // Arrow down 3 times
    await page.keyboard.press('ArrowDown')
    await page.keyboard.press('ArrowDown')
    await page.keyboard.press('ArrowDown')

    // Enter to select
    await expect(page.locator('[data-qa="option-NO"]')).toBeFocused()
    await page.keyboard.press('Enter')

    // Tab 1 time
    await expect(page.locator('#custom')).toBeFocused()
    await page.keyboard.press('Tab')

    // Enter to clear
    await expect(page.locator('[data-qa="clear-button"]')).toBeFocused()
    await page.locator('[data-qa="clear-button"]').click()

    // The input should be empty and focused
    await expect(page.locator('#custom[value=""]')).toBeFocused()
  })

  test('should collapse when tabbing out', async ({page}) => {
    await page.goto('/frame/?path=/components/autocomplete/custom')

    // Click to focus
    await page.locator('#custom').click()

    // Search for "nor"
    await page.locator('#custom:focus').fill('nor')

    // Tab 1 time
    await expect(page.locator('#custom[aria-expanded="true"]')).toBeFocused()

    // Focus the next focusable element
    await page.locator('#set-value-btn').focus()

    // Should be collapsed
    await expect(page.locator('#custom[aria-expanded="false"]')).toBeVisible()
  })

  test('should clear query on blur', async ({page}) => {
    await page.goto('/frame/?path=/components/autocomplete/custom')

    // Click to focus
    await page.locator('#custom').click()

    // Search for "nor"
    await page.locator('#custom').fill('nor')

    // Arrow down 3 times
    await page.keyboard.press('ArrowDown')
    await page.keyboard.press('ArrowDown')
    await page.keyboard.press('ArrowDown')

    // Enter to select
    await expect(page.locator('[data-qa="option-NO"]')).toBeFocused()
    await page.keyboard.press('Enter')

    await expect(page.locator('#custom[value="Norway"]:focus')).toBeVisible()

    // Click to focus
    await page.locator('#custom').click()

    // Search for "net"
    await page.keyboard.press('Backspace')
    await page.keyboard.press('Backspace')
    await page.keyboard.press('Backspace')
    await page.keyboard.press('Backspace')
    await page.keyboard.press('Backspace')
    await page.keyboard.press('Backspace')
    await page.locator('#custom').fill('net')

    // Tab out of autocomplete
    await page.locator('#set-value-btn').focus()

    // Expect the value to be "Norway" and autocomplete to be collapsed
    await expect(page.locator('#custom[aria-expanded="false"][value="Norway"]')).toBeVisible()
  })

  test('should search anew after selecting a value', async ({page}) => {
    await page.goto('/frame/?path=/components/autocomplete/custom')

    // Click to focus
    await page.locator('#custom').click()

    // Search for "nor"
    await page.locator('#custom').fill('nor')

    // Arrow down 3 times
    await page.keyboard.press('ArrowDown')
    await page.keyboard.press('ArrowDown')
    await page.keyboard.press('ArrowDown')

    // Enter to select
    await expect(page.locator('[data-qa="option-NO"]')).toBeFocused()
    await page.keyboard.press('Enter')

    await expect(page.locator('#custom[value="Norway"]:focus')).toBeVisible()

    // Click to focus
    await page.locator('#custom').click()

    // Search for "net"
    await page.keyboard.press('Backspace')
    await page.keyboard.press('Backspace')
    await page.keyboard.press('Backspace')
    await page.keyboard.press('Backspace')
    await page.keyboard.press('Backspace')
    await page.keyboard.press('Backspace')
    await page.locator('#custom').fill('net')

    // Arrow down 1 time
    await page.keyboard.press('ArrowDown')

    // Enter to select
    await expect(page.locator('[data-qa="option-NL"]')).toBeFocused()
    await page.keyboard.press('Enter')

    // Expect "Netherlands" to be selected
    await expect(page.locator('#custom[value="Netherlands"]:focus')).toBeVisible()
  })

  test('should trigger focus and blur', async ({page}) => {
    await page.goto('/frame/?path=/components/autocomplete/focus-and-blur')

    // Click to focus
    await page.locator('#focus-and-blur').click()
    await expect(page.locator('#focus-and-blur-log')).toHaveText('["focus"]')

    // Click body to blur
    await page.locator('body').click()
    await expect(page.locator('#focus-and-blur-log')).toHaveText('["focus","blur"]')

    // Clear log
    await page.locator('#focus-and-blur-clear-btn').click()

    // Click to focus
    await page.locator('#focus-and-blur').click()

    // Search for "foo"
    await page.locator('#focus-and-blur').fill('foo')
    await page.keyboard.press('ArrowDown')
    await expect(page.locator('#focus-and-blur-option-foo > button')).toBeFocused()
    await page.locator('#focus-and-blur-option-foo > button').click()

    // Expect "foo" to be selected
    await expect(page.locator('#focus-and-blur[value="foo"]:focus')).toBeVisible()
    await expect(page.locator('#focus-and-blur-log')).toHaveText('["focus"]')

    // Click body to blur
    await page.locator('body').click()
    await expect(page.locator('#focus-and-blur-log')).toHaveText('["focus","blur"]')
  })
})
