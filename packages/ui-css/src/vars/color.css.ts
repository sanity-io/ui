import {colorTokens} from '@sanity/ui-tokens/color'
import {createTheme, createThemeContract} from '@vanilla-extract/css'

import {_layers} from '../layers.css'
import {_toCSSTokens} from '../lib/css-tokens/_toCSSTokens'
import type {CSSVars} from '../lib/css-tokens/types'
import {_cardToneVars} from './_cardTone.css'

// console.log('color.css')

const _vars = {..._cardToneVars}
const _cssTokens = _toCSSTokens(colorTokens, _vars, false)

export const colorVars: CSSVars<typeof _cssTokens> = createThemeContract(_cssTokens)

export const colorVarsClassName = createTheme(
  colorVars,
  {
    '@layer': _layers.vars,
    ..._toCSSTokens(colorTokens, {color: {..._vars.color, ...colorVars.color}}, true),
  },
  'vars',
)
