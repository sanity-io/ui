import {selectableTokens} from '@sanity/ui-tokens/component/selectable'
import {createTheme} from '@vanilla-extract/css'

import {_layers} from '../../layers.css'
import {_toCSSTokens} from '../../lib/css-tokens/_toCSSTokens'
import type {CSSVars} from '../../lib/css-tokens/types'
import {_cardToneVars} from '../context/card/_tone.css'
import {elementToneVars} from '../context/element/tone.css'
import {colorVars} from '../semantic/color.css'

const _vars = {
  ..._cardToneVars,
  color: {
    ...colorVars.color,
    ...elementToneVars.color,
  },
}
const _cssTokens = _toCSSTokens(selectableTokens, _vars, 'vars/component/selectable')
const _theme = createTheme({'@layer': _layers.vars, ..._cssTokens})

export const selectableVarsClassName = _theme[0]
export const selectableVars: CSSVars<typeof _cssTokens> = _theme[1]
