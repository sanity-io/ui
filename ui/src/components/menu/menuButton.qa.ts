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

describe('Components/MenuButton', () => {
  it('clicking should open/close menu', async () => {
    const page = await context.newPage()

    await page.goto(
      'http://localhost:9009/iframe.html?id=components-menu--menu-button&viewMode=story',
      {waitUntil: 'domcontentloaded'}
    )

    // click button
    await page.click('#menu-button')
    await page.waitForSelector('#menu-button[aria-expanded="true"]')

    // click outside
    await page.click('#next-button')
    await page.waitForSelector('#menu-button[aria-expanded="false"]')
  })

  it('should use arrow keys to navigate the menu', async () => {
    const page = await context.newPage()

    await page.goto(
      'http://localhost:9009/iframe.html?id=components-menu--menu-button&viewMode=story',
      {waitUntil: 'domcontentloaded'}
    )

    // Open menu by pressed DOWN arrow key
    await page.press('#menu-button', 'ArrowDown')
    expect(await page.$('#menu-item-1:focus')).toBeTruthy()

    // Move through menu with arrow keys
    await page.press('#menu-item-1', 'ArrowDown')
    expect(await page.$('#menu-item-2:focus')).toBeTruthy()
    await page.press('#menu-item-2', 'ArrowDown')
    // Skips #menu-item-3, because it's disabled
    expect(await page.$('#menu-item-4:focus')).toBeTruthy()
    await page.press('#menu-item-4', 'ArrowDown')
    // The first menu item should now be focused
    expect(await page.$('#menu-item-1:focus')).toBeTruthy()
    // Escape to exit the menu
    await page.press('#menu-item-1', 'Escape')
    expect(await page.$('#menu-button:focus')).toBeTruthy()

    // Open menu by pressed UP arrow key
    await page.press('#menu-button', 'ArrowUp')
    expect(await page.$('#menu-item-4:focus')).toBeTruthy()
    // Move through menu with arrow keys
    await page.press('#menu-item-4', 'ArrowUp')
    // Skips #menu-item-3, because it's disabled
    expect(await page.$('#menu-item-2:focus')).toBeTruthy()
    await page.press('#menu-item-2', 'ArrowUp')
    expect(await page.$('#menu-item-1:focus')).toBeTruthy()
    await page.press('#menu-item-1', 'ArrowUp')
    // The last menu item should now be focused
    expect(await page.$('#menu-item-4:focus')).toBeTruthy()
    // Escape to exit the menu
    await page.press('#menu-item-4', 'Escape')
    expect(await page.$('#menu-button:focus')).toBeTruthy()
  })

  it('should close on tab', async () => {
    const page = await context.newPage()

    await page.goto(
      'http://localhost:9009/iframe.html?id=components-menu--menu-button&viewMode=story',
      {waitUntil: 'domcontentloaded'}
    )

    // Open menu by pressed DOWN arrow key
    await page.press('#menu-button', 'ArrowDown')
    await page.waitForSelector('#menu-item-1:focus')

    await page.click('#menu-button')
    expect(await page.$('#menu-item-1:focus')).toBeTruthy()
    await page.press('#menu-item-1', 'Tab')
    expect(await page.$('#menu-button[aria-expanded="true"]')).toBeNull()
    expect(await page.$('#next-button:focus')).toBeTruthy()
  })

  it('should close on shift + tab', async () => {
    const page = await context.newPage()

    await page.goto(
      'http://localhost:9009/iframe.html?id=components-menu--menu-button&viewMode=story',
      {waitUntil: 'domcontentloaded'}
    )

    // Open menu by pressed DOWN arrow key
    await page.press('#menu-button', 'ArrowDown')
    expect(await page.$('#menu-item-1:focus')).toBeTruthy()

    await page.click('#menu-button')
    expect(await page.$('#menu-item-1:focus')).toBeTruthy()
    await page.press('#menu-item-1', 'Shift+Tab')
    expect(await page.$('#menu-button[aria-expanded="true"]')).toBeNull()
    expect(await page.$('#menu-button:focus')).toBeTruthy()
  })

  it('should not close when one of the items receives focus', async () => {
    const page = await context.newPage()

    await page.goto(
      'http://localhost:9009/iframe.html?id=components-menu--menu-button&viewMode=story',
      {waitUntil: 'domcontentloaded'}
    )

    // Open menu by pressed DOWN arrow key
    await page.press('#menu-button', 'ArrowDown')
    expect(await page.$('#menu-item-1:focus')).toBeTruthy()

    await page.click('#menu-button')
    expect(await page.$('#menu-item-1:focus')).toBeTruthy()
    ;(await page.$('#menu-item-2'))?.focus()
    expect(await page.$('#menu-button[aria-expanded="true"]')).toBeTruthy()
  })
})
