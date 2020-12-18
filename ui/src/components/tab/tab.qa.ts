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

describe('Components/Tab', () => {
  it('should use keys to navigate tabs', async () => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const page = await context!.newPage()

    await page.goto('http://localhost:9009/iframe.html?id=components-tab--example&viewMode=story', {
      waitUntil: 'domcontentloaded',
    })

    await page.click('#example-tab-foo')
    await page.press('#example-tab-foo', 'ArrowRight')
    await page.waitForSelector('#example-tab-bar:focus')
    await page.press('#example-tab-bar', 'ArrowRight')
    await page.waitForSelector('#example-tab-baz:focus')
    await page.press('#example-tab-baz', 'ArrowRight')
    await page.waitForSelector('#example-tab-foo:focus')
    await page.press('#example-tab-foo', 'Tab')
    await page.waitForSelector('#example-panel-foo:not([hidden]):focus')
  })
})
