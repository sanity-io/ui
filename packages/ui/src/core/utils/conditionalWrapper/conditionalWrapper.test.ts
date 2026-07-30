import {describe, expect, test} from 'vitest'

import {ConditionalWrapper} from './conditionalWrapper'

describe('ConditionalWrapper', () => {
  test('throws when called', () => {
    expect(() =>
      // oxlint-disable-next-line no-deprecated
      ConditionalWrapper(),
    ).toThrow(
      '`ConditionalWrapper` was removed in @sanity/ui v4. Inline the conditional wrapping logic instead.',
    )
  })
})
