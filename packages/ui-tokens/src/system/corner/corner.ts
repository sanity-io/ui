import {_fromEntries} from '../_fromEntries'
import {_px} from '../_px'
import type {SanityNumberToken} from '../_sanity/schema'
import type {TokenCollection} from '../types'

export const CORDER_NAMESPACE = 'corner'

export interface CornerCollectionTokens {
  [CORDER_NAMESPACE]: {
    shape: {
      squircle: SanityNumberToken
    }
  }
}

export type CornerCollection = TokenCollection<
  typeof CORDER_NAMESPACE,
  'default',
  CornerCollectionTokens
>

export const cornerCollection: CornerCollection = {
  namespace: CORDER_NAMESPACE,
  title: 'Corner',
  modes: {
    default: {
      [CORDER_NAMESPACE]: {
        shape: {
          squircle: {
            $type: 'number',
            $value: 1.36,
            $extensions: {
              'io.sanity': {
                scopes: ['corner/shape'],
              },
            },
          },
        },
      },
    },
  },
}
