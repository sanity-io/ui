import {buttonTokens} from '@sanity/ui-tokens/button'
import {createTheme} from '@vanilla-extract/css'

import {_layers} from '../layers.css'
import {_toCSSTokens} from '../lib/css-tokens/_toCSSTokens'
import type {CSSVars} from '../lib/css-tokens/types'
import {borderVars} from './border.css'
import {colorVars} from './color.css'

// console.log('button.css')

const _vars = {...borderVars, ...colorVars}
const _cssTokens = _toCSSTokens(buttonTokens, _vars)
const _theme = createTheme({'@layer': _layers.vars, ..._cssTokens}, 'vars')

export const buttonVarsClassName = _theme[0]
export const buttonVars: CSSVars<typeof _cssTokens> = _theme[1]
