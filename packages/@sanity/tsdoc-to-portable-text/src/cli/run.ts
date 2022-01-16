import {etl} from './commands/etl'
import {CLIContext} from './helpers'
import {CmdFn} from './types'

const commands: {[key: string]: CmdFn | undefined} = {
  etl,
}

export async function run(ctx: CLIContext): Promise<void> {
  const {args, cmd, cwd, flags} = ctx

  if (!cmd) throw new Error('missing command')
  if (typeof cmd !== 'string') throw new Error('expected command to be a string')

  const cmdFn = commands[cmd]

  if (cmdFn) return cmdFn({args, cwd, flags})

  throw new Error(`unknown command: ${cmd}`)
}
