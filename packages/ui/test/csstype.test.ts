/**
 * `@sanity/ui` exports types built on csstype's `Properties`, and
 * styled-components pins an exact csstype. When the two versions differ, the
 * exported `CSSObject` stops being assignable to styled-components' own
 * `CSSObject` and `Interpolation` (e.g. csstype 3.2.4 added `flexWrap: 'balance'`).
 *
 * Older and prerelease styled-components versions never agree with the pinned
 * csstype, so CI sets `CHECK_CSSTYPE_MATCH` only for the leg that tests the
 * styled-components version in the workspace catalog.
 */
import fs from 'node:fs'
import path from 'node:path'

import {expect, test} from 'vitest'

const UI_DIR = path.resolve(import.meta.dirname, '..')

function readCsstypeVersion(...segments: string[]): string {
  const pkg = JSON.parse(fs.readFileSync(path.join(UI_DIR, ...segments, 'package.json'), 'utf8'))
  return pkg.dependencies.csstype
}

test.skipIf(process.env.CHECK_CSSTYPE_MATCH !== 'true')(
  '@sanity/ui declares the same csstype version as styled-components',
  () => {
    expect(readCsstypeVersion()).toBe(readCsstypeVersion('node_modules', 'styled-components'))
  },
)
