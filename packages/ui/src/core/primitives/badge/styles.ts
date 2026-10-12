import {css} from 'styled-components'

import {CSSObject} from '../../../theme/system/css'
import {BadgeStyleProps} from './types'

export const badgeBaseStyle = css`
  background-color: var(--card-bg-color);
  cursor: default;

  &:not([hidden]) {
    display: inline-block;
    vertical-align: top;
  }
`

export function badgeToneStyle(props: BadgeStyleProps): CSSObject {
  const {$tone} = props

  return {
    '--card-bg-color': `var(--card-badge-${$tone}-bg-color)`,
    '--card-fg-color': `var(--card-badge-${$tone}-fg-color)`,
  }
}
