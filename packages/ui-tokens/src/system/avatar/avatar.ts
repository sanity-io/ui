import type {DTCGShadowToken} from '../_dtcg/schema'
import {_px} from '../_px'
import type {SanityDimensionToken} from '../_sanity/schema'
import type {TokenCollection} from '../types'
import type {AvatarSize} from './types'

export const AVATAR_NAMESPACE = 'avatar'

export interface AvatarCollectionTokens {
  [AVATAR_NAMESPACE]: {
    focusRing: DTCGShadowToken
    outline: DTCGShadowToken
    radius: SanityDimensionToken
    scale: Record<
      AvatarSize,
      {
        distance: SanityDimensionToken
        size: SanityDimensionToken
      }
    >
  }
}

export type AvatarCollection = TokenCollection<
  typeof AVATAR_NAMESPACE,
  'default',
  AvatarCollectionTokens
>

export const avatarCollection: AvatarCollection = {
  namespace: AVATAR_NAMESPACE,
  title: 'Avatar',
  modes: {
    default: {
      [AVATAR_NAMESPACE]: {
        focusRing: {
          $type: 'shadow',
          $value: '{focusRing.default}',
        },
        outline: {
          $type: 'shadow',
          $value: {
            color: '{color.bg}',
            offsetX: {value: 0, unit: 'px'},
            offsetY: {value: 0, unit: 'px'},
            blur: {value: 0, unit: 'px'},
            spread: '{border.1}',
          },
        },
        radius: {
          $type: 'dimension',
          $value: '{radius.full}',
          $extensions: {
            'io.sanity': {
              scopes: ['corner/radius'],
            },
          },
        },
        scale: {
          0: {
            distance: _px(-2),
            size: _px(19),
          },
          1: {
            distance: _px(-4),
            size: _px(25),
          },
          2: {
            distance: _px(-8),
            size: _px(33),
          },
          3: {
            distance: _px(-8),
            size: _px(49),
          },
        },
      },
    },
  },
}
