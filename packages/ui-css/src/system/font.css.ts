import {system} from '@sanity/ui-tokens/system'
import {createTheme, createThemeContract} from '@vanilla-extract/css'

import {_fromEntries} from '../_fromEntries'
import {_layers} from '../layers.css'
import {_paletteVars} from './_palette.css'
import {_tokenTreeToCSSTokens} from './_tokenTreeToCSSTokens.css'

const collection = system.collections.font
const tokens = collection.modes.default[collection.namespace]
const vars = {}

const _tokens = _tokenTreeToCSSTokens(tokens, vars, false)

/** @internal */
export const fontVars = createThemeContract(_tokens)

export const fontVarsClassName = createTheme(
  fontVars,
  {
    '@layer': _layers.vars,
    ..._tokenTreeToCSSTokens(tokens, {...vars, font: fontVars}),
  },
  'vars',
)
