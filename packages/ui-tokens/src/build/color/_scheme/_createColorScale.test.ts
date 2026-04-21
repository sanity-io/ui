import {expect, test} from 'vitest'

import type {ColorExpr} from '../../../lib/color/_parseColorExprLiteral'
import type {ColorToken} from '../../../lib/color/types'
import {_createColorScale} from './_createColorScale'

test('_createColorScale', () => {
  const debugId = 'test'

  const systemBg: ColorExpr = {
    type: 'keyword',
    name: 'black',
    mix: 1,
    opacity: 1,
  }

  const bg: ColorExpr = {
    type: 'tint',
    hue: 'gray',
    tint: '900',
    mix: 0.75,
    opacity: 1,
  }

  const fromExpr: ColorExpr = {
    type: 'tint',
    hue: 'gray',
    tint: '700',
    mix: 0.5,
    opacity: 1,
  }

  const toExpr: ColorExpr = {
    type: 'tint',
    hue: 'gray',
    tint: '600',
    mix: 1,
    opacity: 1,
  }

  const scale = _createColorScale(
    {
      from: fromExpr,
      to: toExpr,
      bg,
      systemBg,
    },
    debugId,
  )

  // 0
  expect(debugColorToken(scale(0))).toBe('#282b39')

  // 0.25
  expect(debugColorToken(scale(0.25))).toBe('#323647')

  // 0.5
  expect(debugColorToken(scale(0.5))).toBe('#3c4255')

  // 0.75
  expect(debugColorToken(scale(0.75))).toBe('#474d62')

  // 1
  expect(debugColorToken(scale(1))).toBe('{color.palette.gray.600}')
})

function debugColorToken(token: ColorToken) {
  if (typeof token.$value === 'string') {
    return token.$value
  }

  return token.$value.hex
}
