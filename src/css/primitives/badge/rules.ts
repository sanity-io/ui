import {THEME_COLOR_STATE_TONES} from '@sanity/ui/theme'
import type {Rules} from '../../types'
import {varNames} from '../../varNames'
import {vars} from '../../vars'

export const badgeRules: Rules = {
  badge: {
    backgroundColor: vars.color.bg[1],
    color: vars.color.fg[1],
    verticalAlign: 'top',
  },

  ...THEME_COLOR_STATE_TONES.reduce(
    (acc, tone) => ({
      ...acc,
      [`badge-${tone}`]: {
        [varNames.color.bg[1]]: vars.color.tinted[tone].bg[1],
        [varNames.color.bg[2]]: vars.color.tinted[tone].bg[2],
        [varNames.color.bg[3]]: vars.color.tinted[tone].bg[3],
        [varNames.color.bg[4]]: vars.color.tinted[tone].bg[4],
        // [varNames.color.badge.bg]: vars.color.badge[tone].bg,
        // [varNames.color.badge.dot]: vars.color.badge[tone].dot,
        // [varNames.color.badge.fg]: vars.color.badge[tone].fg,
        // [varNames.color.badge.icon]: vars.color.badge[tone].icon,
      },
    }),
    {} as Rules,
  ),
}
