#!/usr/bin/env node

import process from 'node:process'

import {main} from '../dist/cli/index.js'
import {errorLine} from '../dist/cli/log.js'

try {
  const code = await main(process.argv.slice(2))
  process.exitCode = code ?? 0
} catch (error) {
  errorLine(error instanceof Error ? error.message : String(error))
  process.exitCode = 1
}
