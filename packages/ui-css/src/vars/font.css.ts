import {fontTokens} from '@sanity/ui-tokens/font'
import {createTheme, createThemeContract} from '@vanilla-extract/css'

import {_layers} from '../layers.css'
import {_toCSSTokens} from '../lib/css-tokens/_toCSSTokens'
import type {CSSVars} from '../lib/css-tokens/types'

const _vars = {}
const _cssTokens = _toCSSTokens(fontTokens, _vars, false)

export const fontVars: CSSVars<typeof _cssTokens> = createThemeContract(_cssTokens)

export const fontVarsClassName = createTheme(
  fontVars,
  {
    '@layer': _layers.vars,
    ..._toCSSTokens(fontTokens, {..._vars, ...fontVars}),
  },
  'vars',
)
