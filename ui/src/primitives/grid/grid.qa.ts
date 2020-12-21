import {Browser, BrowserContext} from 'playwright'
import qawolf from 'qawolf'
import {withElement} from '../../../test/qa/utils'

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

describe('Primitives/Grid', () => {
  it('should have responsive styles', async () => {
    const page = await context.newPage()

    const url = 'http://localhost:9009/iframe.html?id=atoms-grid--responsive&viewMode=story'

    await page.goto(url, {waitUntil: 'domcontentloaded'})

    const getter = (el: SVGElement | HTMLElement) => {
      const computedStyle = getComputedStyle(el)

      return {
        gridGap: computedStyle.getPropertyValue('grid-gap'),
        gridTemplateColumns: computedStyle.getPropertyValue('grid-template-columns'),
        gridTemplateRows: computedStyle.getPropertyValue('grid-template-rows'),
      }
    }

    let styles: Record<string, string>

    // 320
    await page.setViewportSize({width: 320, height: 1024})
    styles = await withElement(page, '#responsive-grid', getter)
    expect(styles).toEqual({
      gridGap: 'normal normal',
      gridTemplateColumns: '280px',
      gridTemplateRows: '11px 11px 11px 11px 11px 11px 11px 11px 11px 11px 11px 11px',
    })

    // 375
    await page.setViewportSize({width: 375, height: 1024})
    styles = await withElement(page, '#responsive-grid', getter)
    expect(styles).toEqual({
      gridGap: '4px 4px',
      gridTemplateColumns: '165.5px 165.5px',
      gridTemplateRows: '11px 11px 11px 11px 11px 11px',
    })

    // 768
    await page.setViewportSize({width: 768, height: 1024})
    styles = await withElement(page, '#responsive-grid', getter)
    expect(styles).toEqual({
      gridGap: '8px 8px',
      gridTemplateColumns: '237.328px 237.328px 237.328px',
      gridTemplateRows: '11px 11px 11px 11px',
    })

    // 1024
    await page.setViewportSize({width: 1024, height: 1024})
    styles = await withElement(page, '#responsive-grid', getter)
    expect(styles).toEqual({
      gridGap: '12px 12px',
      gridTemplateColumns: '237px 237px 237px 237px',
      gridTemplateRows: '11px 11px 11px 11px',
    })

    // 1600
    await page.setViewportSize({width: 1600, height: 1024})
    styles = await withElement(page, '#responsive-grid', getter)
    expect(styles).toEqual({
      gridGap: '20px 20px',
      gridTemplateColumns: '296px 296px 296px 296px 296px',
      gridTemplateRows: '11px 11px 11px 11px 11px',
    })

    // 1920
    await page.setViewportSize({width: 1920, height: 1024})
    styles = await withElement(page, '#responsive-grid', getter)
    expect(styles).toEqual({
      gridGap: '32px 32px',
      gridTemplateColumns: '286.656px 286.656px 286.656px 286.656px 286.656px 286.656px',
      gridTemplateRows: '11px 11px 11px 11px 11px 11px',
    })

    // 3840
    await page.setViewportSize({width: 3840, height: 1024})
    styles = await withElement(page, '#responsive-grid', getter)
    expect(styles).toEqual({
      gridGap: '52px 52px',
      gridTemplateColumns: '498.281px 498.281px 498.281px 498.281px 498.281px 498.281px 498.281px',
      gridTemplateRows: '11px 11px 11px 11px 11px 11px 11px',
    })
  })
})
