import {mixColors} from '../../../lib/color/_colorMixing'
import type {ColorExpr} from '../../../lib/color/_parseColorExprLiteral'
import type {ColorToken} from '../../../lib/color/types'
import {_resolveColorToken} from './_resolveColorToken'
import {_resolveColorValue} from './_resolveColorValue'

export function _createColorScale(
  options: {
    from: ColorExpr
    to: ColorExpr
    bg: ColorExpr
    systemBg: ColorExpr
  },
  debugId: string,
) {
  const {from, to, bg, systemBg} = options

  return (ratio: number): ColorToken => {
    if (ratio === 0) {
      return _resolveColorToken(from, {bg, systemBg}, `${debugId}.${ratio}`)
    }

    if (ratio === 1) {
      return _resolveColorToken(to, {bg, systemBg}, `${debugId}.${ratio}`)
    }

    const _from = _resolveColorValue(from.type === 'inherit' ? bg : from, undefined, {
      mixBg: bg,
      systemBg,
    })

    const _to = _resolveColorValue(to.type === 'inherit' ? bg : to, undefined, {
      mixBg: bg,
      systemBg,
    })

    return {
      $value: mixColors('srgb', _from, _to, ratio),
      $extensions: {
        'io.sanity.expr': {
          v: 1,
          op: 'mix',
          space: 'srgb',
          stops: [
            {color: _from, stop: 0},
            {color: _to, stop: ratio},
          ],
        },
      },
    }
  }
}
