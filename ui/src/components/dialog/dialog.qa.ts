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

describe('Components/Dialog', () => {
  it('should open dialog', async () => {
    const page = await context.newPage()

    await page.goto(
      'http://localhost:9009/iframe.html?id=components-dialog--props&viewMode=story',
      {waitUntil: 'domcontentloaded'}
    )

    await page.click('#open-dialog-button')
    await page.waitForSelector('#dialog')
  })

  it('should trap focus', async () => {
    const page = await context.newPage()

    await page.goto(
      'http://localhost:9009/iframe.html?id=components-dialog--props&viewMode=story',
      {waitUntil: 'domcontentloaded'}
    )

    // Press enter to open the dialog
    await page.press('#open-dialog-button', 'Enter')
    await page.waitForSelector('#dialog')

    // The first button should be focused
    await page.waitForSelector('#button-1:focus')

    // Tab to next until the focus is back at the top
    await page.press('#button-1', 'Tab')
    await page.waitForSelector('#button-2:focus')
    await page.press('#button-2', 'Tab')
    await page.waitForSelector('#button-3:focus')
    await page.press('#button-3', 'Tab')
    await page.waitForSelector('#button-4:focus')
    await page.press('#button-4', 'Tab')
    await page.waitForSelector('#button-5:focus')
    await page.press('#button-5', 'Tab')
    await page.waitForSelector('button[aria-label="Close dialog"]:focus')
    await page.press('button[aria-label="Close dialog"]', 'Tab')

    // The first button should again be focused
    await page.waitForSelector('#button-1:focus')
  })
})
