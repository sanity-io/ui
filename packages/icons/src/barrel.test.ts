import {readdirSync} from 'node:fs'
import path from 'node:path'
import {fileURLToPath} from 'node:url'

import ts from 'typescript'
import {describe, expect, test} from 'vitest'

const SRC_PATH = path.dirname(fileURLToPath(import.meta.url))

const iconExportNames = readdirSync(path.join(SRC_PATH, 'exports'))
  .filter((file) => file.endsWith('.tsx'))
  .map((file) => file.slice(0, -'.tsx'.length))
  .toSorted()

// The root entry's real (runtime-backed) exports. Everything else on the barrel must be a
// generated `@deprecated` tombstone for a per-icon barrel export that was removed in v5.
const dynamicExportNames = ['Icon', 'IconComponent', 'IconMap', 'IconProps', 'IconSymbol', 'icons']

// In-memory consumer files probing the import styles against the source entry points
// (the same modules the published `exports` map points to in development).
const probes: Record<string, string> = {
  [path.join(SRC_PATH, '__probe_barrel__.ts')]: [
    `import {Icon, icons, type IconComponent, type IconMap, type IconSymbol} from './index'`,
    `const rocket: IconComponent = icons['rocket' satisfies IconSymbol]`,
    `const map: IconMap = icons`,
    `console.log(Icon, rocket, map)`,
    ``,
  ].join('\n'),
  [path.join(SRC_PATH, '__probe_moved_barrel_icon__.ts')]: [
    `import {AccessDeniedIcon} from './index'`,
    // Only a `never`-typed value is assignable to `never`, so this line proves the tombstone
    // has exactly the declared type.
    `const tombstone: never = AccessDeniedIcon`,
    `console.log(tombstone)`,
    ``,
  ].join('\n'),
  [path.join(SRC_PATH, '__probe_deleted_barrel_icon__.ts')]: [
    `import {ThisIconNeverExistedIcon} from './index'`,
    `console.log(ThisIconNeverExistedIcon)`,
    ``,
  ].join('\n'),
  [path.join(SRC_PATH, '__probe_subpath__.ts')]: [
    `import {AccessDeniedIcon} from './exports/AccessDenied'`,
    `import LazyDefault from './exports/AccessDenied'`,
    `console.log(AccessDeniedIcon, LazyDefault)`,
    ``,
  ].join('\n'),
}

function createLanguageService() {
  const fileNames = Object.keys(probes)
  const options: ts.CompilerOptions = {
    strict: true,
    noEmit: true,
    target: ts.ScriptTarget.ESNext,
    module: ts.ModuleKind.ESNext,
    moduleResolution: ts.ModuleResolutionKind.Bundler,
    jsx: ts.JsxEmit.ReactJSX,
    skipLibCheck: true,
  }

  const host: ts.LanguageServiceHost = {
    getScriptFileNames: () => fileNames,
    getScriptVersion: () => '1',
    getScriptSnapshot: (fileName) => {
      const contents = probes[fileName] ?? ts.sys.readFile(fileName)
      return contents === undefined ? undefined : ts.ScriptSnapshot.fromString(contents)
    },
    getCurrentDirectory: () => SRC_PATH,
    getCompilationSettings: () => options,
    getDefaultLibFileName: (opts) => ts.getDefaultLibFilePath(opts),
    fileExists: (fileName) => fileName in probes || ts.sys.fileExists(fileName),
    readFile: (fileName) => probes[fileName] ?? ts.sys.readFile(fileName),
    directoryExists: (directoryName) => ts.sys.directoryExists(directoryName),
    getDirectories: (directoryName) => ts.sys.getDirectories(directoryName),
    realpath: (filePath) => (ts.sys.realpath ? ts.sys.realpath(filePath) : filePath),
  }

  return ts.createLanguageService(host, ts.createDocumentRegistry())
}

describe('root entry surface', () => {
  const languageService = createLanguageService()
  const [barrelProbe, movedIconProbe, deletedIconProbe, subpathProbe] = Object.keys(probes) as [
    string,
    string,
    string,
    string,
  ]

  function getSemanticErrors(probe: string) {
    return languageService
      .getSemanticDiagnostics(probe)
      .filter((diagnostic) => diagnostic.category === ts.DiagnosticCategory.Error)
  }

  function getDeprecations(probe: string) {
    return languageService
      .getSuggestionDiagnostics(probe)
      .filter((diagnostic) => diagnostic.reportsDeprecated)
  }

  test('the dynamic barrel exports type-check without deprecations', () => {
    expect(getSemanticErrors(barrelProbe)).toEqual([])
    expect(getDeprecations(barrelProbe)).toEqual([])
  })

  test('importing a moved icon from the barrel resolves to a deprecated `never` tombstone', () => {
    // The import is not a hard type error – the `const tombstone: never = …` line in the probe
    // only type-checks because the export exists and is typed `never`.
    expect(getSemanticErrors(movedIconProbe)).toEqual([])

    // …but every use of it is flagged as deprecated, which is what strikes the import through
    // in editors and surfaces the "import it from its subpath" guidance.
    const deprecations = getDeprecations(movedIconProbe)
    expect(deprecations.length).toBeGreaterThan(0)
    expect(
      deprecations.map((diagnostic) =>
        ts.flattenDiagnosticMessageText(diagnostic.messageText, ' '),
      ),
    ).toContain(`'AccessDeniedIcon' is deprecated.`)
  })

  test('importing an icon that never existed from the barrel is still a hard type error', () => {
    const errors = getSemanticErrors(deletedIconProbe)

    expect(errors.map((diagnostic) => diagnostic.code)).toContain(2305)
    expect(
      errors.map((diagnostic) => ts.flattenDiagnosticMessageText(diagnostic.messageText, ' ')),
    ).toContain(`Module '"./index"' has no exported member 'ThisIconNeverExistedIcon'.`)
  })

  test('importing an icon from its subpath type-checks without deprecations', () => {
    expect(getSemanticErrors(subpathProbe)).toEqual([])
    expect(getDeprecations(subpathProbe)).toEqual([])
  })

  test('every icon has a `@deprecated` `never` tombstone pointing at its subpath, and nothing more', () => {
    const program = languageService.getProgram()
    if (!program) throw new Error('no program')

    const checker = program.getTypeChecker()
    const barrelSourceFile = program.getSourceFile(path.join(SRC_PATH, 'index.ts'))
    if (!barrelSourceFile) throw new Error('no source file for the root entry')

    const moduleSymbol = checker.getSymbolAtLocation(barrelSourceFile)
    if (!moduleSymbol) throw new Error('no module symbol for the root entry')

    const exports = new Map(
      checker.getExportsOfModule(moduleSymbol).map((symbol) => [symbol.getName(), symbol]),
    )

    // The barrel exposes exactly the dynamic exports plus one tombstone per icon – no
    // tombstones for icons that no longer exist (those must stay hard errors), none missing.
    expect([...exports.keys()].toSorted()).toEqual(
      [...dynamicExportNames, ...iconExportNames.map((name) => `${name}Icon`)].toSorted(),
    )

    for (const exportName of iconExportNames) {
      const symbol = exports.get(`${exportName}Icon`)
      if (!symbol) throw new Error(`no tombstone for ${exportName}Icon`)

      const declaration = symbol.valueDeclaration
      if (!declaration) throw new Error(`no value declaration for ${exportName}Icon`)

      const type = checker.getTypeOfSymbolAtLocation(symbol, declaration)
      expect(type.flags & ts.TypeFlags.Never, `${exportName}Icon is typed \`never\``).toBeTruthy()

      const deprecated = symbol
        .getJsDocTags(checker)
        .find((jsDocTag) => jsDocTag.name === 'deprecated')
      const tagText = (deprecated?.text ?? []).map((part) => part.text).join('')
      expect(tagText).toContain(`import {${exportName}Icon} from '@sanity/icons/${exportName}'`)
    }
  })
})
