import {_defineToken} from '../lib/_defineToken'
import {_defineTokenGroup} from '../lib/_defineTokenGroup'
import {_defineTokens} from '../lib/_defineTokens'
import {_px} from '../lib/_px'
import type {TokenScale} from '../lib/types'
import type {AvatarSize} from '../types'

/** @public */
export const avatarTokens = _defineTokens({
  avatar: {
    focusRing: _defineToken({
      $type: 'shadow',
      $value: '{focus.ring.default}',
    }),
    outline: _defineToken({
      $type: 'shadow',
      $value: {
        color: '{color.bg}',
        offsetX: {value: 0, unit: 'px'},
        offsetY: {value: 0, unit: 'px'},
        blur: {value: 0, unit: 'px'},
        spread: '{border.1}',
      },
    }),
    radius: _defineToken({
      $type: 'dimension',
      $value: '{radius.full}',
      $extensions: {
        'io.sanity': {
          scopes: ['corner/radius'],
        },
      },
    }),
    scale: _defineTokenGroup({
      $type: 'dimension',
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
    } satisfies TokenScale<AvatarSize, 'dimension'>),
  },
})
