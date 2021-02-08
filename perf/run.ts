import chalk from 'chalk'
import puppeteer from 'puppeteer'
import {tests} from './tests'

async function run() {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  for (const test of tests) {
    console.log(`=== ${test.name} ===`)
    console.time('run')

    try {
      await test.fn(page)
      console.timeEnd('run')
      console.log(chalk.green(`success - ${test.name}`))
    } catch (err) {
      console.timeEnd('run')
      console.log(chalk.red(`fail - ${test.name}`))
      throw err
    }
  }

  await browser.close()
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
