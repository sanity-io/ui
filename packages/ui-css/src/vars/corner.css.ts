import {cornerTokens} from '@sanity/ui-tokens/corner'
import {createTheme} from '@vanilla-extract/css'

import {_layers} from '../layers.css'
import {_toCSSTokens} from '../lib/css-tokens/_toCSSTokens'
import type {CSSVars} from '../lib/css-tokens/types'

// console.log('corner.css')

const _vars = {}
const _cssTokens = _toCSSTokens(cornerTokens, _vars)
const _theme = createTheme({'@layer': _layers.vars, ..._cssTokens}, 'vars')

export const cornerVarsClassName = _theme[0]
export const cornerVars: CSSVars<typeof _cssTokens> = _theme[1]
