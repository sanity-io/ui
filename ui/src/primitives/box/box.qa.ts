import {Browser, BrowserContext} from 'playwright'
import qawolf from 'qawolf'

let browser: Browser | undefined
let context: BrowserContext | undefined

beforeAll(async () => {
  browser = await qawolf.launch()
  context = await browser.newContext()
  await qawolf.register(context)
})

afterAll(async () => {
  await qawolf.stopVideos()
  await browser?.close()
})

describe('Primitives/Box', () => {
  it('resizing window should hide and show responsive elements', async () => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const page = await context!.newPage()

    const url = 'http://localhost:9009/iframe.html?id=atoms-box--responsive&viewMode=story'

    await page.goto(url, {waitUntil: 'domcontentloaded'})

    const responsiveStyles = {
      // 360, 600, 900, 1200, 1800, 2400
      '320': {display: 'none', flex: '1 1 0%', boxSizing: 'content-box'},
      '375': {display: 'block', flex: '2 1 0%', boxSizing: 'border-box'},
      '768': {display: 'none', flex: '3 1 0%', boxSizing: 'content-box'},
      '1024': {display: 'block', flex: '4 1 0%', boxSizing: 'border-box'},
      '1600': {display: 'none', flex: '5 1 0%', boxSizing: 'content-box'},
      '1920': {display: 'block', flex: '6 1 0%', boxSizing: 'border-box'},
      '3840': {display: 'block', flex: '6 1 0%', boxSizing: 'border-box'},
    }

    for (const [width, style] of Object.entries(responsiveStyles)) {
      await page.setViewportSize({width: Number(width), height: 1024})

      const element = await page.$('#responsive-box')

      if (!element) {
        throw new Error('Expected test element to be found')
      }

      const computedStyle = await element.evaluate((uiElement) => ({
        display: getComputedStyle(uiElement).getPropertyValue('display'),
        flex: getComputedStyle(uiElement).getPropertyValue('flex'),
        boxSizing: getComputedStyle(uiElement).getPropertyValue('box-sizing'),
      }))

      expect(computedStyle).toEqual(style)
    }
  })
})
