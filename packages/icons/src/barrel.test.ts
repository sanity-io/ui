import path from 'node:path'
import {fileURLToPath} from 'node:url'

import ts from 'typescript'
import {describe, expect, test} from 'vitest'

const SRC_PATH = path.dirname(fileURLToPath(import.meta.url))

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
  [path.join(SRC_PATH, '__probe_removed_barrel_icon__.ts')]: [
    `import {AccessDeniedIcon} from './index'`,
    `console.log(AccessDeniedIcon)`,
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
  const [barrelProbe, removedIconProbe, subpathProbe] = Object.keys(probes) as [
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

  test('importing an icon from the barrel is a type error, the export is removed', () => {
    const errors = getSemanticErrors(removedIconProbe)

    expect(errors.map((diagnostic) => diagnostic.code)).toContain(2305)
    expect(
      errors.map((diagnostic) => ts.flattenDiagnosticMessageText(diagnostic.messageText, ' ')),
    ).toContain(`Module '"./index"' has no exported member 'AccessDeniedIcon'.`)
  })

  test('importing an icon from its subpath type-checks without deprecations', () => {
    expect(getSemanticErrors(subpathProbe)).toEqual([])
    expect(getDeprecations(subpathProbe)).toEqual([])
  })
})
