import {spaceTokens} from '@sanity/ui-tokens/space'
import {createTheme} from '@vanilla-extract/css'

import {_layers} from '../layers.css'
import {_toCSSTokens} from '../lib/css-tokens/_toCSSTokens'
import type {CSSVars} from '../lib/css-tokens/types'

// console.log('space.css')

const _vars = {}
const _cssTokens = _toCSSTokens(spaceTokens, _vars)
const _theme = createTheme({'@layer': _layers.vars, ..._cssTokens}, 'vars')

export const spaceVarsClassName = _theme[0]
export const spaceVars: CSSVars<typeof _cssTokens> = _theme[1]
