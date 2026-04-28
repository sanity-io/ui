import {colorTokens} from '@sanity/ui-tokens/semantic/color'
import {createTheme, createThemeContract} from '@vanilla-extract/css'

import {_layers} from '../../layers.css'
import {_toCSSTokens} from '../../lib/css-tokens/_toCSSTokens'
import type {CSSVars} from '../../lib/css-tokens/types'
import {_cardToneVars} from '../context/card/_tone.css'
import {elementToneVars} from '../context/element/tone.css'

const _vars = {
  color: {
    ..._cardToneVars.color,
    ...elementToneVars.color,
  },
}

const _cssTokens = _toCSSTokens(colorTokens, _vars, 'vars/semantic/color', false)

export const colorVars: CSSVars<typeof _cssTokens> = createThemeContract(_cssTokens)

export const colorVarsClassName = createTheme(colorVars, {
  '@layer': _layers.vars,
  ..._toCSSTokens(
    colorTokens,
    {
      color: {
        ..._cardToneVars.color,
        ...elementToneVars.color,
        ...colorVars.color,
      },
    },
    'vars/semantic/color',
  ),
})
