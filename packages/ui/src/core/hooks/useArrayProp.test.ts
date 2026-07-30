import {describe, expect, test} from 'vitest'

import {useArrayProp} from './useArrayProp'

describe('useArrayProp', () => {
  test('throws when called', () => {
    expect(() =>
      // oxlint-disable-next-line no-deprecated
      useArrayProp(),
    ).toThrow(
      '`useArrayProp` was removed in @sanity/ui v4. Use `Array.isArray(value) ? value : [value]` instead.',
    )
  })
})
