import {CSSObject} from 'styled-components'
import {ThemeProps} from '../../styles'
import {BadgeMode, BadgeTone} from './types'

export function badge(props: {mode: BadgeMode; tone: BadgeTone} & ThemeProps): CSSObject {
  const {mode, theme, tone} = props
  const palette = theme.sanity.color[mode === 'outline' ? 'muted' : 'solid']
  const color = palette[tone] || palette.default

  return {
    backgroundColor: color.enabled.bg,
    color: color.enabled.fg,
    boxShadow: `inset 0 0 0 1px ${color.enabled.border}`,

    '&:not([hidden])': {
      display: 'inline-block',
    },
  }
}
