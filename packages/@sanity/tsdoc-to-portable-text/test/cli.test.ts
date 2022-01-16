import chalk from 'chalk'
import {run} from '../src/cli/run'
import {spawnProject} from './lib/spawnProject'

const noop = () => undefined

describe('cli', () => {
  let project: {cleanup: () => void; path: string}

  beforeAll(async () => {
    project = await spawnProject('mylib/1.0.0')
  })

  afterAll(async () => {
    project.cleanup()
  })

  test('run `etl` command', async () => {
    // Spy on `console.log`
    const log = jest.spyOn(global.console, 'log').mockImplementation(noop)

    await run({
      args: ['lib/esm/index.d.ts'],
      cwd: project.path,
      cmd: 'etl',
      flags: {
        outDir: 'etc',
        tsconfig: 'tsconfig.lib.json',
      },
    })

    expect(log).toBeCalledWith(`${chalk.green('success')} wrote documents to etc/1.0.0.json`)

    // Reset the spy at the end of the test
    log.mockReset()
  })
})
