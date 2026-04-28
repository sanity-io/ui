import {_colorSchemeTokens} from '@sanity/ui-tokens/build/color/_scheme'
import {COLOR_SCHEMES} from '@sanity/ui-tokens/constants'
import {createTheme, createThemeContract} from '@vanilla-extract/css'

import {_layers} from '../../../layers.css'
import {_fromEntries} from '../../../lib/_fromEntries'
import {_globalStyle} from '../../../lib/css/_globalStyle.css'
import {_style} from '../../../lib/css/_style.css'
import {_toCSSTokens} from '../../../lib/css-tokens/_toCSSTokens'
import {paletteVars} from '../../primitive/color/palette.css'

const _vars = {
  color: {
    ...paletteVars.color,
  },
}

const _cssTokens = _toCSSTokens(_colorSchemeTokens.light, _vars, 'vars/build/color/_scheme', false)

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
        ..._toCSSTokens(
          tokens,
          {
            ..._vars,
            color: {..._vars.color, ..._colorSchemeVars.color},
          },
          'vars/build/color/_scheme',
        ),
      },
      `variant-${variant}`,
    )

    return [variant, className]
  }),
)

_globalStyle(_layers.vars, `.${_colorSchemeVarsClassNames.light}`, {
  colorScheme: _colorSchemeVars.colorScheme,
})
_globalStyle(_layers.vars, `.${_colorSchemeVarsClassNames.dark}`, {
  colorScheme: _colorSchemeVars.colorScheme,
})
