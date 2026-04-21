import {mixColors} from '../../../lib/color/_colorMixing'
import type {ColorExpr} from '../../../lib/color/_parseColorExprLiteral'
import type {ColorToken} from '../../../lib/color/types'
import type {_DTCGColorValue} from '../../../lib/dtcg/types'
import {paletteTokens} from '../../../primitive/color/palette/tokens'

export function _resolveColorValue(
  expr: ColorExpr,
  node: ColorToken | undefined,
  options: {mixBg: ColorExpr; systemBg: ColorExpr},
): _DTCGColorValue {
  const {mixBg, systemBg} = options

  let _value: _DTCGColorValue = {
    colorSpace: 'srgb',
    components: [0, 0, 0],
    alpha: 0,
  }

  if (expr.type === 'inherit') {
    if (!mixBg) {
      throw new Error('"inherit" not supported')
    }

    return _resolveColorValue(mixBg, undefined, {
      mixBg: systemBg,
      systemBg,
    })
  }

  // If mixing already occurred, read from the computed node value
  if (node?.$value && typeof node.$value !== 'string') {
    _value = node.$value as _DTCGColorValue
  }

  if (expr.type === 'keyword') {
    _value = paletteTokens.color.palette[expr.name].$value
  }

  if (expr.type === 'tint') {
    _value = paletteTokens.color.palette[expr.hue][expr.tint].$value
  }

  if (expr.mix < 1) {
    return mixColors(
      'srgb',
      _resolveColorValue(mixBg, undefined, {mixBg: systemBg, systemBg}),
      _value,
      expr.mix,
    )
  }

  if (expr.opacity < 1) {
    _value = {
      ..._value,
      alpha: expr.opacity,
      hex: undefined,
    }
  }

  return _value
}
