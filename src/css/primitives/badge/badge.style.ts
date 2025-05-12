import {THEME_COLOR_STATE_TONES} from '@sanity/ui/theme'

import {Style, StyleRules} from '../../types'
import {varNames} from '../../varNames'
import {vars} from '../../vars'

const primitive: StyleRules = {
  '.badge': {
    backgroundColor: vars.color.bg,
    color: vars.color.fg,
    verticalAlign: 'top',
  },
}

for (const tone of THEME_COLOR_STATE_TONES) {
  primitive[`.badge-${tone}`] = {
    [varNames.color.bg]: vars.color.tinted[tone].bg[4],
    [varNames.color.fg]: vars.color.tinted[tone].fg[1],
  }
}

export const badgeStyle: Style = {layers: {primitive}}
