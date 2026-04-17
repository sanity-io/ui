import {codeTokens} from '@sanity/ui-tokens/component/code'
import {createTheme} from '@vanilla-extract/css'

import {_layers} from '../../layers.css'
import {_toCSSTokens} from '../../lib/css-tokens/_toCSSTokens'
import type {CSSVars} from '../../lib/css-tokens/types'
import {_colorSchemeVars} from '../build/color/_scheme.css'

const _vars = {
  color: {
    ..._colorSchemeVars.color,
  },
}
const _cssTokens = _toCSSTokens(codeTokens, _vars)
const _theme = createTheme({'@layer': _layers.vars, ..._cssTokens})

export const codeVarsClassName = _theme[0]
export const codeVars: CSSVars<typeof _cssTokens> = _theme[1]
