import type {Space} from '@sanity/ui-tokens/system'
import {expect, test} from 'vitest'

import {BREAKPOINT_KEYS, BREAKPOINTS} from './constants'
import type {ResponsiveProp, ResponsivePropObject} from './types'

test('types', () => {
  expect(BREAKPOINTS).toHaveLength(7)
  expect(BREAKPOINT_KEYS).toHaveLength(7)

  // number
  expect(1 satisfies ResponsiveProp<Space>).toBeDefined()

  // array
  expect([1, undefined, 3] satisfies ResponsiveProp<Space>).toHaveLength(3)

  const arr_invalid: ResponsiveProp<Space> = [
    1, 2, 3, 4, 5, 6, 7,
    // @ts-expect-error - invalid array length
    8,
  ]

  expect(arr_invalid).toHaveLength(8)

  const obj_invalid: ResponsivePropObject<Space> = {
    0: 1,
    // @ts-expect-error - invalid array length
    7: 8,
  }

  expect(Object.keys(obj_invalid)).toHaveLength(2)
})
