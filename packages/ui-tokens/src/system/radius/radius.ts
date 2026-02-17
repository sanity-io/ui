import {_fromEntries} from '../_fromEntries'
import {_px} from '../_px'
import type {SanityDimensionToken} from '../_sanity/schema'
import type {TokenCollection} from '../types'
import type {Radius} from './types'

export const RADIUS_NAMESPACE = 'radius'

export interface RadiusCollectionTokens {
  [RADIUS_NAMESPACE]: Record<Radius, SanityDimensionToken>
}

export type RadiusCollection = TokenCollection<
  typeof RADIUS_NAMESPACE,
  'default',
  RadiusCollectionTokens
>

export const radiusCollection: RadiusCollection = {
  namespace: RADIUS_NAMESPACE,
  title: 'Radius',
  modes: {
    default: {
      [RADIUS_NAMESPACE]: {
        0: _px(0, {scopes: ['corner/radius']}),
        1: _px(1, {scopes: ['corner/radius']}),
        2: _px(3, {scopes: ['corner/radius']}),
        3: _px(7, {scopes: ['corner/radius']}),
        4: _px(11, {scopes: ['corner/radius']}),
        5: _px(15, {scopes: ['corner/radius']}),
        6: _px(23, {scopes: ['corner/radius']}),

        full: _px(9999, {scopes: ['corner/radius']}),
      },
    },
  },
}
