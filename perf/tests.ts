import path from 'path'
import {config} from './config'

export interface Test {
  name: string
  fn: (page: any) => Promise<void>
}

const firstTest: Test = {
  name: 'first test',
  fn: async (page) => {
    await page.goto(config.baseUrl)
    await page.waitForSelector('[data-test="text"]')
    await page.screenshot({path: path.resolve(__dirname, 'artifacts/example.png')})
  },
}

export const tests = [firstTest]
