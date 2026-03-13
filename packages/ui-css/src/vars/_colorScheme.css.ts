import {_colorSchemeTokens} from '@sanity/ui-tokens/color/_colorScheme'
import {COLOR_SCHEMES} from '@sanity/ui-tokens/constants'
import {createTheme, createThemeContract} from '@vanilla-extract/css'

import {_layers} from '../layers.css'
import {_fromEntries} from '../lib/_fromEntries'
import {_toCSSTokens} from '../lib/css-tokens/_toCSSTokens'
import {paletteVars} from './palette.css'

// console.log('_colorScheme.css')

const _vars = {...paletteVars}
const _cssTokens = _toCSSTokens(_colorSchemeTokens.light, _vars)

/** @internal */
export const _colorSchemeVars = createThemeContract(_cssTokens)

/** @internal */
export const _colorSchemeVarsClassNames = _fromEntries(
  COLOR_SCHEMES.map((variant) => {
    const tokens = _colorSchemeTokens[variant]
    const className = createTheme(
      _colorSchemeVars,
      {
        '@layer': _layers.vars,
        ..._toCSSTokens(tokens, _vars),
      },
      `${variant}-vars`,
    )

    return [variant, className]
  }),
)
