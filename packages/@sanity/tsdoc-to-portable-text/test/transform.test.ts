import {extract, transform} from '../src'
import {spawnProject} from './lib/spawnProject'

describe('transform', () => {
  test('should result in a "api.release" document', async () => {
    const project = await spawnProject('mylib/1.0.0')

    const result = await extract(project.path, {
      customTags: [{name: 'sampleCustomBlockTag', syntaxKind: 'block', allowMultiple: true}],
    })

    project.cleanup()

    const docs = transform(result, {package: {version: '1.0.0'}})

    expect(docs).toMatchSnapshot()
  })

  test('should result in "api.identifier" documents', async () => {
    const project = await spawnProject('mylib/1.0.0')

    const result = await extract(project.path, {
      customTags: [{name: 'sampleCustomBlockTag', syntaxKind: 'block', allowMultiple: true}],
    })

    project.cleanup()

    const docs = transform(result, {package: {version: '1.0.0'}})
    const identifierDocs = docs.filter((d) => d._type === 'api.identifier')

    expect(identifierDocs.length).toBe(7)
  })

  test('should transform class', async () => {
    const project = await spawnProject('mylib/1.0.0')

    const result = await extract(project.path, {
      customTags: [{name: 'sampleCustomBlockTag', syntaxKind: 'block', allowMultiple: true}],
    })

    project.cleanup()

    const docs = transform(result, {package: {version: '1.0.0'}})
    const classDoc = docs.find((d) => d._type === 'api.class')

    expect(classDoc).toMatchSnapshot()
  })

  test('should transform interface with call signature', async () => {
    const project = await spawnProject('mylib/1.0.0')

    const result = await extract(project.path, {
      customTags: [{name: 'sampleCustomBlockTag', syntaxKind: 'block', allowMultiple: true}],
    })

    project.cleanup()

    const docs = transform(result, {package: {version: '1.0.0'}})
    const interfaceDoc = docs.find((d) => d._type === 'api.interface' && d.name === 'Resolver')

    expect(interfaceDoc).toMatchSnapshot()
  })

  test('should transform multiple exports', async () => {
    const project = await spawnProject('multi-export/1.0.0')

    const result = await extract(project.path, {
      customTags: [{name: 'sampleCustomBlockTag', syntaxKind: 'block', allowMultiple: true}],
    })

    project.cleanup()

    const docs = transform(result, {package: {version: '1.0.0'}})

    const pkg = docs.find((d) => d._type === 'api.package')!

    expect(pkg.identifiers).toEqual(['extra', 'version'])

    const release = docs.find((d) => d._type === 'api.release')!

    expect(release.exports).toHaveLength(2)

    const names = (release.exports as any[])
      .reduce<any[]>((acc, x) => acc.concat(x.members), [])
      .map((x) => docs.find((d) => d._id === x._ref)!.name)

    expect(names).toEqual(['version', 'extra'])
  })
})
