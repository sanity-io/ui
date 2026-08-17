import {describe, expect, test} from 'vitest'

import {useClickOutside} from './useClickOutside'

describe('useClickOutside', () => {
  test('throws when called', () => {
    expect(() =>
      // oxlint-disable-next-line no-deprecated
      useClickOutside(),
    ).toThrow('`useClickOutside` was removed in @sanity/ui v4. Use `useClickOutsideEvent` instead.')
  })
})
