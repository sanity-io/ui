import {mkdtempSync, rmSync} from 'node:fs'
import {tmpdir} from 'node:os'
import {join} from 'node:path'

import {afterEach, beforeEach, describe, expect, it} from 'vitest'

import {installCommand, resolveInstallSpecs, resolveTypeSpecs} from './install.js'

describe('resolveInstallSpecs', () => {
  it('pins the package to its shipped version and icons to the declared version', () => {
    const specs = resolveInstallSpecs()
    expect(specs[0]).toMatch(/^@sanity\/ui@\d+\.\d+\.\d+/)
    expect(specs.some((s) => s.startsWith('@sanity/icons@'))).toBe(true)
  })

  it('leaves dependencies the app never imports itself to the package manager', () => {
    const specs = resolveInstallSpecs()
    expect(specs.some((s) => s.startsWith('react-refractor'))).toBe(false)
    expect(specs.some((s) => s.startsWith('clsx'))).toBe(false)
  })
})

describe('installCommand', () => {
  it('uses install for npm and add for others', () => {
    expect(installCommand('npm', ['x']).args).toEqual(['install', 'x'])
    expect(installCommand('pnpm', ['x']).args).toEqual(['add', 'x'])
  })

  it('applies the right dev flag per package manager', () => {
    expect(installCommand('npm', ['x'], {dev: true}).args).toEqual(['install', '--save-dev', 'x'])
    expect(installCommand('pnpm', ['x'], {dev: true}).args).toEqual(['add', '-D', 'x'])
    expect(installCommand('yarn', ['x'], {dev: true}).args).toEqual(['add', '-D', 'x'])
    expect(installCommand('bun', ['x'], {dev: true}).args).toEqual(['add', '-d', 'x'])
  })
})

describe('resolveTypeSpecs', () => {
  let dir: string
  beforeEach(() => {
    dir = mkdtempSync(join(tmpdir(), 'sui-types-'))
  })
  afterEach(() => {
    rmSync(dir, {recursive: true, force: true})
  })

  it('returns React type packages pinned to the major when none are installed', () => {
    expect(resolveTypeSpecs(dir, {reactMajor: 19})).toEqual([
      '@types/react@^19',
      '@types/react-dom@^19',
    ])
  })
})
