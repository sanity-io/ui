import {inputColorTokens} from '@sanity/ui-tokens/component/input/color'
import {createTheme} from '@vanilla-extract/css'

import {_layers} from '../../../layers.css'
import {_fromEntries} from '../../../lib/_fromEntries'
import {_toCSSTokens} from '../../../lib/css-tokens/_toCSSTokens'
import type {CSSVars} from '../../../lib/css-tokens/types'
import {_cardToneVars} from '../../context/card/_tone.css'
import {elementToneVars} from '../../context/element/tone.css'

const _vars = {
  ..._cardToneVars,
  color: {
    ...elementToneVars.color,
  },
}

const _cssTokens = _toCSSTokens(inputColorTokens, _vars, 'vars/component/input/color')
const _theme = createTheme({'@layer': _layers.vars, ..._cssTokens})

export const inputColorVarsClassName = _theme[0]
export const inputColorVars: CSSVars<typeof _cssTokens> = _theme[1]
