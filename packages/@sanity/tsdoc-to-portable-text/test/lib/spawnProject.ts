import path from 'path'
import {copy} from './copy'
import {delay} from './delay'
import {exec} from './exec'
import {createTmpDir} from './tmp'

export async function spawnProject(name: string) {
  const tmpDir = await createTmpDir()
  const projectPath = tmpDir.path
  const source = path.resolve(__dirname, '../__fixtures__', name, '**/*')

  await copy(source, projectPath)
  await exec('yarn install', {cwd: projectPath})
  await exec('yarn build', {cwd: projectPath})
  await delay(0)

  return {cleanup: tmpDir.cleanup, path: projectPath}
}
