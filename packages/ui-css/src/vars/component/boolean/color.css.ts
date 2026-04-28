import {booleanColorTokens} from '@sanity/ui-tokens/component/boolean/color'
import {createTheme} from '@vanilla-extract/css'

import {_layers} from '../../../layers.css'
import {_toCSSTokens} from '../../../lib/css-tokens/_toCSSTokens'
import type {CSSVars} from '../../../lib/css-tokens/types'
import {elementToneVars} from '../../context/element/tone.css'
import {borderVars} from '../../decision/border.css'
import {colorVars} from '../../semantic/color.css'

const _vars = {
  ...borderVars,
  color: {
    ...colorVars.color,
    ...elementToneVars.color,
  },
}

const _cssTokens = _toCSSTokens(booleanColorTokens, _vars, 'vars/component/boolean/color', false)
const _theme = createTheme({'@layer': _layers.vars, ..._cssTokens})

export const booleanColorVarsClassName = _theme[0]
export const booleanColorVars: CSSVars<typeof _cssTokens> = _theme[1]
