import chalk from 'chalk'
import {run} from '../src/cli/run'
import {spawnProject} from './lib/spawnProject'

const noop = () => undefined

describe('cli', () => {
  test('run `etl` command', async () => {
    // Spy on `console.log`
    const log = jest.spyOn(global.console, 'log').mockImplementation(noop)

    const project = await spawnProject('mylib/1.0.0')

    await run({
      args: ['lib/esm/index.d.ts'],
      cwd: project.path,
      cmd: 'etl',
      flags: {
        outDir: 'etc',
        tsconfig: 'tsconfig.lib.json',
      },
    })

    project.cleanup()

    expect(log).toBeCalledWith(`${chalk.green('success')} wrote documents to etc/1.0.0.json`)

    // Reset the spy at the end of the test
    log.mockReset()
  })
})
