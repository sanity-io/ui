import {cssVars} from '../../theme/lib/theme/color/cssVariables/createCssVars'
import {CSSObject} from '../../types/styled'
import {BadgeStyleProps} from './types'

export function badgeStyle(props: BadgeStyleProps): CSSObject {
  const {$mode, $tone} = props

  return {
    // backgroundColor: color.enabled.bg,
    backgroundColor: $mode === 'outline' ? cssVars[$tone].bg_base : cssVars[$tone].bg_accent,
    color:
      $mode === 'outline' ? cssVars[$tone].text_primary : cssVars[$tone].border_accent_inverted,
    boxShadow: `inset 0 0 0 1px ${cssVars[$tone].bg_base}`,
    cursor: 'default',

    '&:not([hidden])': {
      display: 'inline-block',
    },
  }
}
