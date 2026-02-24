import {system} from '@sanity/ui-tokens/system'
import {createTheme} from '@vanilla-extract/css'

import {_fromEntries} from '../_fromEntries'
import {_layers} from '../layers.css'
import {_paletteVars} from './_palette.css'
import {_tokenTreeToCSSTokens} from './_tokenTreeToCSSTokens.css'
import {borderVars} from './border.css'
import {focusRingVars} from './focusRing.css'

const collection = system.collections.input
const tokens = collection.modes.default[collection.namespace]
const vars = {
  border: borderVars,
  focusRing: focusRingVars,
}

export const [inputVarsClassName, inputVars] = createTheme(
  {
    '@layer': _layers.vars,
    ..._tokenTreeToCSSTokens(tokens, vars),
  },
  'vars',
)
