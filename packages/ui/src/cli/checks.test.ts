import {mkdtempSync, rmSync, writeFileSync} from 'node:fs'
import {tmpdir} from 'node:os'
import {join} from 'node:path'

import {afterEach, beforeEach, describe, expect, it} from 'vitest'

import {collectChecks} from './checks.js'

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
})
