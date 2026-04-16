import {_defineTokenGroup} from '../../lib/_defineTokenGroup'
import {_defineTokens} from '../../lib/_defineTokens'
import {_px} from '../../lib/_px'
import type {TokenScale} from '../../lib/types'
import type {Radius} from '../../types'

/** @public */
export const radiusTokens = _defineTokens({
  radius: _defineTokenGroup({
    $type: 'dimension',
    0: _px(0, {scopes: ['corner/radius']}),
    1: _px(1, {scopes: ['corner/radius']}),
    2: _px(3, {scopes: ['corner/radius']}),
    3: _px(7, {scopes: ['corner/radius']}),
    4: _px(11, {scopes: ['corner/radius']}),
    5: _px(15, {scopes: ['corner/radius']}),
    6: _px(23, {scopes: ['corner/radius']}),
    full: _px(9999, {scopes: ['corner/radius']}),
  }) satisfies TokenScale<Radius, 'dimension'>,
})
