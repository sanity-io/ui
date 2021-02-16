import path from 'path'
import sanityClient from '@sanity/client'
import chalk from 'chalk'
import globby from 'globby'
import puppeteer from 'puppeteer'
import {v4 as createId} from 'uuid'
import yargs from 'yargs'
import {config} from '../config'
import {createMeasurer, Measurements, tests} from './api'
import {getLatestCommitSha} from './git'
import {getMachineInfo} from './machine'
import {runtime} from './runtime'

const argv = yargs(process.argv).argv

async function run() {
  const args = argv._.slice(2)
  const pattern = args[0]
  const results: {name: string; measurements: Measurements}[] = []
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  const files = await globby(config.files)

  for (const file of files) {
    if (!pattern || (typeof pattern === 'string' && file.includes(pattern))) {
      console.log('running', file)
      require(path.resolve(config.context, file))
    }
  }

  // Define a window.onCustomEvent function on the page.
  page.exposeFunction('onRenderDone', () => {
    runtime.onRenderDone()
  })

  for (const test of tests) {
    const measurer = createMeasurer()

    let i = 0

    while (i < config.numRuns) {
      i += 1

      await measurer.measure('@testRun', async () => {
        await test.fn(page, measurer.measure)
      })
    }

    const measurements = measurer.getMeasurements()

    console.log(chalk.bold.cyan(`• ${test.name}`))

    for (const [name, times] of Object.entries(measurements)) {
      if (name === '@testRun') {
        // Do not render stats for the test run itself
        continue
      }

      const total = times.reduce((acc, x) => acc + x)
      const totalExceptFirst = times.slice(1).reduce((acc, x) => acc + x)
      const avg = total / config.numRuns
      const avgExceptFirst = totalExceptFirst / config.numRuns

      console.log(chalk.yellow(`  • ${name}`))
      console.log(`    First run:          ${times[0].toFixed(3)}`)
      console.log(`    Avg.:               ${avg.toFixed(3)}`)
      console.log(`    Avg. except first:  ${avgExceptFirst.toFixed(3)}`)
    }

    console.log('')

    results.push({name: test.name, measurements})
  }

  await browser.close()

  const client = sanityClient({
    ...config.sanity,
    useCdn: false,
  })

  const machine = getMachineInfo()

  const latestSha = await getLatestCommitSha()

  const doc = {
    _type: 'perf.testRun',
    sha: latestSha,
    uuid: createId(),
    results: results.map((result, resultIndex) => {
      return {
        _type: 'perf.result',
        _key: `result${resultIndex}`,
        name: result.name,
        measurements: Object.entries(result.measurements).map(([name, times], measurementIndex) => {
          return {
            _type: 'perf.measurement',
            _key: `measurement${measurementIndex}`,
            name,
            times,
          }
        }),
      }
    }),
    machine: {
      _type: 'reference',
      _ref: machine.key,
    },
  }

  await client.createOrReplace({_type: 'machine', _id: machine.key, ...machine})

  await client.create(doc)
}

run().catch((err) => {
  console.error(chalk.red(err))
  process.exit(1)
})
