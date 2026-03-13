import {paletteTokens} from '@sanity/ui-tokens/color/palette'
import {createTheme} from '@vanilla-extract/css'

import {_layers} from '../layers.css'
import {_toCSSTokens} from '../lib/css-tokens/_toCSSTokens'
import type {CSSVars} from '../lib/css-tokens/types'

const _vars = {}
const _cssTokens = _toCSSTokens(paletteTokens, _vars)
const _theme = createTheme({'@layer': _layers.vars, ..._cssTokens})

/** @public */
export const paletteVarsClassName = _theme[0]

/** @public */
export const paletteVars: CSSVars<typeof _cssTokens> = _theme[1]
