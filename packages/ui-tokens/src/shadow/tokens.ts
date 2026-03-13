import {_colorAlias} from '../color/lib/_colorAlias'
import {_defineTokenGroup} from '../lib/_defineTokenGroup'
import {_defineTokens} from '../lib/_defineTokens'
import type {_DTCGShadowValue} from '../lib/dtcg/types'
import type {TokenScale} from '../lib/types'
import type {Shadow} from '../types'

/** @public */
export const shadowTokens = _defineTokens({
  shadow: _defineTokenGroup({
    $type: 'shadow',
    0: {
      $value: {
        color: {colorSpace: 'srgb', components: [0, 0, 0], alpha: 0},
        offsetX: {value: 0, unit: 'px'},
        offsetY: {value: 0, unit: 'px'},
        blur: {value: 0, unit: 'px'},
        spread: {value: 0, unit: 'px'},
      } satisfies _DTCGShadowValue,
    },
    1: buildShadow({umbra: [0, 0, 0, 0], penumbra: [0, 0, 0, 0], ambient: [0, 0, 0, 0]}),
    2: buildShadow({umbra: [0, 2, 3, -1], penumbra: [0, 4, 6, 0], ambient: [0, 1, 12, 1]}),
    3: buildShadow({umbra: [0, 7, 8, -4], penumbra: [0, 12, 17, 2], ambient: [0, 5, 22, 4]}),
    4: buildShadow({umbra: [0, 9, 11, -5], penumbra: [0, 18, 28, 2], ambient: [0, 7, 34, 6]}),
    5: buildShadow({umbra: [0, 11, 15, -7], penumbra: [0, 24, 38, 3], ambient: [0, 9, 46, 8]}),
  }) satisfies TokenScale<Shadow, 'shadow'>,
})

/**
 * offsetX, offsetY, blur, spread
 */
type BoxShadow = [number, number, number, number]

function buildShadow(options: {umbra: BoxShadow; penumbra: BoxShadow; ambient: BoxShadow}): {
  $value: _DTCGShadowValue[]
} {
  const {umbra, penumbra, ambient} = options

  return {
    $value: [
      {
        color: _colorAlias('{color.shadow.outline}').$value,
        offsetX: {value: 0, unit: 'px'},
        offsetY: {value: 0, unit: 'px'},
        blur: {value: 0, unit: 'px'},
        // spread: '{card.outline}',
        spread: {value: 0.5, unit: 'px'},
      },
      {
        color: _colorAlias('{color.shadow.umbra}').$value,
        offsetX: {value: umbra[0], unit: 'px'},
        offsetY: {value: umbra[1], unit: 'px'},
        blur: {value: umbra[2], unit: 'px'},
        spread: {value: umbra[3], unit: 'px'},
      },
      {
        color: _colorAlias('{color.shadow.penumbra}').$value,
        offsetX: {value: penumbra[0], unit: 'px'},
        offsetY: {value: penumbra[1], unit: 'px'},
        blur: {value: penumbra[2], unit: 'px'},
        spread: {value: penumbra[3], unit: 'px'},
      },
      {
        color: _colorAlias('{color.shadow.ambient}').$value,
        offsetX: {value: ambient[0], unit: 'px'},
        offsetY: {value: ambient[1], unit: 'px'},
        blur: {value: ambient[2], unit: 'px'},
        spread: {value: ambient[3], unit: 'px'},
      },
    ],
  }
}
