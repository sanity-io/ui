import {system} from '@sanity/ui-tokens/system'
import {createTheme} from '@vanilla-extract/css'

import {_layers} from '../layers.css'
import {_tokenTreeToCSSTokens} from './_tokenTreeToCSSTokens.css'

const collection = system.collections._palette
const tokens = collection.modes.default[collection.namespace]
const vars = {}

export const [
  /** @internal */
  _paletteVarsClassName,
  /** @internal */
  _paletteVars,
] = createTheme(
  {
    '@layer': _layers.vars,
    ..._tokenTreeToCSSTokens(tokens, vars),
  },
  'vars',
)
