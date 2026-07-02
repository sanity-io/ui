import {readdirSync, readFileSync} from 'node:fs'
import path from 'node:path'
import {fileURLToPath} from 'node:url'

import ts from 'typescript'
import {describe, expect, test} from 'vitest'

const SRC_PATH = path.dirname(fileURLToPath(import.meta.url))

// In-memory consumer files probing the two import styles against the source entry points
// (the same modules the published `exports` map points to in development).
const probes: Record<string, string> = {
  [path.join(SRC_PATH, '__probe_barrel__.ts')]: [
    `import {AccessDeniedIcon, Icon, icons, type IconSymbol} from './index'`,
    `console.log(AccessDeniedIcon, Icon, icons, 'rocket' satisfies IconSymbol)`,
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

describe('barrel import deprecation', () => {
  const languageService = createLanguageService()
  const [barrelProbe, subpathProbe] = Object.keys(probes) as [string, string]

  test('importing an icon from the barrel reports a deprecation', () => {
    const deprecations = languageService
      .getSuggestionDiagnostics(barrelProbe)
      .filter((diagnostic) => diagnostic.reportsDeprecated)

    expect(
      deprecations.map((diagnostic) =>
        ts.flattenDiagnosticMessageText(diagnostic.messageText, ' '),
      ),
    ).toContain(`'AccessDeniedIcon' is deprecated.`)

    // `Icon`, `icons` and the types remain non-deprecated barrel exports.
    const deprecatedNames = deprecations.map((diagnostic) =>
      probes[barrelProbe]?.slice(
        diagnostic.start,
        (diagnostic.start ?? 0) + (diagnostic.length ?? 0),
      ),
    )
    expect(deprecatedNames).not.toContain('Icon')
    expect(deprecatedNames).not.toContain('icons')
    expect(deprecatedNames).not.toContain('IconSymbol')
  })

  test('importing an icon from its subpath reports no deprecation', () => {
    const deprecations = languageService
      .getSuggestionDiagnostics(subpathProbe)
      .filter((diagnostic) => diagnostic.reportsDeprecated)

    expect(deprecations).toEqual([])
  })

  test('neither probe has type errors', () => {
    for (const probe of [barrelProbe, subpathProbe]) {
      const errors = languageService
        .getSemanticDiagnostics(probe)
        .filter((diagnostic) => diagnostic.category === ts.DiagnosticCategory.Error)
      expect(errors).toEqual([])
    }
  })

  test('every barrel icon export carries the subpath guidance in its @deprecated tag', () => {
    const barrelSource = readFileSync(path.join(SRC_PATH, 'index.ts'), 'utf8')
    const exportNames = readdirSync(path.join(SRC_PATH, 'exports'))
      .filter((file) => file.endsWith('.tsx'))
      .map((file) => file.slice(0, -'.tsx'.length))

    expect(exportNames.length).toBeGreaterThan(0)

    for (const exportName of exportNames) {
      expect(barrelSource).toContain(
        `@deprecated Use \`import {${exportName}Icon} from '@sanity/icons/${exportName}'\` instead, to avoid barrel file performance issues.`,
      )
      expect(barrelSource).toContain(
        `export const ${exportName}Icon: typeof Original${exportName}Icon`,
      )
    }
  })
})
