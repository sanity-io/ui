import {css} from 'styled-components'

import {BadgeStyleProps} from './types'

export const badgeBaseStyle = css`
  background-color: var(--card-bg-color);
  cursor: default;

  &:not([hidden]) {
    display: inline-block;
    vertical-align: top;
  }
`

export function badgeToneStyle(props: BadgeStyleProps): ReturnType<typeof css> {
  const {$tone} = props

  return css`
    --card-bg-color: var(--card-badge-${$tone}-bg-color);
    --card-fg-color: var(--card-badge-${$tone}-fg-color);
  `
}
