import cac from 'cac'

import {version} from '../../package.json'

const cli = cac('ui')

// cli
//   .command('dev')
//   .option('--cwd [cwd]', 'Output directory')
//   .action(async (options) => {
//     const {devCommand} = await import('./devCommand')

//     await devCommand({
//       ...options,
//       cwd: options.cwd || process.cwd(),
//     })
//   })

cli
  .command('build')
  .option('--cwd [cwd]', 'Working directory')
  .option('--outDir [outDir]', 'Output directory')
  .action(async (options) => {
    const {buildCommand} = await import('./buildCommand')

    await buildCommand({
      ...options,
      cwd: options.cwd || process.cwd(),
    })
  })

cli.command('').action(() => {
  cli.outputHelp()
})

cli.help()
cli.version(version)
cli.parse()
