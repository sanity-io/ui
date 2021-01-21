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

describe('Primitives/TextInput', () => {
  it('readonly input should not have focus styling', async () => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const page = await context!.newPage()

    await page.goto(
      'http://localhost:9009/iframe.html?id=atoms-textinput--read-only&viewMode=story',
      {waitUntil: 'domcontentloaded'}
    )

    await page.click('#text-input-example')

    const element = await page.$('#text-input-example + span')

    if (!element) {
      throw new Error('Expected test element to be found')
    }

    const computedStyle = await element.evaluate((uiElement) => ({
      boxShadow: getComputedStyle(uiElement).getPropertyValue('box-shadow'),
    }))

    expect(computedStyle).toEqual({boxShadow: 'rgb(182, 188, 198) 0px 0px 0px 1px inset'})
  })
})
