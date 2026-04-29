import {buttonModeTokens} from '@sanity/ui-tokens/component/button/mode'
import {BUTTON_MODES} from '@sanity/ui-tokens/constants'
import {createTheme, createThemeContract} from '@vanilla-extract/css'

import {_layers} from '../../../layers.css'
import {_fromEntries} from '../../../lib/_fromEntries'
import {_toCSSTokens} from '../../../lib/css-tokens/_toCSSTokens'
import {_cardToneVars} from '../../context/card/_tone.css'
import {elementToneVars} from '../../context/element/tone.css'
import {borderVars} from '../../decision/border.css'
import {shadowVars} from '../../primitive/shadow.css'
import {colorVars} from '../../semantic/color.css'
import {buttonSlotVars} from './slots.css'

const _vars = {
  ..._cardToneVars,
  ...borderVars,
  color: {
    ...colorVars.color,
    ...elementToneVars.color,
  },
  ...buttonSlotVars,
  ...shadowVars,
}

const _cssTokens = _toCSSTokens(
  buttonModeTokens.default,
  _vars,
  'vars/component/button/mode',
  false,
)

/** @internal */
export const buttonModeVars = createThemeContract(_cssTokens)

/** @internal */
export const buttonMode = _fromEntries(
  BUTTON_MODES.map((variant) => {
    const className = createTheme(
      buttonModeVars,
      {
        '@layer': _layers.primitive,
        ..._toCSSTokens(buttonModeTokens[variant], _vars, 'vars/component/button/mode'),
      },
      `variant-${variant}`,
    )

    return [variant, className]
  }),
)
