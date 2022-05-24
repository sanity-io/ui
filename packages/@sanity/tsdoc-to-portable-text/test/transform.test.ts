import {APIExportDocument, APIMemberDocument, APIPackageDocument, extract, transform} from '../src'
import {spawnProject} from './lib/spawnProject'

describe('transform', () => {
  jest.setTimeout(10000)

  test('should result in a "api.release" document', async () => {
    const project = await spawnProject('mylib/1.0.0')

    const result = await extract(project.path, {
      customTags: [{name: 'sampleCustomBlockTag', syntaxKind: 'block', allowMultiple: true}],
    })

    project.cleanup()

    const docs = transform(result, {package: {version: '1.0.0'}})

    expect(docs).toMatchSnapshot()
  })

  test('should result in "api.symbol" documents', async () => {
    const project = await spawnProject('mylib/1.0.0')

    const result = await extract(project.path, {
      customTags: [{name: 'sampleCustomBlockTag', syntaxKind: 'block', allowMultiple: true}],
    })

    project.cleanup()

    const docs = transform(result, {package: {version: '1.0.0'}})
    const symbolDocs = docs.filter((d) => d._type === 'api.symbol')

    expect(symbolDocs.length).toBe(7)
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

    // Assert package document
    const pkg = docs.find((d) => d._type === 'api.package') as unknown as APIPackageDocument

    expect(pkg.name).toBe('multi-export')

    // Assert export documents
    const exports = docs.filter((d) => d._type === 'api.export') as unknown as APIExportDocument[]
    const exportPaths = exports.map((exp) => exp.path)

    expect(exportPaths).toEqual(['.', 'extra'])

    // Assert member documents
    const members = docs.filter((d) =>
      ['api.variable'].includes(d._type)
    ) as unknown as APIMemberDocument[]
    const memberExports = members.map((sym) => sym.export)

    expect(memberExports).toEqual([
      {_type: 'reference', _ref: 'multi-export_1-0-0__main'},
      {_type: 'reference', _ref: 'multi-export_1-0-0_extra'},
    ])
  })
})
