import {expect, test} from '@playwright/test'

test.describe('Components/Dialog', () => {
  test('should open dialog', async ({page}) => {
    await page.goto('/frame/?path=/components/dialog/props')

    await page.locator('#open-dialog-button').click()
    await expect(page.locator('#dialog')).toBeVisible()
  })

  test('should trap focus', async ({page}) => {
    await page.goto('/frame/?path=/components/dialog/props')

    await page.locator('#open-dialog-button').click()
    await expect(page.locator('#dialog')).toBeVisible()

    // The first button should be focused
    await expect(page.locator('#dialog button[aria-label="Close dialog"]')).toBeFocused()

    // Tab to next until the focus is back at the top
    await page.keyboard.press('Tab')
    await expect(page.locator('#button-1')).toBeFocused()
    await page.keyboard.press('Tab')
    await expect(page.locator('#button-2')).toBeFocused()
    await page.keyboard.press('Tab')
    await expect(page.locator('#button-3')).toBeFocused()
    await page.keyboard.press('Tab')
    await expect(page.locator('#button-4')).toBeFocused()
    await page.keyboard.press('Tab')
    await expect(page.locator('#button-5')).toBeFocused()
    await page.keyboard.press('Tab')
    await expect(page.locator('#dialog button[aria-label="Close dialog"]')).toBeFocused()
    await page.keyboard.press('Tab')

    // The first button should again be focused
    await expect(page.locator('#button-1')).toBeFocused()
  })

  test('should focus last focused element when dialog becomes top layer', async ({page}) => {
    await page.goto('/frame/?path=/components/dialog/activate')

    // Open the nested dialogs
    await page.locator('#open-dialog-1-button').click()
    await page.locator('#open-dialog-2-button-2').click()
    await page.locator('#open-dialog-3-button-3').click()

    // Close dialogs and check if the last focused element is focused
    await page.keyboard.press('Escape')
    await expect(page.locator('#open-dialog-3-button-3')).toBeFocused()

    await page.keyboard.press('Escape')
    await expect(page.locator('#open-dialog-2-button-2')).toBeFocused()

    await page.keyboard.press('Escape')
    await expect(page.locator('#open-dialog-1-button')).toBeFocused()
  })
})
