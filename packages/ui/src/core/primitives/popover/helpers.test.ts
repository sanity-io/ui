import {describe, expect, it} from 'vitest'

import {calcMaxWidth} from './helpers'

describe('calcMaxWidth', () => {
  it.each([
    // Nothing caps the popover
    {boundaryWidth: undefined, currentWidth: undefined, expected: undefined},
    // The boundary width less the padding on both sides
    {boundaryWidth: 300, currentWidth: undefined, expected: 292},
    // The smaller of the two
    {boundaryWidth: 300, currentWidth: 100, expected: 100},
    {boundaryWidth: 300, currentWidth: 320, expected: 292},
    {boundaryWidth: undefined, currentWidth: 320, expected: 320},
    // A boundary without a width (collapsed or `display: none`) caps nothing
    {boundaryWidth: 0, currentWidth: undefined, expected: undefined},
    // A boundary narrower than its padding leaves no room, which is a cap of zero, not a negative
    // length (invalid CSS, which would leave the previous cap in place)
    {boundaryWidth: 6, currentWidth: undefined, expected: 0},
    {boundaryWidth: 6, currentWidth: 320, expected: 0},
  ])(
    'is $expected for a boundary width of $boundaryWidth and a width of $currentWidth',
    ({boundaryWidth, currentWidth, expected}) => {
      expect(calcMaxWidth({boundaryWidth, currentWidth})).toBe(expected)
    },
  )
})
