import {css} from 'styled-components'
import {ColorSchemeKey, Theme} from '../../theme'
import {BadgeMode, BadgeTone} from './types'

export function badge({
  mode,
  scheme,
  theme,
  tone,
}: {
  mode: BadgeMode
  scheme: ColorSchemeKey
  theme: Theme
  tone: BadgeTone
}) {
  const color = theme.color[scheme].badge.tones[tone].modes[mode]

  return css`
    display: inline-block;
    background-color: ${color.bg};
    color: ${color.fg};
    box-shadow: inset 0 0 0 1px ${color.border};
  `
}
