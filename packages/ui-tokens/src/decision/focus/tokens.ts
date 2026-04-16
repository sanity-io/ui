import {_defineToken} from '../../lib/_defineToken'
import {_defineTokenGroup} from '../../lib/_defineTokenGroup'
import {_defineTokens} from '../../lib/_defineTokens'
import type {_DTCGShadowValue} from '../../lib/dtcg/types'

/** @public */
export const focusTokens = _defineTokens({
  focus: {
    ring: _defineTokenGroup({
      $type: 'shadow',
      default: {
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
        ] satisfies _DTCGShadowValue[],
      },
      inset: {
        $value: {
          color: '{color.focusRing}',
          offsetX: {value: 0, unit: 'px'},
          offsetY: {value: 0, unit: 'px'},
          blur: {value: 0, unit: 'px'},
          spread: {value: 1, unit: 'px'},
          inset: true,
        } satisfies _DTCGShadowValue,
      },
    }),
  },
})
