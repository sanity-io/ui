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
  const _color = theme.color[scheme].badge
  const _tone = _color.tones[tone] || _color.tones.default
  const _mode = _tone.modes[mode] || _tone.modes.default

  return css`
    display: inline-block;
    background-color: ${_mode.bg};
    color: ${_mode.fg};
    box-shadow: inset 0 0 0 1px ${_mode.border};
  `
}
