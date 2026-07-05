import {expect, test} from '@playwright/test'

test.describe('Components/MenuButton', () => {
  test('clicking should open/close menu', async ({page}) => {
    await page.goto('/iframe.html?id=components-menubutton--keyboard-navigation&viewMode=story')

    const menuButton = page.locator('#menu-button')

    // click button
    await menuButton.click()
    await expect(menuButton).toHaveAttribute('aria-expanded', 'true')

    // click outside
    await page.locator('#next-button').click()
    await expect(menuButton).toHaveAttribute('aria-expanded', 'false')
  })

  test('should use arrow keys to navigate the menu', async ({page}) => {
    await page.goto('/iframe.html?id=components-menubutton--keyboard-navigation&viewMode=story')

    const menuButton = page.locator('#menu-button')

    // Open menu by pressing DOWN arrow key
    await menuButton.focus()
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
    await expect(menuButton).toBeFocused()

    // Open menu by pressing UP arrow key
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
    await expect(menuButton).toBeFocused()
  })

  test('should close on tab', async ({page}) => {
    await page.goto('/iframe.html?id=components-menubutton--keyboard-navigation&viewMode=story')

    await page.locator('#menu-button').focus()
    await page.keyboard.press('ArrowDown')
    await expect(page.locator('#menu-item-1')).toBeFocused()
    await page.keyboard.press('Tab')
    await expect(page.locator('#menu-button[aria-expanded="true"]')).not.toBeAttached()
    await expect(page.locator('#next-button')).toBeFocused()
  })

  test('should close on shift + tab', async ({page}) => {
    await page.goto('/iframe.html?id=components-menubutton--keyboard-navigation&viewMode=story')

    await page.locator('#menu-button').focus()
    await page.keyboard.press('ArrowDown')
    await expect(page.locator('#menu-item-1')).toBeFocused()
    await page.keyboard.press('Shift+Tab')
    await expect(page.locator('#menu-button[aria-expanded="true"]')).not.toBeAttached()
    await expect(page.locator('#prev-button')).toBeFocused()
  })

  test('should not close when one of the items receives focus', async ({page}) => {
    await page.goto('/iframe.html?id=components-menubutton--keyboard-navigation&viewMode=story')

    const menuButton = page.locator('#menu-button')

    await menuButton.click()
    await expect(menuButton).toBeFocused()
    await page.locator('#menu-item-2').focus()
    await expect(menuButton).toHaveAttribute('aria-expanded', 'true')
  })

  test('clicking should open/close menu (with selected items)', async ({page}) => {
    await page.goto('/iframe.html?id=components-menubutton--selected-item-focus&viewMode=story')

    const menuButton = page.locator('#menu-button')

    // click button
    await menuButton.click()
    await expect(menuButton).toHaveAttribute('aria-expanded', 'true')

    // click the same button again
    await menuButton.click()
    await expect(menuButton).toHaveAttribute('aria-expanded', 'false')
  })

  test('should show the selected menu item when opened', async ({page}) => {
    await page.goto('/iframe.html?id=components-menubutton--selected-item-focus&viewMode=story')

    await page.locator('#menu-button').click()
    await expect(page.locator('#menu-item-2')).toBeFocused()
  })
})
