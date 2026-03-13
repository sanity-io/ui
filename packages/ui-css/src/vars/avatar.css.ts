import {avatarTokens} from '@sanity/ui-tokens/avatar'
import {createTheme} from '@vanilla-extract/css'

import {_layers} from '../layers.css'
import {_toCSSTokens} from '../lib/css-tokens/_toCSSTokens'
import type {CSSVars} from '../lib/css-tokens/types'
import {borderVars} from './border.css'
import {colorVars} from './color.css'
import {focusVars} from './focus.css'
import {radiusVars} from './radius.css'

// console.log('avatar.css')

const _vars = {
  ...borderVars,
  ...colorVars,
  ...focusVars,
  ...radiusVars,
}
const _cssTokens = _toCSSTokens(avatarTokens, _vars)

const _theme = createTheme(
  {
    '@layer': _layers.vars,
    ..._cssTokens,
  },
  'vars',
)

export const avatarVarsClassName = _theme[0]
export const avatarVars: CSSVars<typeof _cssTokens> = _theme[1]
