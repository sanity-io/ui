import {shadowTokens} from '@sanity/ui-tokens/shadow'
import {createTheme} from '@vanilla-extract/css'

import {_layers} from '../layers.css'
import {_toCSSTokens} from '../lib/css-tokens/_toCSSTokens'
import type {CSSVars} from '../lib/css-tokens/types'
import {borderVars} from './border.css'
import {cardVars} from './card.css'
import {colorVars} from './color.css'

// console.log('shadow.css')

const _vars = {...colorVars, ...borderVars, ...cardVars}
const _cssTokens = _toCSSTokens(shadowTokens, _vars)
const _theme = createTheme({'@layer': _layers.vars, ..._cssTokens}, 'vars')

export const shadowVarsClassName = _theme[0]
export const shadowVars: CSSVars<typeof _cssTokens> = _theme[1]
