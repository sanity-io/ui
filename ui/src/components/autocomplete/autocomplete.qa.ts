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

describe('Components/Autocomplete', () => {
  it('should use key arrows', async () => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const page = await context!.newPage()

    await page.goto(
      'http://localhost:9009/iframe.html?id=components-autocomplete--custom&viewMode=story',
      {waitUntil: 'domcontentloaded'}
    )

    await page.click('#custom')

    // Search for "nor"
    await page.fill('#custom', 'nor')

    // The listbox is expanded
    await page.waitForSelector('#custom[aria-expanded="true"]')
    await page.waitForSelector('#custom-listbox')

    // Arrow down 3 times
    await page.press('#custom-listbox', 'ArrowDown')
    await page.press('#custom-listbox', 'ArrowDown')
    await page.press('#custom-listbox', 'ArrowDown')

    // The 3rd option should be focused
    await page.waitForSelector('[data-qa="option-NO"]:focus')

    // Escape to close listbox and clear input
    await page.press('[data-qa="option-NO"]', 'Escape')
    await page.waitForSelector('#custom[aria-expanded="false"][value=""]')
  })

  it('should press clear button to clear', async () => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const page = await context!.newPage()

    await page.goto(
      'http://localhost:9009/iframe.html?id=components-autocomplete--custom&viewMode=story',
      {waitUntil: 'domcontentloaded'}
    )

    await page.click('#custom')

    // Search for "nor"
    await page.fill('#custom', 'nor')

    // Arrow down 3 times
    await page.press('#custom-listbox', 'ArrowDown')
    await page.press('#custom-listbox', 'ArrowDown')
    await page.press('#custom-listbox', 'ArrowDown')

    // Enter to select
    await page.press('[data-qa="option-NO"]:focus', 'Enter')

    // Tab 1 time
    await page.press('#custom:focus', 'Tab')

    // Enter to clear
    await page.press('[data-qa="clear-button"]:focus', 'Enter')

    // The input should be empty and focused
    await page.waitForSelector('#custom[value=""]:focus')
  })

  it('should collapse when tabbing out', async () => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const page = await context!.newPage()

    await page.goto(
      'http://localhost:9009/iframe.html?id=components-autocomplete--custom&viewMode=story',
      {waitUntil: 'domcontentloaded'}
    )

    // Click to focus
    await page.click('#custom')

    // Search for "nor"
    await page.fill('#custom:focus', 'nor')

    // Tab 1 time
    await page.press('#custom[aria-expanded="true"]:focus', 'Tab')

    // Should be collapsed
    await page.waitForSelector('#custom[aria-expanded="false"]')
  })
})
