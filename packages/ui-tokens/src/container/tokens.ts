import {_defineTokenGroup} from '../lib/_defineTokenGroup'
import {_defineTokens} from '../lib/_defineTokens'
import {_rem} from '../lib/_rem'
import type {TokenScale} from '../lib/types'
import type {ContainerScale} from '../types'

/** @public */
export const containerTokens = _defineTokens({
  container: _defineTokenGroup({
    $type: 'dimension',

    0: _rem(320, {scopes: ['width']}),
    1: _rem(640, {scopes: ['width']}),
    2: _rem(960, {scopes: ['width']}),
    3: _rem(1280, {scopes: ['width']}),
    4: _rem(1600, {scopes: ['width']}),
    5: _rem(1920, {scopes: ['width']}),
  }) satisfies TokenScale<ContainerScale, 'dimension'>,
})
