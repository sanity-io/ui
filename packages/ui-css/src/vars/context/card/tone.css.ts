import {CARD_TONES} from '@sanity/ui-tokens/constants'
import {_cardToneTokens} from '@sanity/ui-tokens/context/card/tone'
import {createTheme, createThemeContract} from '@vanilla-extract/css'

import {_layers} from '../../../layers.css'
import {_fromEntries} from '../../../lib/_fromEntries'
import {_toCSSTokens} from '../../../lib/css-tokens/_toCSSTokens'
import {_colorSchemeVars} from '../../build/color/scheme.css'

const _vars = {
  color: {
    ..._colorSchemeVars,
  },
}

const _cssTokens = _toCSSTokens(_cardToneTokens.default, _vars, false)

/** @internal */
export const _cardToneVars = createThemeContract(_cssTokens)

/** @internal */
export const _cardToneClassNames = _fromEntries(
  CARD_TONES.map((variant) => {
    const tokens = _cardToneTokens[variant]

    const className = createTheme(
      _cardToneVars,
      {
        '@layer': _layers.vars,
        ..._toCSSTokens(tokens, {
          color: {
            ..._colorSchemeVars.color,
            ..._cardToneVars.color,
          },
        }),
      },
      `variant-${variant}`,
    )

    return [variant, className]
  }),
)
