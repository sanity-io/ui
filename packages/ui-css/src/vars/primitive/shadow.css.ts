import {shadowTokens} from '@sanity/ui-tokens/primitive/shadow'
import {createTheme} from '@vanilla-extract/css'

import {_layers} from '../../layers.css'
import {_toCSSTokens} from '../../lib/css-tokens/_toCSSTokens'
import type {CSSVars} from '../../lib/css-tokens/types'
import {cardVars} from '../component/card.css'
import {borderVars} from '../decision/border.css'
import {colorVars} from '../semantic/color.css'

const _vars = {...colorVars, ...borderVars, ...cardVars}
const _cssTokens = _toCSSTokens(shadowTokens, _vars, 'vars/primitive/shadow')
const _theme = createTheme({'@layer': _layers.vars, ..._cssTokens})

export const shadowVarsClassName = _theme[0]
export const shadowVars: CSSVars<typeof _cssTokens> = _theme[1]
