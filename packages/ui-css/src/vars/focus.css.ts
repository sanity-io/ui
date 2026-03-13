import {focusTokens} from '@sanity/ui-tokens/focus'
import {createTheme} from '@vanilla-extract/css'

import {_layers} from '../layers.css'
import {_toCSSTokens} from '../lib/css-tokens/_toCSSTokens'
import type {CSSVars} from '../lib/css-tokens/types'
import {colorVars} from './color.css'

const _vars = {...colorVars}
const _cssTokens = _toCSSTokens(focusTokens, _vars)
const _theme = createTheme({'@layer': _layers.vars, ..._cssTokens})

export const focusVarsClassName = _theme[0]
export const focusVars: CSSVars<typeof _cssTokens> = _theme[1]
