import {Browser, BrowserContext} from 'playwright'
import qawolf from 'qawolf'

let browser: Browser
let context: BrowserContext

beforeAll(async () => {
  browser = await qawolf.launch()
  context = await browser.newContext()
  await qawolf.register(context)
})

afterAll(async () => {
  await qawolf.stopVideos()
  await browser.close()
})

describe('Responsive props', () => {
  it('resizing window should hide and show responsive elements', async () => {
    const page = await context.newPage()

    const url = 'http://localhost:9009/iframe.html?id=atoms-box--responsive&viewMode=story'

    await page.goto(url, {waitUntil: 'domcontentloaded'})

    const widthResponsivePropMap = {
      320: 'none',
      640: 'block',
      960: 'none',
      1280: 'block',
      1600: 'none',
      1920: 'block',
    }

    for (const width of Object.keys(widthResponsivePropMap)) {
      await page.setViewportSize({width: Number(width) - 1, height: 1024})

      const element = await page.$('#responsive-box')

      if (!element) {
        throw new Error('Expected test element to be found')
      }

      const display = await element.evaluate((uiElement) =>
        getComputedStyle(uiElement).getPropertyValue('display')
      )

      // @ts-ignore
      expect(display).toBe(widthResponsivePropMap[width])
    }
  })
})
