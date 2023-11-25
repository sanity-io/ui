import {CSSObject} from '@sanity/ui/theme'
import {ThemeProps} from '../../styles'
import {BadgeStyleProps} from './types'

export function badgeStyle(props: BadgeStyleProps & ThemeProps): CSSObject {
  const {$tone, theme} = props
  const color = theme.sanity.color.badge?.[$tone] || theme.sanity.color.muted[$tone].enabled

  return {
    '--card-bg-color': color.bg,
    '--card-fg-color': color.fg,

    backgroundColor: 'var(--card-bg-color)',
    cursor: 'default',

    '&:not([hidden])': {
      display: 'inline-block',
    },
  }
}
