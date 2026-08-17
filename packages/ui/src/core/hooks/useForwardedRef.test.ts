import {describe, expect, test} from 'vitest'

import {useForwardedRef} from './useForwardedRef'

describe('useForwardedRef', () => {
  test('throws when called', () => {
    expect(() =>
      // oxlint-disable-next-line no-deprecated
      useForwardedRef(),
    ).toThrow(
      '`useForwardedRef` was removed in @sanity/ui v4. Use `useRef` and `useImperativeHandle` instead.',
    )
  })
})
