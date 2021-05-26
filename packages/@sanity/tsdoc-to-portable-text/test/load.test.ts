import path from 'path'
import {extract, load, transform} from '../src'
import {spawnProject} from './lib/spawnProject'

describe('load', () => {
  let project: {cleanup: () => void; path: string}

  beforeAll(async () => {
    project = await spawnProject('mylib/1.0.0')
  })

  afterAll(async () => {
    project.cleanup()
  })

  test('should ...', async () => {
    const result = await extract('./lib/esm/index.d.ts', {
      packagePath: project.path,
    })

    const docs = transform(result, {package: {scope: null, name: 'mylib', version: '1.0.0'}})

    await load(docs, {fs: {path: path.resolve(project.path, 'etc/1.0.0.json')}})
  })
})
