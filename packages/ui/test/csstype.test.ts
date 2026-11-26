/**
 * `@sanity/ui` exports types built on csstype's `Properties`, and
 * styled-components pins an exact csstype. When the two versions differ, the
 * exported `CSSObject` stops being assignable to styled-components' own
 * `CSSObject` and `Interpolation` (e.g. csstype 3.2.4 added `flexWrap: 'balance'`).
 * Older styled-components releases (the 6.1.0 CI leg) declare a csstype range
 * instead, which any single csstype copy can satisfy, so only an exact pin is checked.
 */
import fs from 'node:fs'
import path from 'node:path'

import {expect, test} from 'vitest'

const UI_DIR = path.resolve(import.meta.dirname, '..')

function readPackageJson(...segments: string[]): {dependencies: Record<string, string>} {
  return JSON.parse(fs.readFileSync(path.join(UI_DIR, ...segments, 'package.json'), 'utf8'))
}

const ui = readPackageJson()
const styledComponents = readPackageJson('node_modules', 'styled-components')
const isExactPin = /^\d+\.\d+\.\d+$/.test(styledComponents.dependencies.csstype)

test.skipIf(!isExactPin)(
  '@sanity/ui declares the same csstype version as styled-components',
  () => {
    expect(ui.dependencies.csstype).toBe(styledComponents.dependencies.csstype)
  },
)
