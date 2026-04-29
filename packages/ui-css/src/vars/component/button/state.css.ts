import {buttonStateTokens} from '@sanity/ui-tokens/component/button/state'
import {createTheme} from '@vanilla-extract/css'

import {_layers} from '../../../layers.css'
import {_toCSSTokens} from '../../../lib/css-tokens/_toCSSTokens'
import type {CSSVars} from '../../../lib/css-tokens/types'
import {_cardToneVars} from '../../context/card/_tone.css'
import {elementToneVars} from '../../context/element/tone.css'
import {borderVars} from '../../decision/border.css'
import {colorVars} from '../../semantic/color.css'

const _vars = {
  ..._cardToneVars,
  ...borderVars,
  color: {
    ...colorVars.color,
    ...elementToneVars.color,
  },
}

const _cssTokens = _toCSSTokens(buttonStateTokens, _vars, 'vars/component/button/state', false)
const _theme = createTheme({'@layer': _layers.vars, ..._cssTokens})

export const buttonStateVarsClassName = _theme[0]
export const buttonStateVars: CSSVars<typeof _cssTokens> = _theme[1]
