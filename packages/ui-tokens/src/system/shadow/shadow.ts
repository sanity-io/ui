import type {DTCGShadowToken} from '../_dtcg/schema'
import {_fromEntries} from '../_fromEntries'
import {_px} from '../_px'
import type {TokenCollection} from '../types'
import type {Shadow} from './types'

export const SHADOW_NAMESPACE = 'shadow'

export interface ShadowCollectionTokens {
  [SHADOW_NAMESPACE]: Record<Shadow, DTCGShadowToken>
}

export type ShadowCollection = TokenCollection<
  typeof SHADOW_NAMESPACE,
  'default',
  ShadowCollectionTokens
>

export const shadowCollection: ShadowCollection = {
  namespace: SHADOW_NAMESPACE,
  title: 'Shadow',
  modes: {
    default: {
      [SHADOW_NAMESPACE]: {
        0: {
          $type: 'shadow',
          $value: {
            color: {
              colorSpace: 'srgb',
              components: [0, 0, 0],
              alpha: 0,
            },
            offsetX: {value: 0, unit: 'px'},
            offsetY: {value: 0, unit: 'px'},
            blur: {value: 0, unit: 'px'},
            spread: {value: 0, unit: 'px'},
          },
        },
        1: buildShadow({umbra: [0, 0, 0, 0], penumbra: [0, 0, 0, 0], ambient: [0, 0, 0, 0]}),
        2: buildShadow({umbra: [0, 2, 3, -1], penumbra: [0, 4, 6, 0], ambient: [0, 1, 12, 1]}),
        3: buildShadow({umbra: [0, 7, 8, -4], penumbra: [0, 12, 17, 2], ambient: [0, 5, 22, 4]}),
        4: buildShadow({umbra: [0, 9, 11, -5], penumbra: [0, 18, 28, 2], ambient: [0, 7, 34, 6]}),
        5: buildShadow({umbra: [0, 11, 15, -7], penumbra: [0, 24, 38, 3], ambient: [0, 9, 46, 8]}),
      },
    },
  },
}

/**
 * offsetX, offsetY, blur, spread
 */
export type BoxShadow = [number, number, number, number]

function buildShadow(options: {
  umbra: BoxShadow
  penumbra: BoxShadow
  ambient: BoxShadow
}): DTCGShadowToken {
  const {umbra, penumbra, ambient} = options

  return {
    $type: 'shadow',
    $value: [
      {
        color: '{color.shadow.outline}',
        offsetX: {value: 0, unit: 'px'},
        offsetY: {value: 0, unit: 'px'},
        blur: {value: 0, unit: 'px'},
        spread: '{card.outline}',
      },
      {
        color: '{color.shadow.umbra}',
        offsetX: {value: umbra[0], unit: 'px'},
        offsetY: {value: umbra[1], unit: 'px'},
        blur: {value: umbra[2], unit: 'px'},
        spread: {value: umbra[3], unit: 'px'},
      },
      {
        color: '{color.shadow.penumbra}',
        offsetX: {value: penumbra[0], unit: 'px'},
        offsetY: {value: penumbra[1], unit: 'px'},
        blur: {value: penumbra[2], unit: 'px'},
        spread: {value: penumbra[3], unit: 'px'},
      },
      {
        color: '{color.shadow.ambient}',
        offsetX: {value: ambient[0], unit: 'px'},
        offsetY: {value: ambient[1], unit: 'px'},
        blur: {value: ambient[2], unit: 'px'},
        spread: {value: ambient[3], unit: 'px'},
      },
    ],
  }
}
