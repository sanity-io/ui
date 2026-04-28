import {avatarColorTokens} from '@sanity/ui-tokens/component/avatar/color'
import {AVATAR_COLORS} from '@sanity/ui-tokens/constants'
import {createTheme, createThemeContract} from '@vanilla-extract/css'

import {_layers} from '../../../layers.css'
import {_fromEntries} from '../../../lib/_fromEntries'
import {_toCSSTokens} from '../../../lib/css-tokens/_toCSSTokens'
import {_colorSchemeVars} from '../../build/color/_scheme.css'

const _vars = {
  color: {
    ..._colorSchemeVars.color,
  },
}

const _cssTokens = _toCSSTokens(avatarColorTokens.gray, _vars, 'vars/component/avatar/color', false)

/** @internal */
export const avatarColorVars = createThemeContract(_cssTokens)

/** @internal */
export const avatarColorClassNames = _fromEntries(
  AVATAR_COLORS.map((variant) => {
    const tokens = avatarColorTokens[variant]

    const className = createTheme(
      avatarColorVars,
      {
        '@layer': _layers.vars,
        ..._toCSSTokens(tokens, _vars, 'vars/component/avatar/color'),
      },
      `variant-${variant}`,
    )

    return [variant, className]
  }),
)
