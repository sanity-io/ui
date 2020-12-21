import {Page} from 'playwright'

export async function withElement(
  page: Page,
  selector: string,
  fn: (element: SVGElement | HTMLElement) => Record<string, string>
) {
  const el = await page.$(selector)

  if (!el) {
    throw new Error('withElement: expected test element to be found')
  }

  return await el.evaluate(fn)
}
