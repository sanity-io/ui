import {_buttonModeTokens} from '@sanity/ui-tokens/button/_buttonMode'
import {BUTTON_MODES} from '@sanity/ui-tokens/constants'
import {createTheme, createThemeContract} from '@vanilla-extract/css'

import {_layers} from '../../layers.css'
import {_fromEntries} from '../../lib/_fromEntries'
import {_toCSSTokens} from '../../lib/css-tokens/_toCSSTokens'
import {borderVars} from '../../vars/border.css'
import {colorVars} from '../../vars/color.css'
import {shadowVars} from '../../vars/shadow.css'

// console.log('buttonMode.css')

const _vars = {...borderVars, ...colorVars, ...shadowVars}
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
