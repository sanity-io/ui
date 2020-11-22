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

describe('Components/Autocomplete', () => {
  it('should use key arrows', async () => {
    const page = await context.newPage()

    await page.goto(
      'http://localhost:9009/iframe.html?id=components-autocomplete--plain&viewMode=story',
      {waitUntil: 'domcontentloaded'}
    )

    await page.click('#plain-input')

    // Search for "nor"
    await page.fill('#plain-input', 'nor')

    // The listbox is expanded
    await page.waitForSelector('#plain-input[aria-expanded="true"]')
    await page.waitForSelector('#plain-listbox')

    // Arrow down 3 times
    await page.press('#plain-listbox', 'ArrowDown')
    await page.press('#plain-listbox', 'ArrowDown')
    await page.press('#plain-listbox', 'ArrowDown')

    // The 3rd option should be focused
    await page.waitForSelector('[data-qa="option-NO"]:focus')

    // Escape to close listbox and clear input
    await page.press('[data-qa="option-NO"]', 'Escape')
    await page.waitForSelector('#plain-input[aria-expanded="false"]')
  })

  it('should press clear button to clear', async () => {
    const page = await context.newPage()

    await page.goto(
      'http://localhost:9009/iframe.html?id=components-autocomplete--plain&viewMode=story',
      {waitUntil: 'domcontentloaded'}
    )

    await page.click('#plain-input')

    // Search for "nor"
    await page.fill('#plain-input', 'nor')

    // Tab 1 time
    await page.press('#plain-input', 'Tab')
    await page.waitForSelector('[data-qa="clear-button"]:focus')

    // Enter
    await page.press('[data-qa="clear-button"]', 'Enter')

    // The input should be empty and focused
    await page.waitForSelector('#plain-input[value=""]:focus')
  })

  it('should collapse when tabbing out', async () => {
    const page = await context.newPage()

    await page.goto(
      'http://localhost:9009/iframe.html?id=components-autocomplete--plain&viewMode=story',
      {waitUntil: 'domcontentloaded'}
    )

    await page.click('#plain-input')

    // Search for "nor"
    await page.fill('#plain-input', 'nor')
    await page.waitForSelector('#plain-input[aria-expanded="true"]')

    // Tab 1 time
    await page.press('#plain-input', 'Tab')
    await page.waitForSelector('[data-qa="clear-button"]:focus')

    // Enter
    await page.press('[data-qa="clear-button"]', 'Tab')

    // Should be collapsed
    await page.waitForSelector('#plain-input[aria-expanded="false"]')
  })
})
