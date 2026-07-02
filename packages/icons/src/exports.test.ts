import {readdirSync, readFileSync} from 'node:fs'
import path from 'node:path'
import {fileURLToPath} from 'node:url'

import {describe, expect, test} from 'vitest'

import {icons} from './icons'
import * as barrel from './index'

const ROOT_PATH = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const EXPORTS_DIR = path.join(ROOT_PATH, 'src/exports')

const exportNames = readdirSync(EXPORTS_DIR)
  .filter((file) => file.endsWith('.tsx'))
  .map((file) => file.slice(0, -'.tsx'.length))
  .toSorted()

const pkg = JSON.parse(readFileSync(path.join(ROOT_PATH, 'package.json'), 'utf8')) as {
  exports: Record<string, unknown>
}

const barrelExports = barrel as Record<string, unknown>

describe('per-icon subpath exports', () => {
  test('there is exactly one subpath module per icon', () => {
    expect(exportNames.length).toBe(Object.keys(icons).length)
  })

  test.each(exportNames)(
    '"%s" exposes the icon as both a matching named export and the default export',
    async (exportName) => {
      const mod = (await import(`./exports/${exportName}.tsx`)) as Record<string, unknown>

      // The named export is the PascalCase name *with* the `Icon` suffix, e.g.
      // `@sanity/icons/AccessDenied` exports `AccessDeniedIcon`.
      const namedExport = `${exportName}Icon`
      expect(Object.keys(mod).filter((key) => key !== 'default')).toEqual([namedExport])

      const named = mod[namedExport]
      expect(typeof named).toBe('function')

      // The default export enables `React.lazy(() => import('@sanity/icons/AccessDenied'))`,
      // and it must be the very same component as the named export.
      expect(mod['default']).toBe(named)

      // The barrel (`@sanity/icons`) re-exports the identical component, so the subpath and
      // barrel named imports are fully interchangeable.
      expect(barrelExports[namedExport]).toBe(named)
    },
  )

  test.each(exportNames)(
    '"%s" is registered as a subpath in package.json exports',
    (exportName) => {
      expect(pkg.exports[`./${exportName}`]).toBeDefined()
    },
  )

  test('every icon in the `icons` map is reachable from the barrel', () => {
    const barrelComponents = new Set(Object.values(barrelExports))

    for (const component of Object.values(icons)) {
      expect(barrelComponents.has(component)).toBe(true)
    }
  })
})
