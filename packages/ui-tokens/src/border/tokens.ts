import {_defineTokenGroup} from '../lib/_defineTokenGroup'
import {_defineTokens} from '../lib/_defineTokens'
import {_px} from '../lib/_px'
import type {TokenScale} from '../lib/types'
import type {BorderWidth} from '../types'

/** @public */
export const borderTokens = _defineTokens({
  border: _defineTokenGroup({
    $type: 'dimension',
    0: _px(0, {scopes: ['stroke/float', 'effect/float']}),
    1: _px(0.5, {scopes: ['stroke/float', 'effect/float']}),
    2: _px(1, {scopes: ['stroke/float', 'effect/float']}),
  }) satisfies TokenScale<BorderWidth, 'dimension'>,
})
