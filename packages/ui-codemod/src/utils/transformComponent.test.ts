import jscodeshift from 'jscodeshift'
import {describe, expect, it} from 'vitest'

import {replaceElement} from './replaceElement'
import {transformComponent} from './transformComponent'

describe('transformComponent', () => {
  const api = {j: jscodeshift, jscodeshift, stats: () => {}, report: () => {}}

  it('returns undefined when the transform makes no changes', () => {
    const result = transformComponent(
      {source: 'export const value = 1\n', path: 'example.ts'},
      api,
      () => {},
    )

    expect(result).toBeUndefined()
  })

  it('returns transformed code when a helper marks changes', () => {
    const result = transformComponent(
      {source: '<Card padding={1} />', path: 'example.tsx'},
      api,
      ({j, root, markChanged}) => {
        if (
          replaceElement(
            j,
            root,
            () => true,
            {
              element: 'Card',
            },
            {
              element: 'Box',
            },
          )
        ) {
          markChanged()
        }
      },
    )

    expect(result).toContain('<Box padding={1} />')
  })
})
