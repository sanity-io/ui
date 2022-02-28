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

  test('should result in a "api.release" document', async () => {
    const result = await extract('./lib/esm/index.d.ts', {
      customTags: [{name: 'sampleCustomBlockTag', syntaxKind: 'block', allowMultiple: true}],
      packagePath: project.path,
    })

    const docs = transform(result, {package: {version: '1.0.0'}})

    expect(docs[0]).toEqual({
      _type: 'api.release',
      _id: 'mylib_1-0-0',
      version: '1.0.0',
      identifiers: [
        'Button',
        'ButtonProps',
        'ButtonTone',
        'ButtonType',
        'Class',
        'Resolver',
        'ResponsiveMarginProps',
      ],
      members: docs[0].members,
      package: {
        _ref: 'mylib',
        _type: 'reference',
        _weak: true,
      },
    })
  })

  test('should result in "api.identifier" documents', async () => {
    const result = await extract('./lib/esm/index.d.ts', {
      customTags: [{name: 'sampleCustomBlockTag', syntaxKind: 'block', allowMultiple: true}],
      packagePath: project.path,
    })

    const docs = transform(result, {package: {version: '1.0.0'}})
    const identifierDocs = docs.filter((d) => d._type === 'api.identifier')

    expect(identifierDocs.length).toBe(7)
  })

  test('should transform class', async () => {
    const result = await extract('./lib/esm/index.d.ts', {
      customTags: [{name: 'sampleCustomBlockTag', syntaxKind: 'block', allowMultiple: true}],
      packagePath: project.path,
    })

    const docs = transform(result, {package: {version: '1.0.0'}})
    const classDoc = docs.find((d) => d._type === 'api.class')

    // console.log('api.class', JSON.stringify(classDoc, null, 2))
    expect(classDoc).toMatchSnapshot()
  })

  test('should transform interface with call signature', async () => {
    const result = await extract('./lib/esm/index.d.ts', {
      customTags: [{name: 'sampleCustomBlockTag', syntaxKind: 'block', allowMultiple: true}],
      packagePath: project.path,
    })

    const docs = transform(result, {package: {version: '1.0.0'}})
    const interfaceDoc = docs.find((d) => d._type === 'api.interface' && d.name === 'Resolver')

    // console.log('api.interface', JSON.stringify(interfaceDoc, null, 2))
    expect(interfaceDoc).toMatchSnapshot()
  })
})
