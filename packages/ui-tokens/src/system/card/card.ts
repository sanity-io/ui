import type {DTCGDimensionToken, DTCGShadowToken} from '../_dtcg/schema'
import {_fromEntries} from '../_fromEntries'
import {_px} from '../_px'
import type {TokenCollection} from '../types'

export const CARD_NAMESPACE = 'card'

export interface CardCollectionTokens {
  [CARD_NAMESPACE]: {
    focusRing: DTCGShadowToken
    outline: DTCGDimensionToken
  }
}

export type CardCollection = TokenCollection<typeof CARD_NAMESPACE, 'default', CardCollectionTokens>

export const cardCollection: CardCollection = {
  namespace: CARD_NAMESPACE,
  title: 'Card',
  modes: {
    default: {
      [CARD_NAMESPACE]: {
        focusRing: {
          $type: 'shadow',
          $value: {
            color: '{color.focusRing}',
            offsetX: {value: 0, unit: 'px'},
            offsetY: {value: 0, unit: 'px'},
            blur: {value: 0, unit: 'px'},
            spread: '{border.2}',
            inset: true,
          },
        },
        outline: {
          $type: 'dimension',
          $value: '{border.1}',
        },
      },
    },
  },
}
