import {avatarTokens} from '@sanity/ui-tokens/avatar'
import {createTheme, createThemeContract} from '@vanilla-extract/css'

import {_layers} from '../layers.css'
import {_toCSSTokens} from '../lib/css-tokens/_toCSSTokens'
import type {CSSVars} from '../lib/css-tokens/types'
import {borderVars} from './border.css'
import {colorVars} from './color.css'
import {focusVars} from './focus.css'
import {radiusVars} from './radius.css'

const _vars = {
  ...borderVars,
  ...colorVars,
  ...focusVars,
  ...radiusVars,
}
const _cssTokens = _toCSSTokens(avatarTokens, _vars)

export const avatarVars: CSSVars<typeof _cssTokens> = createThemeContract(_cssTokens)

export const avatarVarsClassName = createTheme(avatarVars, {
  '@layer': _layers.vars,
  ..._toCSSTokens(avatarTokens, {..._vars, ...avatarVars}),
})
