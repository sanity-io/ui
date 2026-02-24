import {system} from '@sanity/ui-tokens/system'
import {createTheme, createThemeContract} from '@vanilla-extract/css'

import {_entries} from '../../_entries'
import {_fromEntries} from '../../_fromEntries'
import {_layers} from '../../layers.css'
import {_colorSchemeVars} from '../../system/_colorScheme.css'
import {_coreVars} from '../../system/_core.css'
import {_paletteVars} from '../../system/_palette.css'
import {_tokenTreeToCSSTokens} from '../../system/_tokenTreeToCSSTokens.css'
import {borderVars} from '../../system/border.css'
import {colorVars} from '../../system/color.css'
import {shadowVars} from '../../system/shadow.css'

const vars = {
  border: borderVars,
  color: colorVars,
  shadow: shadowVars,
}

const collection = system.collections._buttonMode

const themeContractDef = _tokenTreeToCSSTokens(collection.modes.default._buttonMode, vars)

/** @internal */
export const _buttonModeVars = createThemeContract(themeContractDef)

/** @internal */
export const _buttonMode = _fromEntries(
  _entries(collection.modes).map(([modeKey, modeTokens]) => {
    const className = createTheme(
      _buttonModeVars,
      {
        '@layer': _layers.primitive,
        ..._tokenTreeToCSSTokens(modeTokens[collection.namespace], vars),
      },
      modeKey,
    )

    return [modeKey, className]
  }),
)
