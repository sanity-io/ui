import {_defineToken} from '../lib/_defineToken'
import {_defineTokens} from '../lib/_defineTokens'

/** @public */
export const cardTokens = _defineTokens({
  card: {
    focusRing: _defineToken({
      $type: 'shadow',
      $value: {
        color: '{color.focusRing}',
        offsetX: {value: 0, unit: 'px'},
        offsetY: {value: 0, unit: 'px'},
        blur: {value: 0, unit: 'px'},
        spread: '{border.2}',
        inset: true,
      },
    }),
    outline: _defineToken({
      $type: 'dimension',
      $value: '{border.1}',
    }),
  },
})
