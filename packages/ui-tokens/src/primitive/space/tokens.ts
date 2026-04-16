import {_defineTokenGroup} from '../../lib/_defineTokenGroup'
import {_defineTokens} from '../../lib/_defineTokens'
import {_px} from '../../lib/_px'
import {_rem} from '../../lib/_rem'
import type {TokenScale} from '../../lib/types'
import type {Space} from '../../types'

/** @public */
export const spaceTokens = _defineTokens({
  space: _defineTokenGroup({
    $type: 'dimension',
    0: _rem(0, {scopes: ['gap']}),
    1: _rem(4, {scopes: ['gap']}),
    2: _rem(8, {scopes: ['gap']}),
    3: _rem(12, {scopes: ['gap']}),
    4: _rem(20, {scopes: ['gap']}),
    5: _rem(32, {scopes: ['gap']}),
    6: _rem(52, {scopes: ['gap']}),
    7: _rem(84, {scopes: ['gap']}),
    8: _rem(136, {scopes: ['gap']}),
    9: _rem(220, {scopes: ['gap']}),
  }) satisfies TokenScale<Space, 'dimension'>,
})
