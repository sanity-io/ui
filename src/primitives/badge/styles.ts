import {mutableCardVariables} from '../../theme/lib/theme/color/cssVariables/cardVariables'
import {cssVars} from '../../theme/lib/theme/color/cssVariables/createCssVars'
import {CSSObject} from '../../types/styled'
import {BadgeStyleProps} from './types'

export function badgeStyle(props: BadgeStyleProps): CSSObject {
  const {$mode, $tone} = props

  return {
    backgroundColor: $mode === 'outline' ? cssVars[$tone]['bg-base'] : cssVars[$tone]['bg-tint'],
    [mutableCardVariables['fg-color']]: cssVars[$tone]['text-secondary'],
    boxShadow: $mode === 'outline' ? `inset 0 0 0 1px ${cssVars[$tone]['border-base']}` : undefined,
    cursor: 'default',

    '&:not([hidden])': {
      display: 'inline-block',
    },
  }
}
