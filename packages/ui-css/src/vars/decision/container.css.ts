import {containerTokens} from '@sanity/ui-tokens/decision/container'
import {createTheme} from '@vanilla-extract/css'

import {_layers} from '../../layers.css'
import {_toCSSTokens} from '../../lib/css-tokens/_toCSSTokens'
import type {CSSVars} from '../../lib/css-tokens/types'

const _vars = {}
const _cssTokens = _toCSSTokens(containerTokens, _vars, 'vars/decision/container')
const _theme = createTheme({'@layer': _layers.vars, ..._cssTokens})

export const containerVarsClassName = _theme[0]
export const containerVars: CSSVars<typeof _cssTokens> = _theme[1]
