import {_cardToneTokens} from '@sanity/ui-tokens/color/_cardTone'
import {CARD_TONES} from '@sanity/ui-tokens/constants'
import {createTheme, createThemeContract} from '@vanilla-extract/css'

import {_layers} from '../layers.css'
import {_fromEntries} from '../lib/_fromEntries'
import {_toCSSTokens} from '../lib/css-tokens/_toCSSTokens'
import {_colorSchemeVars} from './_colorScheme.css'

// console.log('_cardTone.css')

const _vars = {..._colorSchemeVars}
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
        ..._toCSSTokens(tokens, {..._vars, ..._cardToneVars}),
      },
      `${variant}-vars`,
    )

    return [variant, className]
  }),
)
