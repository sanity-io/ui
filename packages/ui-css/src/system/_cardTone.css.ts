import {system} from '@sanity/ui-tokens/system'
import {createTheme, createThemeContract} from '@vanilla-extract/css'

import {_entries} from '../_entries'
import {_fromEntries} from '../_fromEntries'
import {_layers} from '../layers.css'
import {_colorSchemeVars} from './_colorScheme.css'
import {_coreVars} from './_core.css'
import {_paletteVars} from './_palette.css'
import {_tokenTreeToCSSTokens} from './_tokenTreeToCSSTokens.css'

const collection = system.collections._cardTone
const vars = {
  _colorScheme: _colorSchemeVars,
}

const _tokens = _tokenTreeToCSSTokens(collection.modes.default[collection.namespace], vars, false)

/** @internal */
export const _cardToneVars = createThemeContract(_tokens)

/** @internal */
export const _cardToneClassNames = _fromEntries(
  _entries(collection.modes).map(([modeKey, modeTokens]) => {
    const tokens = modeTokens[collection.namespace]

    const className = createTheme(
      _cardToneVars,
      {
        '@layer': _layers.vars,
        ..._tokenTreeToCSSTokens(tokens, vars),
      },
      `${modeKey}-vars`,
    )

    return [modeKey, className]
  }),
)
