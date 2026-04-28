import {radiusTokens} from '@sanity/ui-tokens/primitive/radius'
import {createTheme} from '@vanilla-extract/css'

import {_layers} from '../../layers.css'
import {_toCSSTokens} from '../../lib/css-tokens/_toCSSTokens'
import type {CSSVars} from '../../lib/css-tokens/types'

const _vars = {}
const _cssTokens = _toCSSTokens(radiusTokens, _vars, 'vars/primitive/radius')
const _theme = createTheme({'@layer': _layers.vars, ..._cssTokens})

export const radiusVarsClassName = _theme[0]
export const radiusVars: CSSVars<typeof _cssTokens> = _theme[1]
