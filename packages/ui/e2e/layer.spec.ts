import {expect, test} from '@playwright/test'

test.describe('Primitives/Layer', () => {
  test('should support responsive z-offset', async ({page}) => {
    await page.goto('/frame/?path=/primitives/layer/responsive-z-offset')

    const sizes = [
      {viewport: [320, 600], css: {zIndex: '1'}},
      {viewport: [360, 600], css: {zIndex: '2'}},
      {viewport: [600, 600], css: {zIndex: '3'}},
      {viewport: [900, 600], css: {zIndex: '4'}},
      {viewport: [1200, 600], css: {zIndex: '5'}},
      {viewport: [1800, 600], css: {zIndex: '6'}},
      {viewport: [2400, 600], css: {zIndex: '7'}},
    ]

    for (const size of sizes) {
      const {css, viewport} = size

      await page.setViewportSize({width: viewport[0], height: viewport[1]})
      await page.reload()

      await expect(page.locator('#responsive-layer')).toHaveAttribute(
        'style',
        `z-index: ${css.zIndex};`,
      )
    }
  })

  test('should calculate size of nested layers', async ({page}) => {
    await page.goto('/frame/?path=/primitives/layer/nested')

    await page.locator('#open-layer-1').first().click()

    await expect(page.locator('#layer-debug-info-1').first()).toContainText('size=1')

    await page.locator('#open-layer-2').first().click()

    await expect(page.locator('#layer-debug-info-1').first()).toContainText('size=2')
  })
})
