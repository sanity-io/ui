import {mkdtempSync, rmSync, writeFileSync} from 'node:fs'
import {tmpdir} from 'node:os'
import {join} from 'node:path'

import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest'

import * as checks from './checks.js'
import {runDoctor} from './doctor.js'
import {writeInstalledUiVersion} from './test-utils.js'

describe('runDoctor', () => {
  let dir: string
  let output: string

  beforeEach(() => {
    dir = mkdtempSync(join(tmpdir(), 'sui-doctor-'))
    output = ''
    vi.spyOn(process.stdout, 'write').mockImplementation((chunk) => {
      output += String(chunk)
      return true
    })
  })

  afterEach(() => {
    rmSync(dir, {recursive: true, force: true})
    vi.restoreAllMocks()
  })

  it('warns and skips checks when @sanity/ui is pre-v5', () => {
    writeFileSync(join(dir, 'package.json'), JSON.stringify({dependencies: {}}))
    writeInstalledUiVersion(dir, '3.5.1')
    const collectChecks = vi.spyOn(checks, 'collectChecks')

    expect(runDoctor({cwd: dir})).toBe(0)
    expect(output).toMatch(/@sanity\/ui@\^?3\.5\.1 \(pre-v5\)/)
    expect(output).toMatch(/doctor checks v5 installs only/)
    expect(collectChecks).not.toHaveBeenCalled()
  })

  it('warns and skips checks when v5 is installed under an alias', () => {
    writeFileSync(
      join(dir, 'package.json'),
      JSON.stringify({dependencies: {ui5: 'npm:@sanity/ui@alpha'}}),
    )
    const collectChecks = vi.spyOn(checks, 'collectChecks')

    expect(runDoctor({cwd: dir})).toBe(0)
    expect(output).toMatch(/alias "ui5"/)
    expect(output).toMatch(/doctor checks direct @sanity\/ui v5 installs only/)
    expect(collectChecks).not.toHaveBeenCalled()
  })
})
