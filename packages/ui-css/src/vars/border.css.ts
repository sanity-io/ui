import {borderTokens} from '@sanity/ui-tokens/border'
import {createTheme} from '@vanilla-extract/css'

import {_layers} from '../layers.css'
import {_toCSSTokens} from '../lib/css-tokens/_toCSSTokens'
import type {CSSVars} from '../lib/css-tokens/types'

// console.log('border.css')

const _vars = {}
const _cssTokens = _toCSSTokens(borderTokens, _vars)
const _theme = createTheme({'@layer': _layers.vars, ..._cssTokens}, 'vars')

export const borderVarsClassName = _theme[0]
export const borderVars: CSSVars<typeof _cssTokens> = _theme[1]
