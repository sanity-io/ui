import {readdirSync, readFileSync} from 'node:fs'
import path from 'node:path'
import {fileURLToPath} from 'node:url'

import {render, waitFor} from '@testing-library/react'
import type {ComponentType} from 'react'
import {createElement, Suspense} from 'react'
import {isForwardRef, isLazy} from 'react-is'
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

      // Icons are `React.forwardRef` components (not plain functions relying on React 19's
      // ref-as-prop model) so refs attach on React 18 too.
      const named = mod[namedExport]
      expect(isForwardRef(createElement(named as ComponentType))).toBe(true)

      // The default export backs both `React.lazy(() => import('@sanity/icons/AccessDenied'))`
      // in userland and the lazy `icons` map entries, and it must be the very same component
      // as the named export.
      expect(mod['default']).toBe(named)
    },
  )

  test.each(exportNames)(
    '"%s" is registered as a subpath in package.json exports',
    (exportName) => {
      expect(pkg.exports[`./${exportName}`]).toBeDefined()
    },
  )
})

describe('root entry', () => {
  test('exposes only the dynamic entry points, no per-icon exports', () => {
    expect(Object.keys(barrelExports).toSorted()).toEqual(['Icon', 'icons'])
  })

  test('every entry in the `icons` map is a `React.lazy` component', () => {
    for (const IconComponent of Object.values(icons)) {
      expect(isLazy(<IconComponent />)).toBe(true)
    }
  })

  test('every entry in the `icons` map lazily resolves to the svg with the matching name', async () => {
    const {container} = render(
      <Suspense fallback={null}>
        {Object.entries(icons).map(([name, IconComponent]) => (
          <IconComponent key={name} />
        ))}
      </Suspense>,
    )

    // The single Suspense boundary only commits once every icon chunk has resolved.
    await waitFor(
      () => {
        expect(container.querySelectorAll('svg[data-sanity-icon]')).toHaveLength(
          Object.keys(icons).length,
        )
      },
      {timeout: 10_000},
    )

    for (const name of Object.keys(icons)) {
      const svg = container.querySelector(`svg[data-sanity-icon="${name}"]`)
      expect(svg).not.toBeNull()
      expect(svg?.hasChildNodes()).toBe(true)
    }
  }, 15_000)
})
