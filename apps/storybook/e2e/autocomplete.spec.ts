import {expect, test} from '@playwright/test'

test.describe('Components/Autocomplete', () => {
  test('should use key arrows', async ({page}) => {
    await page.goto('/iframe.html?id=components-autocomplete--custom&viewMode=story')

    const input = page.locator('#custom')
    const listbox = page.locator('#custom-listbox')

    await input.click()

    // Search for "nor"
    await input.pressSequentially('nor')

    // The listbox is expanded
    await expect(input).toHaveAttribute('aria-expanded', 'true')
    await expect(listbox).toBeAttached()

    // Arrow down 3 times
    await page.keyboard.press('ArrowDown')
    await page.keyboard.press('ArrowDown')
    await page.keyboard.press('ArrowDown')

    // The 3rd option should be focused
    await expect(page.locator('[data-qa="option-NO"]')).toBeFocused()

    // Escape to close listbox and clear input
    await page.keyboard.press('Escape')
    await expect(input).toHaveAttribute('aria-expanded', 'false')
    await expect(input).toHaveValue('')
  })

  test('should press clear button to clear', async ({page}) => {
    await page.goto('/iframe.html?id=components-autocomplete--custom&viewMode=story')

    const input = page.locator('#custom')
    const listbox = page.locator('#custom-listbox')

    await input.click()

    // Search for "nor"
    await input.pressSequentially('nor')

    // Arrow down 3 times
    await expect(listbox).toBeAttached()
    await page.keyboard.press('ArrowDown')
    await page.keyboard.press('ArrowDown')
    await page.keyboard.press('ArrowDown')

    // Enter to select
    await expect(page.locator('[data-qa="option-NO"]')).toBeFocused()
    await page.keyboard.press('Enter')

    // Tab 1 time
    await expect(input).toBeFocused()
    await page.keyboard.press('Tab')

    // Enter to clear
    const clearButton = page.locator('[data-qa="clear-button"]')
    await expect(clearButton).toBeFocused()
    await clearButton.click()

    // The input should be empty and focused
    await expect(input).toHaveValue('')
    await expect(input).toBeFocused()
  })

  test('should collapse when tabbing out', async ({page}) => {
    await page.goto('/iframe.html?id=components-autocomplete--custom&viewMode=story')

    const input = page.locator('#custom')

    // Click to focus
    await input.click()
    await expect(input).toBeFocused()

    // Search for "nor"
    await input.pressSequentially('nor')

    // The input is expanded and focused
    await expect(input).toHaveAttribute('aria-expanded', 'true')
    await expect(input).toBeFocused()

    // Focus the next focusable element
    await page.locator('#set-value-btn').focus()

    // Should be collapsed
    await expect(input).toHaveAttribute('aria-expanded', 'false')
  })

  test('should clear query on blur', async ({page}) => {
    await page.goto('/iframe.html?id=components-autocomplete--custom&viewMode=story')

    const input = page.locator('#custom')
    const listbox = page.locator('#custom-listbox')

    // Click to focus
    await input.click()

    // Search for "nor"
    await input.pressSequentially('nor')

    // Arrow down 3 times
    await expect(listbox).toBeAttached()
    await page.keyboard.press('ArrowDown')
    await page.keyboard.press('ArrowDown')
    await page.keyboard.press('ArrowDown')

    // Enter to select
    await expect(page.locator('[data-qa="option-NO"]')).toBeFocused()
    await page.keyboard.press('Enter')

    await expect(input).toHaveValue('Norway')
    await expect(input).toBeFocused()

    // Click to focus
    await input.click()

    // Search for "net"
    for (let i = 0; i < 6; i++) {
      await page.keyboard.press('Backspace')
    }
    await input.pressSequentially('net')

    // Tab out of autocomplete
    await page.locator('#set-value-btn').focus()

    // Expect the value to be "Norway" and autocomplete to be collapsed
    await expect(input).toHaveAttribute('aria-expanded', 'false')
    await expect(input).toHaveValue('Norway')
  })

  test('should search anew after selecting a value', async ({page}) => {
    await page.goto('/iframe.html?id=components-autocomplete--custom&viewMode=story')

    const input = page.locator('#custom')
    const listbox = page.locator('#custom-listbox')

    // Click to focus
    await input.click()

    // Search for "nor"
    await input.pressSequentially('nor')

    // Arrow down 3 times
    await expect(listbox).toBeAttached()
    await page.keyboard.press('ArrowDown')
    await page.keyboard.press('ArrowDown')
    await page.keyboard.press('ArrowDown')

    // Enter to select
    await expect(page.locator('[data-qa="option-NO"]')).toBeFocused()
    await page.keyboard.press('Enter')

    await expect(input).toHaveValue('Norway')
    await expect(input).toBeFocused()

    // Click to focus
    await input.click()

    // Search for "net"
    for (let i = 0; i < 6; i++) {
      await page.keyboard.press('Backspace')
    }
    await input.pressSequentially('net')

    // Arrow down 1 time
    await expect(listbox).toBeAttached()
    await page.keyboard.press('ArrowDown')

    // Enter to select
    await expect(page.locator('[data-qa="option-NL"]')).toBeFocused()
    await page.keyboard.press('Enter')

    // Expect "Netherlands" to be selected
    await expect(input).toHaveValue('Netherlands')
    await expect(input).toBeFocused()
  })

  test('should trigger focus and blur', async ({page}) => {
    await page.goto('/iframe.html?id=components-autocomplete--focus-and-blur&viewMode=story')

    const input = page.locator('#focus-and-blur')
    const log = page.locator('#focus-and-blur-log')

    // Click to focus
    await input.click()
    await expect(log).toHaveText('["focus"]')

    // Click body to blur
    await page.mouse.click(500, 500)
    await expect(log).toHaveText('["focus","blur"]')

    // Clear log
    await page.locator('#focus-and-blur-clear-btn').click()

    // Click to focus
    await input.click()

    // Search for "foo"
    await input.pressSequentially('foo')
    await expect(page.locator('#focus-and-blur-listbox')).toBeAttached()
    await page.keyboard.press('ArrowDown')

    const option = page.locator('#focus-and-blur-option-foo > div')

    await expect(option).toBeFocused()
    await option.click()

    // Expect "foo" to be selected
    await expect(input).toHaveValue('foo')
    await expect(input).toBeFocused()
    await expect(log).toHaveText('["focus"]')

    // Click body to blur
    await page.mouse.click(500, 500)
    await expect(log).toHaveText('["focus","blur"]')
  })
})
