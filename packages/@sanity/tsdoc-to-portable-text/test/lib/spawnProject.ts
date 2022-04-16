import {readdir} from 'fs/promises'
import path from 'path'
import {copy} from './copy'
import {delay} from './delay'
import {exec, ExecError} from './exec'
import {createTmpDir} from './tmp'

export async function spawnProject(name: string, options: {tmp?: boolean} = {}) {
  const {tmp = true} = options
  const tmpDir = tmp ? await createTmpDir() : null
  const sourcePath = path.resolve(__dirname, '../__fixtures__', name)
  const projectPath = tmpDir ? tmpDir.path : sourcePath
  const sourcePattern = path.resolve(__dirname, '../__fixtures__', name, '**/*')

  if (tmp) {
    await copy(sourcePattern, projectPath)
  }

  try {
    await exec('yarn install', {cwd: projectPath})
  } catch (err) {
    if (err instanceof ExecError) {
      console.error(err.stdout)
      console.error(err.stderr)

      throw new Error('error during installation')
    }
  }

  try {
    await exec('yarn build', {cwd: projectPath})
  } catch (err) {
    if (err instanceof ExecError) {
      console.error(err.stdout)
      console.error(err.stderr)

      throw new Error('error during build')
    }
  }

  // await exec('yarn build', {cwd: projectPath})
  await delay(0)

  function cleanup() {
    if (tmpDir) tmpDir.cleanup()
  }

  async function dirs(relativePath?: string) {
    const dirPath = path.resolve(projectPath, relativePath || '.')

    const files = await readdir(dirPath, {withFileTypes: true})

    return files.filter((f) => f.isDirectory()).map((f) => f.name)
  }

  return {cleanup, dirs, path: projectPath}
}
