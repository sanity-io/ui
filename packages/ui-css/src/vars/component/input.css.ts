import {inputTokens} from '@sanity/ui-tokens/component/input'
import {createTheme} from '@vanilla-extract/css'

import {_layers} from '../../layers.css'
import {_toCSSTokens} from '../../lib/css-tokens/_toCSSTokens'
import type {CSSVars} from '../../lib/css-tokens/types'
import {borderVars} from '../decision/border.css'
import {focusVars} from '../decision/focus.css'
import {colorVars} from '../semantic/color.css'

const _vars = {
  ...borderVars,
  ...focusVars,
  color: {
    ...colorVars.color,
  },
}

const _cssTokens = _toCSSTokens(inputTokens, _vars)
const _theme = createTheme({'@layer': _layers.vars, ..._cssTokens})

export const inputVarsClassName = _theme[0]
export const inputVars: CSSVars<typeof _cssTokens> = _theme[1]
