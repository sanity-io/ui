import path from 'path'
import {extract} from '../src'
import {spawnProject} from './lib/spawnProject'

describe('extract', () => {
  test('should succeed', async () => {
    const project = await spawnProject('mylib/1.0.0')

    const result = await extract('lib/esm/index.d.ts', {
      customTags: [{name: 'sampleCustomBlockTag', syntaxKind: 'block', allowMultiple: true}],
      packagePath: project.path,
      tsconfigPath: 'tsconfig.json',
    })

    project.cleanup()

    expect(result.messages[result.messages.length - 1].text).toEqual(
      `Writing: ${path.resolve(result.tmpDirPath, 'api.json')}`
    )
  })

  // test('should break', async () => {
  //   const project = await spawnProject('mylib/1.0.1-broken')

  //   let error: Error | null = null

  //   try {
  //     await extract('lib/esm/index.d.ts', {
  //       customTags: [{name: 'sampleCustomBlockTag', syntaxKind: 'block', allowMultiple: true}],
  //       packagePath: project.path,
  //       tsconfigPath: 'tsconfig.json',
  //     })
  //   } catch (e: any) {
  //     error = e
  //   }

  //   expect(error?.message).toContain(
  //     'The expression contains an import() type, which is not yet supported by API Extractor:'
  //   )

  //   project.cleanup()
  // })
})
