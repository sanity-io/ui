import {color} from '@sanity/color'

import {HUES, TINTS} from '../../../constants'
import {_defineTokenGroup} from '../../../lib/_defineTokenGroup'
import {_defineTokens} from '../../../lib/_defineTokens'
import {_fromEntries} from '../../../lib/_fromEntries'
import type {_DTCGColorValue} from '../../../lib/dtcg/types'
import type {TokenGroup} from '../../../lib/types'
import type {Hue, Tint} from '../../../types'

/** @public */
export const paletteTokens = _defineTokens({
  color: _defineTokenGroup({
    $type: 'color',
    palette: {
      black: {$value: _toColorValue(color.black.hex)},
      white: {$value: _toColorValue(color.white.hex)},
      ...(_fromEntries(
        HUES.map((hue) => [
          hue,
          {
            ..._fromEntries(
              TINTS.map((tint) => [tint, {$value: _toColorValue(color[hue][tint].hex)}]),
            ),
          } satisfies TokenGroup<Tint>,
        ]),
      ) satisfies TokenGroup<Hue>),
    },
  }),
})

function _toColorValue(color: string): _DTCGColorValue {
  const [r, g, b] = _hexToRgb(color)

  return {
    colorSpace: 'srgb',
    components: [r / 255, g / 255, b / 255],
    hex: color,
  }
}

function _hexToRgb(hex: string): [number, number, number] {
  const [r, g, b] = hex.match(/^#([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/)?.slice(1) ?? []

  if (!r || !g || !b) {
    throw new Error(`Invalid hex color: ${hex}`)
  }

  return [parseInt(r, 16), parseInt(g, 16), parseInt(b, 16)]
}
