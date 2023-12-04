import {CSSObject} from '@sanity/ui/theme'
import {BadgeStyleProps} from './types'

export function badgeStyle(props: BadgeStyleProps): CSSObject {
  const {$tone} = props

  return {
    '--card-bg-color': `var(--card-badge-${$tone}-bg-color)`,
    '--card-fg-color': `var(--card-badge-${$tone}-fg-color)`,

    backgroundColor: 'var(--card-bg-color)',
    cursor: 'default',

    '&:not([hidden])': {
      display: 'inline-block',
      verticalAlign: 'top',
    },
  }
}
