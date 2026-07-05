import {expect, test} from '@playwright/test'

test.describe('Primitives/Box', () => {
  test('resizing window should hide and show responsive elements', async ({page}) => {
    await page.goto('/iframe.html?id=primitives-box--responsive&viewMode=story')

    const sizes = [
      {viewport: [320, 600], css: {display: 'none', flex: '1 1 0%', boxSizing: 'content-box'}},
      {viewport: [360, 600], css: {display: 'block', flex: '2 1 0%', boxSizing: 'border-box'}},
      {viewport: [600, 600], css: {display: 'none', flex: '3 1 0%', boxSizing: 'content-box'}},
      {viewport: [900, 600], css: {display: 'block', flex: '4 1 0%', boxSizing: 'border-box'}},
      {viewport: [1200, 600], css: {display: 'none', flex: '5 1 0%', boxSizing: 'content-box'}},
      {viewport: [1800, 600], css: {display: 'block', flex: '6 1 0%', boxSizing: 'border-box'}},
      {viewport: [2400, 600], css: {display: 'none', flex: '7 1 0%', boxSizing: 'content-box'}},
    ]

    const box = page.locator('#responsive-box')

    for (const size of sizes) {
      const {css, viewport} = size

      await page.setViewportSize({width: viewport[0], height: viewport[1]})

      await expect(box).toHaveCSS('display', css.display)
      await expect(box).toHaveCSS('flex', css.flex)
      await expect(box).toHaveCSS('box-sizing', css.boxSizing)
    }
  })
})
