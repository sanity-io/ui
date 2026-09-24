import {existsSync, readFileSync, writeFileSync} from 'node:fs'
import {dirname, isAbsolute, join, resolve} from 'node:path'

import {parse, stringify} from 'comment-json'

import type {TsconfigChange} from './types.js'

interface TsconfigDoc {
  extends?: string | string[]
  compilerOptions?: Record<string, unknown>
  references?: Array<{path?: string}>
}

/** moduleResolution values that read a package `exports` map and its types. */
const MODERN_RESOLUTIONS = new Set(['bundler', 'node16', 'nodenext'])
/** module values compatible with moduleResolution: bundler. */
const BUNDLER_MODULES = new Set(['esnext', 'preserve', 'es2015', 'es2020', 'es2022'])
const VALID_JSX = new Set(['react-jsx', 'react-jsxdev', 'preserve', 'react', 'react-native'])

/** DOM globals the component types reference, plus a modern JS baseline. */
const DOM_LIBS = ['DOM', 'DOM.Iterable']
const ES_BASELINE = 'ES2022'

/**
 * The full known-good config written when no tsconfig.json exists. Mirrors the
 * repo's own framework apps so a fresh project type-checks predictably.
 */
const DEFAULT_TSCONFIG = {
  compilerOptions: {
    target: ES_BASELINE,
    lib: [...DOM_LIBS, ES_BASELINE],
    module: 'esnext',
    moduleResolution: 'bundler',
    jsx: 'react-jsx',
    strict: true,
    esModuleInterop: true,
    skipLibCheck: true,
    resolveJsonModule: true,
    isolatedModules: true,
    moduleDetection: 'force',
  },
  include: ['src', 'app'],
}

export interface TsconfigInspection {
  file: string
  exists: boolean
  unreadable?: boolean
  effective?: Record<string, unknown>
  changes: TsconfigChange[]
}

export interface TsconfigResult {
  file: string
  created: boolean
  changes: TsconfigChange[]
  wrote: boolean
  unreadable?: boolean
}

function readJsonc(file: string): TsconfigDoc {
  const data = parse(readFileSync(file, 'utf8'))
  // comment-json happily parses valid-but-non-object JSON (null, true, []). Treat
  // those as unreadable so callers don't crash on later property reads.
  if (typeof data !== 'object' || data === null || Array.isArray(data)) {
    throw new Error('tsconfig.json is not an object')
  }
  return data as unknown as TsconfigDoc
}

/**
 * Picks the tsconfig file to edit. Solution-style configs (Vite) keep their
 * real options in a referenced file, so we follow the first reference that
 * actually carries compilerOptions.
 */
export function resolveTargetTsconfig(cwd: string): {
  file: string
  exists: boolean
  unreadable?: boolean
} {
  const root = join(cwd, 'tsconfig.json')
  if (!existsSync(root)) return {file: root, exists: false}

  let data: TsconfigDoc
  try {
    data = readJsonc(root)
  } catch {
    return {file: root, exists: true, unreadable: true}
  }

  const hasOwnOptions = data.compilerOptions && Object.keys(data.compilerOptions).length > 0
  if (hasOwnOptions || !Array.isArray(data.references)) {
    return {file: root, exists: true}
  }

  const referenced = data.references
    .map((ref) => ref.path)
    .filter((p): p is string => typeof p === 'string')
    .map((p) => join(cwd, p.endsWith('.json') ? p : join(p, 'tsconfig.json')))
    .filter((p) => existsSync(p))

  // Keep only references we can parse and that actually carry compilerOptions, so
  // we never write into a reference that has none or crash on an unreadable one.
  // Prefer an "app" config, the common Vite solution-style layout.
  const withOptions = referenced.filter((p) => {
    try {
      const doc = readJsonc(p)
      return Boolean(doc.compilerOptions && Object.keys(doc.compilerOptions).length > 0)
    } catch {
      return false
    }
  })

  const appConfig = withOptions.find((p) => p.includes('app')) ?? withOptions[0]
  return {file: appConfig ?? root, exists: true}
}

/** Merges compilerOptions across the resolvable `extends` chain (relative paths only). */
function effectiveCompilerOptions(file: string, seen = new Set<string>()): Record<string, unknown> {
  if (!existsSync(file) || seen.has(file)) return {}
  seen.add(file)

  let data: TsconfigDoc
  try {
    data = readJsonc(file)
  } catch {
    return {}
  }

  const base: Record<string, unknown> = {}
  const extendsField = data.extends
  const extendsList = Array.isArray(extendsField)
    ? extendsField
    : extendsField
      ? [extendsField]
      : []
  for (const ext of extendsList) {
    if (typeof ext !== 'string') continue
    if (ext.startsWith('.') || isAbsolute(ext)) {
      const resolved = isAbsolute(ext) ? ext : resolve(dirname(file), ext)
      const withExt = resolved.endsWith('.json') ? resolved : `${resolved}.json`
      Object.assign(base, effectiveCompilerOptions(withExt, seen))
    }
  }

  return {...base, ...data.compilerOptions}
}

function libIncludes(libs: unknown, name: string): boolean {
  if (!Array.isArray(libs)) return false
  return libs.some((entry) => String(entry).toLowerCase() === name.toLowerCase())
}

function hasEsBaseline(libs: unknown): boolean {
  if (!Array.isArray(libs)) return false
  return libs.some((entry) => /^es(\d{4}|next)$/i.test(String(entry)))
}

/**
 * Compares effective options against the minimum a project needs to consume
 * this package and returns the changes to make. Pure: callers decide whether to
 * apply them.
 *
 * Only options that actually break consumption are touched, so merging into an
 * existing project never introduces type errors in the user's own code:
 *   - jsx: required to compile .tsx
 *   - moduleResolution: required to read the package exports map + its types
 *   - module: must stay compatible with a bundler resolution
 *   - lib: DOM/DOM.Iterable back the component element types
 *   - skipLibCheck: only ever removes errors, safe to add
 *
 * `load: true` marks the load-bearing changes that doctor reports as failures.
 */
export function planTsconfigChanges(effective: Record<string, unknown>): TsconfigChange[] {
  const changes: TsconfigChange[] = []
  const opts = effective

  const jsx = opts['jsx']
  if (!jsx) changes.push({key: 'jsx', from: undefined, to: 'react-jsx', load: true})
  else if (typeof jsx !== 'string' || !VALID_JSX.has(jsx)) {
    changes.push({key: 'jsx', from: jsx, to: 'react-jsx', load: true})
  }

  const resolution = opts['moduleResolution']
  const resolutionLower = typeof resolution === 'string' ? resolution.toLowerCase() : null
  const resolutionIsModern = Boolean(resolutionLower && MODERN_RESOLUTIONS.has(resolutionLower))
  let willSetBundler = false
  if (!resolution) {
    changes.push({key: 'moduleResolution', from: undefined, to: 'bundler', load: true})
    willSetBundler = true
  } else if (!resolutionIsModern) {
    changes.push({key: 'moduleResolution', from: resolution, to: 'bundler', load: true})
    willSetBundler = true
  }

  // module only matters when resolution is (or becomes) bundler, which requires
  // esnext/preserve/es2015+. node16/nodenext pair with their own module values,
  // so we leave those alone.
  const resolutionWillBeBundler = willSetBundler || resolutionLower === 'bundler'
  const module = opts['module']
  const moduleLower = typeof module === 'string' ? module.toLowerCase() : null
  const moduleCompatible = Boolean(moduleLower && BUNDLER_MODULES.has(moduleLower))
  // Only enforce module when resolution is (or becomes) bundler. node16/nodenext
  // pair with their own module values, so a missing or non-bundler module under
  // those resolutions is left alone rather than forced to esnext (which would be
  // an invalid combination and could change a NodeNext project's semantics).
  if (resolutionWillBeBundler && !moduleCompatible) {
    changes.push({key: 'module', from: module, to: 'esnext', load: true})
  }

  const lib = opts['lib']
  if (lib === undefined) {
    changes.push({key: 'lib', from: undefined, to: [...DOM_LIBS, ES_BASELINE], load: true})
  } else {
    const missing = DOM_LIBS.filter((entry) => !libIncludes(lib, entry))
    if (!hasEsBaseline(lib)) missing.push(ES_BASELINE)
    if (missing.length > 0) {
      changes.push({key: 'lib', from: lib, to: missing, merge: true, load: true})
    }
  }

  if (opts['skipLibCheck'] === undefined) {
    changes.push({key: 'skipLibCheck', from: undefined, to: true})
  }

  return changes
}

/** Read-only: what would `init` change about tsconfig? Used by `doctor` too. */
export function inspectTsconfig(cwd: string): TsconfigInspection {
  const target = resolveTargetTsconfig(cwd)
  if (!target.exists) {
    return {file: target.file, exists: false, changes: planTsconfigChanges({})}
  }
  if (target.unreadable) {
    return {file: target.file, exists: true, unreadable: true, changes: []}
  }
  const effective = effectiveCompilerOptions(target.file)
  return {file: target.file, exists: true, effective, changes: planTsconfigChanges(effective)}
}

/**
 * Applies the required options. Existing comments and unrelated settings are
 * preserved (comment-json round-trips them). Returns what happened.
 */
export function reconcileTsconfig(cwd: string, {dryRun = false} = {}): TsconfigResult {
  const target = resolveTargetTsconfig(cwd)

  if (!target.exists) {
    if (!dryRun) {
      writeFileSync(target.file, `${JSON.stringify(DEFAULT_TSCONFIG, null, 2)}\n`)
    }
    return {file: target.file, created: true, changes: [], wrote: !dryRun}
  }

  if (target.unreadable) {
    return {file: target.file, created: false, changes: [], wrote: false, unreadable: true}
  }

  const effective = effectiveCompilerOptions(target.file)
  const changes = planTsconfigChanges(effective)
  if (changes.length === 0) {
    return {file: target.file, created: false, changes, wrote: false}
  }

  if (!dryRun) {
    const doc = readJsonc(target.file)
    const options: Record<string, unknown> = doc.compilerOptions ?? {}
    doc.compilerOptions = options
    for (const change of changes) {
      if (change.merge && change.key === 'lib') {
        const current = Array.isArray(options['lib']) ? (options['lib'] as unknown[]) : []
        options['lib'] = [...current, ...(change.to as unknown[])]
      } else {
        options[change.key] = change.to
      }
    }
    writeFileSync(target.file, `${stringify(doc, null, 2)}\n`)
  }

  return {file: target.file, created: false, changes, wrote: !dryRun}
}
