import jscodeshift from 'jscodeshift'
import {describe, expect, it} from 'vitest'

import {shouldTransformComponent} from './shouldTransformComponent'

const j = jscodeshift

describe('shouldTransformComponent', () => {
  it('returns true when local names are present', () => {
    const root = j(`<Box />`)

    expect(shouldTransformComponent(j, root, 'Box', new Set(['Box']))).toBe(true)
  })

  it('returns false when there is no component usage or import rewrite', () => {
    const root = j(`export const value = 1`)

    expect(shouldTransformComponent(j, root, 'Box', new Set())).toBe(false)
  })

  it('returns true when styled aliases are passed in', () => {
    const root = j(`
      import {RootBox} from './Component.styled'

      export function Component() {
        return <RootBox />
      }
    `)

    expect(
      shouldTransformComponent(j, root, 'Box', new Set(), undefined, new Set(['RootBox'])),
    ).toBe(true)
  })

  it('returns false when fromPackage and toPackage are the same', () => {
    const root = j(`
      import {Box} from '@legacy/ui'
      <Box />
    `)

    expect(
      shouldTransformComponent(j, root, 'Box', new Set(), {
        fromPackage: '@legacy/ui',
        toPackage: '@legacy/ui',
      }),
    ).toBe(false)
  })

  it('returns true when the component is imported from fromPackage', () => {
    const root = j(`
      import {Box} from '@legacy/ui'
    `)

    expect(
      shouldTransformComponent(j, root, 'Box', new Set(), {
        fromPackage: '@legacy/ui',
        toPackage: '@sanity/ui',
      }),
    ).toBe(true)
  })

  it('returns false when the component is not imported from fromPackage', () => {
    const root = j(`
      import {Card} from '@legacy/ui'
      <Card />
    `)

    expect(
      shouldTransformComponent(j, root, 'Box', new Set(), {
        fromPackage: '@legacy/ui',
        toPackage: '@sanity/ui',
      }),
    ).toBe(false)
  })
})
