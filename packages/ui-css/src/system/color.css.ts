import {system} from '@sanity/ui-tokens/system'
import {createTheme, createThemeContract} from '@vanilla-extract/css'

import {_fromEntries} from '../_fromEntries'
import {_layers} from '../layers.css'
import {_cardToneVars} from './_cardTone.css'
import {_paletteVars} from './_palette.css'
import {_tokenTreeToCSSTokens} from './_tokenTreeToCSSTokens.css'

const collection = system.collections.color
const tokens = collection.modes.default[collection.namespace]
const vars = {
  _cardTone: _cardToneVars,
}

const _tokens = _tokenTreeToCSSTokens(collection.modes.default.color, vars, false)

export const colorVars = createThemeContract(_tokens)

export const colorVarsClassName = createTheme(
  colorVars,
  {
    '@layer': _layers.vars,
    ..._tokenTreeToCSSTokens(tokens, {...vars, color: colorVars}),
  },
  'vars',
)
