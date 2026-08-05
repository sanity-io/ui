import {mkdtempSync, rmSync, writeFileSync} from 'node:fs'
import {tmpdir} from 'node:os'
import {join} from 'node:path'

import {afterEach, beforeEach, describe, expect, it} from 'vitest'

import {collectChecks} from './checks.js'
import {writeInstalledUiVersion} from './test-utils.js'

describe('collectChecks tsconfig', () => {
  let dir: string
  beforeEach(() => {
    dir = mkdtempSync(join(tmpdir(), 'sui-checks-'))
  })
  afterEach(() => {
    rmSync(dir, {recursive: true, force: true})
  })

  it('fails (not passes) when tsconfig.json cannot be parsed', () => {
    // Genuinely unparseable (unterminated object), not just JSONC that
    // comment-json would tolerate.
    writeFileSync(join(dir, 'tsconfig.json'), '{ "compilerOptions": { "jsx": "react-jsx"')
    const {checks} = collectChecks(dir)
    const tsconfig = checks.find((c) => c.id === 'tsconfig')
    expect(tsconfig?.status).toBe('fail')
    expect(tsconfig?.detail).toMatch(/could not be parsed/)
  })

  it('fails the version check when @sanity/ui is pre-v5', () => {
    writeFileSync(join(dir, 'package.json'), JSON.stringify({dependencies: {}}))
    writeInstalledUiVersion(dir, '3.5.1')
    const {checks} = collectChecks(dir)
    expect(checks.find((c) => c.id === 'install')?.status).toBe('pass')
    const version = checks.find((c) => c.id === 'version')
    expect(version?.status).toBe('fail')
    expect(version?.detail).toMatch(/pre-v5 \(expected v5\)/)
  })
})
