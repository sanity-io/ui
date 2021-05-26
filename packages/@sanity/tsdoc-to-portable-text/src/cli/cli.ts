import chalk from 'chalk'
import {etl} from './commands/etl'
import {getCLIContext} from './helpers'
import {CmdFn} from './types'

const commands: {[key: string]: CmdFn | undefined} = {
  etl,
}

async function runCli() {
  const {args, cmd, cwd, flags} = await getCLIContext()

  if (!cmd) throw new Error('missing command')
  if (typeof cmd !== 'string') throw new Error('expected command to be a string')

  const cmdFn = commands[cmd]

  if (cmdFn) return cmdFn({args, cwd, flags})

  throw new Error(`unknown command: ${cmd}`)
}

runCli().catch((err) => {
  console.error(`${chalk.red('error')} ${err.message}`)
  process.exit(1)
})
