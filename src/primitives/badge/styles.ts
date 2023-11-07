import {ThemeProps} from '../../styles'
import {CSSObject} from '../../types/styled'
import {BadgeStyleProps} from './types'

export function badgeStyle(props: BadgeStyleProps & ThemeProps): CSSObject {
  const {$mode, $tone, theme} = props
  const palette = theme.sanity.color[$mode === 'outline' ? 'muted' : 'solid']
  const color = palette[$tone] || palette.default

  return {
    '--card-fg-color': color.enabled.fg,

    backgroundColor: color.enabled.bg2,
    boxShadow: `inset 0 0 0 1px ${color.enabled.border}`,
    cursor: 'default',

    '&:not([hidden])': {
      display: 'inline-block',
    },
  }
}
