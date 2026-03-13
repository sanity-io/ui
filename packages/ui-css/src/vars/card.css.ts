import {cardTokens} from '@sanity/ui-tokens/card'
import {createTheme} from '@vanilla-extract/css'

import {_layers} from '../layers.css'
import {_toCSSTokens} from '../lib/css-tokens/_toCSSTokens'
import type {CSSVars} from '../lib/css-tokens/types'
import {borderVars} from './border.css'
import {colorVars} from './color.css'

const _vars = {
  ...borderVars,
  color: {
    ...colorVars.color,
  },
}

const _cssTokens = _toCSSTokens(cardTokens, _vars)
const _theme = createTheme({'@layer': _layers.vars, ..._cssTokens})

export const cardVarsClassName = _theme[0]
export const cardVars: CSSVars<typeof _cssTokens> = _theme[1]
