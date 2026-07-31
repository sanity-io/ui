import {mkdirSync, mkdtempSync, rmSync, writeFileSync} from 'node:fs'
import {tmpdir} from 'node:os'
import {join} from 'node:path'

import {afterEach, beforeEach, describe, expect, it} from 'vitest'

import {detect, detectEntry, detectFramework, detectPackageManager} from './detect.js'

describe('detectPackageManager', () => {
  let dir: string
  beforeEach(() => {
    dir = mkdtempSync(join(tmpdir(), 'sui-pm-'))
  })
  afterEach(() => {
    rmSync(dir, {recursive: true, force: true})
  })

  it('reads lockfiles', () => {
    writeFileSync(join(dir, 'pnpm-lock.yaml'), '')
    expect(detectPackageManager(dir)).toBe('pnpm')
  })

  it('falls back to the packageManager field, then npm', () => {
    writeFileSync(join(dir, 'package.json'), JSON.stringify({packageManager: 'yarn@4.0.0'}))
    expect(detectPackageManager(dir)).toBe('yarn')
    writeFileSync(join(dir, 'package.json'), JSON.stringify({}))
    expect(detectPackageManager(dir)).toBe('npm')
  })
})

describe('detectFramework', () => {
  let dir: string
  beforeEach(() => {
    dir = mkdtempSync(join(tmpdir(), 'sui-fw-'))
  })
  afterEach(() => {
    rmSync(dir, {recursive: true, force: true})
  })

  function pkg(deps: Record<string, string>): void {
    writeFileSync(join(dir, 'package.json'), JSON.stringify({dependencies: deps}))
  }

  it('distinguishes Next App Router from Pages', () => {
    pkg({next: '16.0.0'})
    mkdirSync(join(dir, 'app'))
    expect(detectFramework(dir)).toBe('next-app')

    rmSync(join(dir, 'app'), {recursive: true})
    mkdirSync(join(dir, 'pages'))
    expect(detectFramework(dir)).toBe('next-pages')
  })

  it('detects react-router, remix, astro, vite, and the react fallback', () => {
    pkg({'@react-router/dev': '7.0.0', 'react-router': '7.0.0'})
    expect(detectFramework(dir)).toBe('react-router')

    pkg({'@remix-run/react': '2.0.0'})
    expect(detectFramework(dir)).toBe('remix')

    pkg({astro: '4.0.0'})
    expect(detectFramework(dir)).toBe('astro')

    pkg({vite: '8.0.0'})
    expect(detectFramework(dir)).toBe('vite')

    pkg({react: '19.2.0'})
    expect(detectFramework(dir)).toBe('react')
  })
})

describe('detectEntry', () => {
  let dir: string
  beforeEach(() => {
    dir = mkdtempSync(join(tmpdir(), 'sui-entry-'))
  })
  afterEach(() => {
    rmSync(dir, {recursive: true, force: true})
  })

  it('returns the existing entry when present', () => {
    mkdirSync(join(dir, 'src'))
    writeFileSync(join(dir, 'src/main.tsx'), '')
    expect(detectEntry(dir, 'vite')).toEqual({entry: 'src/main.tsx', exists: true})
  })

  it('returns the canonical default when absent', () => {
    expect(detectEntry(dir, 'next-app')).toEqual({entry: 'app/layout.tsx', exists: false})
  })
})

describe('detect typescript flag', () => {
  let dir: string
  beforeEach(() => {
    dir = mkdtempSync(join(tmpdir(), 'sui-ts-'))
  })
  afterEach(() => {
    rmSync(dir, {recursive: true, force: true})
  })

  it('does not infer TypeScript from a guessed entry that does not exist', () => {
    writeFileSync(join(dir, 'package.json'), JSON.stringify({dependencies: {react: '19.2.0'}}))
    // No tsconfig, no typescript dep, and the .tsx entry is only a fallback guess.
    expect(detect(dir).typescript).toBe(false)
  })

  it('infers TypeScript when the resolved entry file actually exists', () => {
    mkdirSync(join(dir, 'src'))
    writeFileSync(join(dir, 'src/main.tsx'), '')
    writeFileSync(join(dir, 'package.json'), JSON.stringify({devDependencies: {vite: '8.0.0'}}))
    expect(detect(dir).typescript).toBe(true)
  })
})
