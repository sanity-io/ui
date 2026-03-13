import {ELEMENT_TONES} from '@sanity/ui-tokens/constants'
import {elementToneTokens} from '@sanity/ui-tokens/element/tone'
import {createTheme, createThemeContract} from '@vanilla-extract/css'

import {_layers} from '../../layers.css'
import {_fromEntries} from '../../lib/_fromEntries'
import {_toCSSTokens} from '../../lib/css-tokens/_toCSSTokens'
import {_cardToneVars} from '../card/tone.css'
import {_colorSchemeVars} from '../color/scheme.css'

const _vars = {
  color: {
    ..._cardToneVars.color,
  },
}

const _cssTokens = _toCSSTokens(elementToneTokens.default, _vars, false)

/** @internal */
export const elementToneVars = createThemeContract(_cssTokens)

/** @internal */
export const elementToneClassNames = _fromEntries(
  ELEMENT_TONES.map((variant) => {
    const tokens = elementToneTokens[variant]

    const className = createTheme(
      elementToneVars,
      {
        '@layer': _layers.vars,
        ..._toCSSTokens(tokens, _vars),
      },
      `variant-${variant}`,
    )

    return [variant, className]
  }),
)
