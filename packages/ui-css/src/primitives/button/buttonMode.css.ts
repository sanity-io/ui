import {_buttonModeTokens} from '@sanity/ui-tokens/component/button/mode'
import {BUTTON_MODES} from '@sanity/ui-tokens/constants'
import {createTheme, createThemeContract} from '@vanilla-extract/css'

import {_layers} from '../../layers.css'
import {_fromEntries} from '../../lib/_fromEntries'
import {_toCSSTokens} from '../../lib/css-tokens/_toCSSTokens'
import {elementToneVars} from '../../vars/context/element/tone.css'
import {borderVars} from '../../vars/decision/border.css'
import {shadowVars} from '../../vars/primitive/shadow.css'
import {colorVars} from '../../vars/semantic/color.css'

const _vars = {
  ...borderVars,
  color: {
    ...colorVars.color,
    ...elementToneVars.color,
    tinted: {
      ...colorVars.color.tinted,
      ...elementToneVars.color.tinted,
    },
    solid: {
      ...colorVars.color.solid,
      ...elementToneVars.color.solid,
    },
  },
  ...shadowVars,
}

const _cssTokens = _toCSSTokens(_buttonModeTokens.default, _vars, false)

/** @internal */
export const _buttonModeVars = createThemeContract(_cssTokens)

/** @internal */
export const _buttonMode = _fromEntries(
  BUTTON_MODES.map((variant) => {
    const className = createTheme(
      _buttonModeVars,
      {
        '@layer': _layers.primitive,
        ..._toCSSTokens(_buttonModeTokens[variant], _vars),
      },
      variant,
    )

    return [variant, className]
  }),
)
