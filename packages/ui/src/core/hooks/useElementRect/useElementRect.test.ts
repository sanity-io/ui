import {describe, expect, test} from 'vitest'

import {useElementRect} from './useElementRect'

describe('useElementRect', () => {
  test('throws when called', () => {
    expect(() =>
      // oxlint-disable-next-line no-deprecated
      useElementRect(),
    ).toThrow('`useElementRect` was removed in @sanity/ui v4. Use `useElementSize` instead.')
  })
})
