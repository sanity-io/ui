import {system} from '@sanity/ui-tokens/system'
import {createTheme, createThemeContract} from '@vanilla-extract/css'

import {_entries} from '../_entries'
import {_fromEntries} from '../_fromEntries'
import {_layers} from '../layers.css'
import {_coreVars} from './_core.css'
import {_paletteVars} from './_palette.css'
import {_tokenTreeToCSSTokens} from './_tokenTreeToCSSTokens.css'

const collection = system.collections._colorScheme
const vars = {
  _core: _coreVars,
}

const _tokens = _tokenTreeToCSSTokens(collection.modes.light._colorScheme, vars)

/** @internal */
export const _colorSchemeVars = createThemeContract(_tokens)

/** @internal */
export const _colorSchemeVarsClassNames = _fromEntries(
  _entries(collection.modes).map(([modeKey, modeTokens]) => {
    const tokens = modeTokens[collection.namespace]
    const className = createTheme(
      _colorSchemeVars,
      {
        '@layer': _layers.vars,
        ..._tokenTreeToCSSTokens(tokens, vars),
      },
      `${modeKey}-vars`,
    )

    return [modeKey, className]
  }),
)
