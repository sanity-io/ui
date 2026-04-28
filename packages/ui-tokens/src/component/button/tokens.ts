import {_defineToken} from '../../lib/_defineToken'
import {_defineTokenGroup} from '../../lib/_defineTokenGroup'
import {_defineTokens} from '../../lib/_defineTokens'
import {_colorAlias} from '../../lib/color/_colorAlias'

/** @public */
export const buttonTokens = _defineTokens({
  button: {
    border: {
      width: _defineToken({
        $type: 'dimension',
        $value: '{border.1}',
        $extensions: {
          'io.sanity': {
            scopes: ['stroke/float'],
          },
        },
      }),
    },
    focusRing: _defineToken({
      $type: 'shadow',
      $value: [
        {
          color: '{color.bg}',
          offsetX: {value: 0, unit: 'px'},
          offsetY: {value: 0, unit: 'px'},
          blur: {value: 0, unit: 'px'},
          spread: {value: 1, unit: 'px'},
        },
        {
          color: '{color.focusRing}',
          offsetX: {value: 0, unit: 'px'},
          offsetY: {value: 0, unit: 'px'},
          blur: {value: 0, unit: 'px'},
          spread: {value: 2, unit: 'px'},
        },
      ],
    }),
  },
})
