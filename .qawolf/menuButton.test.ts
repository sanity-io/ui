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

test('components/MenuButton', async () => {
  const page = await context.newPage()

  await page.goto(
    'http://localhost:9009/iframe.html?id=components-menu--menu-button&viewMode=story',
    {waitUntil: 'domcontentloaded'}
  )

  await page.click('button[data-ui="Avatar"]')
  await page.waitForSelector('[data-ui="MenuItem"]')
})
