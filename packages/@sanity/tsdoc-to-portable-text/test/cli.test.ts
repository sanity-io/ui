import path from 'path'
import {exec} from './lib/exec'
import {spawnProject} from './lib/spawnProject'

function runCli(cmd: string, opts: {cwd: string}) {
  return exec(`${path.resolve(__dirname, '../bin/tsdoc-to-portable-text')} ${cmd}`, {cwd: opts.cwd})
}

describe('cli', () => {
  let project: {cleanup: () => void; path: string}

  beforeAll(async () => {
    project = await spawnProject('mylib/1.0.0')
  })

  afterAll(async () => {
    project.cleanup()
  })

  test('run `etl` command', async () => {
    const result = await runCli(
      'etl lib/esm/index.d.ts --outDir etc --tsconfig tsconfig.lib.json',
      {cwd: project.path}
    )

    expect(result.stdout).toContain('wrote documents to etc/1.0.0.json\n')
  })
})
