import {resolve} from 'node:path'
import process from 'node:process'
import {parseArgs} from 'node:util'

import {runDoctor} from './doctor.js'
import {runInit} from './init.js'
import {color, fail, info} from './log.js'
import {readSelfPackage} from './selfPackage.js'

const HELP = `${color.bold('@sanity-labs/ui-poc')} setup CLI

${color.bold('Usage')}
  npx @sanity-labs/ui-poc <command> [options]

${color.bold('Commands')}
  init      Scaffold a correct Sanity UI install (deps, stylesheet, tsconfig)
  doctor    Check an existing setup and report fixes

${color.bold('Options')}
  --dry        Print the plan and exit without changing anything (init)
  --yes, -y    Accept every prompt with its default (non-interactive)
  --cwd <dir>  Run against another directory (default: current directory)
  --version    Print the CLI version
  --help, -h   Show this help
`

/**
 * Parses arguments and dispatches to a command. `parseArgs` runs in strict mode,
 * so an unknown flag throws from here and is caught by the bin wrapper. Exit
 * codes: 0 on success or an explicit `--help`, 1 on misuse (no or unknown command).
 */
export async function main(argv: string[]): Promise<number> {
  const {values, positionals} = parseArgs({
    args: argv,
    allowPositionals: true,
    options: {
      dry: {type: 'boolean', default: false},
      yes: {type: 'boolean', short: 'y', default: false},
      cwd: {type: 'string'},
      version: {type: 'boolean', default: false},
      help: {type: 'boolean', short: 'h', default: false},
    },
  })

  if (values.version) {
    info(readSelfPackage().version ?? 'unknown')
    return 0
  }

  const command = positionals[0]

  if (values.help) {
    info(HELP)
    return 0
  }
  if (!command) {
    info(HELP)
    return 1
  }

  const options = {
    dry: values.dry ?? false,
    yes: values.yes ?? false,
    cwd: values.cwd ? resolve(process.cwd(), values.cwd) : process.cwd(),
  }

  switch (command) {
    case 'init':
      return runInit(options)
    case 'doctor':
      return runDoctor(options)
    default:
      fail(`Unknown command: ${command}`)
      info(HELP)
      return 1
  }
}
