import {build, dev, preview} from '@sanity/ui-workshop/runtime'
import {cac} from 'cac'

import {version} from '../package.json'

const cli = cac()

cli.command('dev').option('--cwd [cwd]', 'Current working directory').action(dev)

cli
  .command('build')
  .option('--cwd [cwd]', 'Current working directory')
  .option('--outDir [outDir]', 'Output directory')
  .option('--tsconfig [tsconfig]', 'Path to tsconfig.json')
  .action(build)

cli.command('preview').option('--cwd [cwd]', 'Current working directory').action(preview)

cli.command('').action(() => {
  cli.outputHelp()
})

cli.help()
cli.version(version)
cli.parse()
