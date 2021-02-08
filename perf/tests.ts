import path from 'path'
import {config} from './config'

export interface Test {
  name: string
  fn: (page: any) => Promise<void>
}

const textInput_typingSpeed: Test = {
  name: 'TextInput: typing speed',
  fn: async (page) => {
    await page.goto(`${config.baseUrl}/text-input`)

    const input = await page.waitForSelector('[data-test="text-input"]')

    // Clear the input value first
    await input.evaluate((el: HTMLInputElement) => {
      el.value = ''
    })

    // Type characters from a-z
    console.time('duration')
    await input.type('abcdefghijklmnopqrstuvwxyz')
    console.timeEnd('duration')

    await page.screenshot({path: path.resolve(__dirname, 'artifacts/textInput_typingSpeed.png')})
  },
}

export const tests = [textInput_typingSpeed]
