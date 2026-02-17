import {_fromEntries} from '../_fromEntries'
import {_px} from '../_px'
import type {SanityDimensionToken} from '../_sanity/schema'
import type {TokenCollection} from '../types'
import type {BorderWidth} from './types'

export const BORDER_NAMESPACE = 'border'

export interface BorderCollectionTokens {
  [BORDER_NAMESPACE]: Record<BorderWidth, SanityDimensionToken>
}

export type BorderCollection = TokenCollection<
  typeof BORDER_NAMESPACE,
  'default',
  BorderCollectionTokens
>

export const borderCollection: BorderCollection = {
  namespace: BORDER_NAMESPACE,
  title: 'Border',
  modes: {
    default: {
      [BORDER_NAMESPACE]: {
        0: _px(0, {scopes: ['stroke/float', 'effect/float']}),
        1: _px(0.5, {scopes: ['stroke/float', 'effect/float']}),
        2: _px(1, {scopes: ['stroke/float', 'effect/float']}),
      },
    },
  },
}
