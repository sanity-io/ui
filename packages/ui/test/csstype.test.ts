import fs from 'node:fs'
import path from 'node:path'

import {expect, test} from 'vitest'

const UI_DIR = path.resolve(import.meta.dirname, '..')

function readPackageJson(file: string): {dependencies?: Record<string, string>} {
  return JSON.parse(fs.readFileSync(file, 'utf8'))
}

const ui = readPackageJson(path.join(UI_DIR, 'package.json'))
const styledComponents = readPackageJson(
  path.join(UI_DIR, 'node_modules/styled-components/package.json'),
)
const styledComponentsCsstype = styledComponents.dependencies?.csstype

// The CI matrix also installs the oldest supported styled-components, which declares a csstype
// range rather than an exact version, so only an exact pin has to be matched.
const isExactPin = /^\d+\.\d+\.\d+$/.test(styledComponentsCsstype ?? '')

test.skipIf(!isExactPin)(
  '@sanity/ui declares the exact csstype version that styled-components declares',
  () => {
    expect(ui.dependencies?.csstype).toBe(styledComponentsCsstype)
  },
)
