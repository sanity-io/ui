import {expect, test} from '@playwright/test'

test.describe('Components/MenuButton', () => {
  test('clicking should open/close menu', async ({page}) => {
    await page.goto('/frame/?path=/components/menu/menu-button')

    // click button
    await page.locator('#menu-button').click()
    await expect(page.locator('#menu-button[aria-expanded="true"]')).toBeVisible()

    // click outside
    await page.locator('#next-button').click()
    await expect(page.locator('#menu-button[aria-expanded="false"]')).toBeVisible()
  })

  test('should use arrow keys to navigate the menu', async ({page}) => {
    await page.goto('/frame/?path=/components/menu/menu-button')

    // Open menu by pressed DOWN arrow key
    await page.locator('#menu-button').focus()
    await page.keyboard.press('ArrowDown')
    await expect(page.locator('#menu-item-1')).toBeFocused()

    // Move through menu with arrow keys
    await page.keyboard.press('ArrowDown')
    await expect(page.locator('#menu-item-2')).toBeFocused()

    await page.keyboard.press('ArrowDown')
    // Skips #menu-item-3, because it's disabled
    await expect(page.locator('#menu-item-4')).toBeFocused()
    await page.keyboard.press('ArrowDown')
    // The first menu item should now be focused
    await expect(page.locator('#menu-item-1')).toBeFocused()
    // Escape to exit the menu
    await page.keyboard.press('Escape')
    await expect(page.locator('#menu-button')).toBeFocused()

    // Open menu by pressed UP arrow key
    await page.keyboard.press('ArrowUp')
    await expect(page.locator('#menu-item-4')).toBeFocused()
    // Move through menu with arrow keys
    await page.keyboard.press('ArrowUp')
    // Skips #menu-item-3, because it's disabled
    await expect(page.locator('#menu-item-2')).toBeFocused()
    await page.keyboard.press('ArrowUp')
    await expect(page.locator('#menu-item-1')).toBeFocused()
    await page.keyboard.press('ArrowUp')
    // The last menu item should now be focused
    await expect(page.locator('#menu-item-4')).toBeFocused()
    // Escape to exit the menu
    await page.keyboard.press('Escape')
    await expect(page.locator('#menu-button')).toBeFocused()
  })

  test('should close on tab', async ({page}) => {
    await page.goto('/frame/?path=/components/menu/menu-button')

    await page.locator('#menu-button').focus()
    await page.keyboard.press('ArrowDown')
    await expect(page.locator('#menu-item-1')).toBeFocused()
    await page.keyboard.press('Tab')
    await expect(page.locator('#menu-button[aria-expanded="true"]')).not.toBeVisible()
    await expect(page.locator('#next-button')).toBeFocused()
  })

  test('should close on shift + tab', async ({page}) => {
    await page.goto('/frame/?path=/components/menu/menu-button')

    await page.locator('#menu-button').focus()
    await page.keyboard.press('ArrowDown')
    await expect(page.locator('#menu-item-1')).toBeFocused()
    await page.keyboard.press('Shift+Tab')
    await expect(page.locator('#menu-button[aria-expanded="true"]')).not.toBeVisible()
    await expect(page.locator('#prev-button')).toBeFocused()
  })

  test('should not close when one of the items receives focus', async ({page}) => {
    await page.goto('/frame/?path=/components/menu/menu-button')

    await page.locator('#menu-button').click()
    await expect(page.locator('#menu-button')).toBeFocused()
    await page.locator('#menu-item-2').focus()
    await expect(page.locator('#menu-button[aria-expanded="true"]')).toBeVisible()
  })

  test('clicking should open/close menu (with selected items)', async ({page}) => {
    await page.goto('/frame/?path=/components/menu/selected-item')

    // click button
    await page.locator('#menu-button').click()
    await expect(page.locator('#menu-button[aria-expanded="true"]')).toBeVisible()

    // click the same button again
    await page.locator('#menu-button').click()
    await expect(page.locator('#menu-button[aria-expanded="false"]')).toBeVisible()
  })

  test('should show the selected menu item when opened', async ({page}) => {
    await page.goto('/frame/?path=/components/menu/selected-item')

    await page.locator('#menu-button').click()
    await expect(page.locator('#menu-item-2')).toBeFocused()
  })
})
