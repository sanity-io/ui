import path from 'path'
import {config} from '../config'
import {runtime, sleep, test} from '../lib'

test('Button: render variations', async (page, measure) => {
  await page.goto(`${config.baseUrl}/button-variations`)

  const button = await page.waitForSelector('[data-test="render-button"]')

  if (!button) {
    throw new Error('Could not find button')
  }

  await sleep(50)

  await measure('Render variations', () => {
    return new Promise((resolve, reject) => {
      // This function is exposed on `window.onRenderDone`
      runtime.onRenderDone = resolve

      // Click the render button
      button.click().then(resolve).catch(reject)
    })
  })

  await page.screenshot({
    path: path.resolve(config.artifacts.path, 'button_renderVariations.png'),
  })
})
