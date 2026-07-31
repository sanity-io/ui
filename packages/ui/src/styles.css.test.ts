import {existsSync} from 'node:fs'
import {createRequire} from 'node:module'
import {dirname, join} from 'node:path'

import {describe, expect, it} from 'vitest'

const require = createRequire(import.meta.url)

describe('@sanity-labs/ui-poc/styles.css', () => {
  it('resolves to a Node-safe shim under the node condition', () => {
    const path = require.resolve('@sanity-labs/ui-poc/styles.css')
    expect(path).toMatch(/styles\.css\.node\.js$/)
  })

  it('imports without throwing in Node ESM', async () => {
    const mod = await import('@sanity-labs/ui-poc/styles.css')
    expect(mod.default).toBe('')
  })

  it('ships the real stylesheet for browser/style resolution', () => {
    const pkgRoot = dirname(require.resolve('@sanity-labs/ui-poc/package.json'))
    expect(existsSync(join(pkgRoot, 'dist/styles.css'))).toBe(true)
  })
})
