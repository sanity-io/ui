import {expect, test} from '@playwright/test'

/**
 * Runs against next-smoke/ (Next.js 16, Turbopack, React Server Components)
 * which consumes the precompiled v1 library with no StyleX build configuration.
 */
test('precompiled StyleX library renders from a React Server Component', async ({page}) => {
  const response = await page.goto('/')
  expect(response?.ok()).toBe(true)

  // server-rendered HTML already carries the class names and the inline custom
  // property of the dynamic style (no client-side style injection)
  const html = await response!.text()
  expect(html).toMatch(/data-testid="rsc-dynamic"[^>]*style="--x-width:160px"/)
  expect(html).toContain('<link rel="stylesheet" href="/_next/static/chunks/')

  const primary = page.getByTestId('rsc-primary')
  await expect(primary).toHaveCSS('background-color', 'rgb(34, 118, 252)')
  await expect(primary).toHaveCSS('padding-top', '12px')
  await expect(primary).toHaveCSS('border-radius', '3px')
  await expect(page.getByTestId('rsc-ghost')).toHaveCSS('background-color', 'rgba(0, 0, 0, 0)')
  await expect(page.getByTestId('rsc-ghost')).toHaveCSS('color', 'rgb(204, 56, 41)')
  await expect(page.getByTestId('rsc-dynamic')).toHaveCSS('width', '160px')
  await expect(page.getByTestId('rsc-dark')).toHaveCSS('background-color', 'rgb(67, 214, 117)')
})
