import {extract, transform} from '../src'
import {spawnProject} from './lib/spawnProject'

describe('transform', () => {
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

    expect(docs[0]).toEqual({
      _type: 'api.release',
      _id: 'mylib_1-0-0',
      version: '1.0.0',
      members: docs[0].members,
    })
  })
})
