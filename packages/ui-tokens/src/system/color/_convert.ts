import Color from 'colorjs.io'

import type {DTCGColorValue} from '../_dtcg/schema'
import type {ColorExpr} from './_parseColorExprLiteral'
import type {SanityColorToken} from './schema'

const CHANNEL_PRECISION = 3

/** @internal */
export function _colorToDTCGColorValue(input: string): DTCGColorValue {
  const c = new Color(input)
  const srgb = c.to('srgb')

  return {
    colorSpace: 'srgb',
    components: [
      _roundChannel(srgb.coords[0] ?? 0),
      _roundChannel(srgb.coords[1] ?? 0),
      _roundChannel(srgb.coords[2] ?? 0),
    ],
    hex: c.toString({format: 'hex'}),
  }
}

export function _colorExprToDTCGColor(expr: ColorExpr): SanityColorToken {
  // fallback
  let node: SanityColorToken = {
    $type: 'color',
    $value: {
      colorSpace: 'srgb',
      components: [0, 0, 0],
      alpha: 0,
    },
    // $extensions: {'io.sanity': {key: ''}},
  }

  if (expr.type === 'keyword') {
    node = {
      $type: 'color',
      $value: `{color.${expr.name}}`,
      // $extensions: {'io.sanity': {key: ''}},
    }
  }

  if (expr.type === 'tint') {
    node = {
      $type: 'color',
      $value: `{color.${expr.hue}.${expr.tint}}`,
      // $extensions: {'io.sanity': {key: ''}},
    }
  }

  return node
}

function _roundChannel(value: number): number {
  return _round(value, CHANNEL_PRECISION)
}

function _round(value: number, precision: number): number {
  const factor = 10 ** precision

  const n = Math.round((value + Number.EPSILON) * factor) / factor

  return Object.is(n, -0) ? 0 : n
}
