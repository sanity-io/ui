import {css} from 'styled-components'
import {Theme} from '../../theme'
import {BadgeMode, BadgeTone} from './types'

export function badge({mode, theme, tone}: {mode: BadgeMode; theme: Theme; tone: BadgeTone}) {
  const palette = theme.sanity.color[mode === 'outline' ? 'muted' : 'solid']
  const color = palette[tone] || palette.default

  return css`
    background-color: ${color.enabled.bg};
    color: ${color.enabled.fg};
    box-shadow: inset 0 0 0 1px ${color.enabled.border};

    &&:not([hidden]) {
      display: inline-block;
    }
  `
}
