#!/usr/bin/env node

import chalk from 'chalk'
import {getCLIContext} from './cli/helpers'
import {run} from './cli/run'

async function cli() {
  await run(await getCLIContext())
}

cli().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(`${chalk.red('error')} ${err.message}`)
  process.exit(1)
})
