import {mkdtempSync, readFileSync, rmSync, writeFileSync} from 'node:fs'
import {tmpdir} from 'node:os'
import {join} from 'node:path'

import {parse} from 'comment-json'
import {afterEach, beforeEach, describe, expect, it} from 'vitest'

import {planTsconfigChanges, reconcileTsconfig, resolveTargetTsconfig} from './tsconfig.js'
import type {TsconfigChange} from './types.js'

function keysChanged(changes: TsconfigChange[]): string[] {
  return changes.map((c) => c.key).sort()
}

interface ParsedTsconfig {
  compilerOptions?: Record<string, unknown>
}

function parseConfig(raw: string): ParsedTsconfig {
  return parse(raw) as unknown as ParsedTsconfig
}

describe('planTsconfigChanges', () => {
  it('reports nothing for an already-good config', () => {
    const changes = planTsconfigChanges({
      jsx: 'react-jsx',
      module: 'esnext',
      moduleResolution: 'bundler',
      lib: ['DOM', 'DOM.Iterable', 'ES2022'],
      skipLibCheck: true,
    })
    expect(changes).toEqual([])
  })

  it('fixes a classic moduleResolution and incompatible module together', () => {
    const changes = planTsconfigChanges({
      jsx: 'react-jsx',
      module: 'commonjs',
      moduleResolution: 'node',
      lib: ['DOM', 'DOM.Iterable', 'ES2022'],
      skipLibCheck: true,
    })
    expect(keysChanged(changes)).toEqual(['module', 'moduleResolution'])
    expect(changes.find((c) => c.key === 'moduleResolution')?.to).toBe('bundler')
    expect(changes.find((c) => c.key === 'module')?.to).toBe('esnext')
  })

  it('leaves a compatible module alone when resolution is already modern', () => {
    const changes = planTsconfigChanges({
      jsx: 'react-jsx',
      module: 'commonjs',
      moduleResolution: 'nodenext',
      lib: ['DOM', 'DOM.Iterable', 'ES2022'],
      skipLibCheck: true,
    })
    // nodenext is modern, but commonjs is not bundler-compatible; nodenext does
    // not force the change, so module stays untouched.
    expect(keysChanged(changes)).toEqual([])
  })

  it('does not force module when resolution is nodenext and module is missing', () => {
    const changes = planTsconfigChanges({
      jsx: 'react-jsx',
      moduleResolution: 'nodenext',
      lib: ['DOM', 'DOM.Iterable', 'ES2022'],
      skipLibCheck: true,
    })
    expect(changes.find((c) => c.key === 'module')).toBeUndefined()
  })

  it('adds only missing DOM libs and keeps the existing ES baseline', () => {
    const changes = planTsconfigChanges({
      jsx: 'react-jsx',
      module: 'esnext',
      moduleResolution: 'bundler',
      lib: ['ES2023', 'DOM'],
      skipLibCheck: true,
    })
    expect(keysChanged(changes)).toEqual(['lib'])
    const lib = changes.find((c) => c.key === 'lib')
    expect(lib?.merge).toBe(true)
    expect(lib?.to).toEqual(['DOM.Iterable'])
  })

  it('treats jsx and moduleResolution as load-bearing', () => {
    const changes = planTsconfigChanges({})
    const load = changes.filter((c) => c.load).map((c) => c.key)
    expect(load).toContain('jsx')
    expect(load).toContain('moduleResolution')
  })
})

describe('reconcileTsconfig', () => {
  let dir: string
  beforeEach(() => {
    dir = mkdtempSync(join(tmpdir(), 'sui-tsconfig-'))
  })
  afterEach(() => {
    rmSync(dir, {recursive: true, force: true})
  })

  it('creates a tsconfig when none exists', () => {
    const result = reconcileTsconfig(dir)
    expect(result.created).toBe(true)
    const written = parseConfig(readFileSync(join(dir, 'tsconfig.json'), 'utf8'))
    expect(written.compilerOptions?.['jsx']).toBe('react-jsx')
    expect(written.compilerOptions?.['moduleResolution']).toBe('bundler')
  })

  it('merges required options while preserving comments and unrelated settings', () => {
    writeFileSync(
      join(dir, 'tsconfig.json'),
      `{
  // keep me
  "compilerOptions": {
    "moduleResolution": "node",
    "module": "commonjs",
    "baseUrl": "."
  }
}
`,
    )
    const result = reconcileTsconfig(dir)
    expect(result.created).toBe(false)
    const raw = readFileSync(join(dir, 'tsconfig.json'), 'utf8')
    expect(raw).toContain('// keep me')
    const written = parseConfig(raw)
    expect(written.compilerOptions?.['baseUrl']).toBe('.')
    expect(written.compilerOptions?.['moduleResolution']).toBe('bundler')
    expect(written.compilerOptions?.['module']).toBe('esnext')
    expect(written.compilerOptions?.['jsx']).toBe('react-jsx')
  })

  it('is idempotent: a second run makes no changes', () => {
    reconcileTsconfig(dir)
    const second = reconcileTsconfig(dir)
    expect(second.changes).toEqual([])
  })

  it('targets the referenced config in a solution-style setup', () => {
    writeFileSync(
      join(dir, 'tsconfig.json'),
      `{"files": [], "references": [{"path": "./tsconfig.app.json"}]}\n`,
    )
    writeFileSync(
      join(dir, 'tsconfig.app.json'),
      `{"compilerOptions": {"moduleResolution": "bundler", "module": "esnext", "jsx": "react-jsx", "lib": ["ES2023", "DOM"], "skipLibCheck": true}}\n`,
    )
    const result = reconcileTsconfig(dir)
    expect(result.file.endsWith('tsconfig.app.json')).toBe(true)
    expect(keysChanged(result.changes)).toEqual(['lib'])
  })

  it('skips a referenced config without compilerOptions and picks one that has them', () => {
    writeFileSync(
      join(dir, 'tsconfig.json'),
      `{"files": [], "references": [{"path": "./tsconfig.app.json"}, {"path": "./tsconfig.node.json"}]}\n`,
    )
    // The "app" config is preferred by name but carries no options, so it must be skipped.
    writeFileSync(join(dir, 'tsconfig.app.json'), `{"extends": "./base.json"}\n`)
    writeFileSync(
      join(dir, 'tsconfig.node.json'),
      `{"compilerOptions": {"moduleResolution": "bundler"}}\n`,
    )
    const target = resolveTargetTsconfig(dir)
    expect(target.file.endsWith('tsconfig.node.json')).toBe(true)
  })

  it('treats a non-object tsconfig.json as unreadable instead of crashing', () => {
    writeFileSync(join(dir, 'tsconfig.json'), `null\n`)
    expect(resolveTargetTsconfig(dir).unreadable).toBe(true)
    expect(reconcileTsconfig(dir).unreadable).toBe(true)
  })
})
