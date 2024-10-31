import {THEME_COLOR_STATE_TONES} from '@sanity/ui/theme'
import type {Rules} from '../../types'
import {varNames} from '../../varNames'
import {vars} from '../../vars'

export const badgeRules: Rules = {
  badge: {
    backgroundColor: vars.color.badge.bg,
    color: vars.color.badge.fg,
    verticalAlign: 'top',
  },

  ...THEME_COLOR_STATE_TONES.reduce(
    (acc, tone) => ({
      ...acc,
      [`badge-${tone}`]: {
        [varNames.color.badge.bg]: vars.color.badge[tone].bg,
        [varNames.color.badge.dot]: vars.color.badge[tone].dot,
        [varNames.color.badge.fg]: vars.color.badge[tone].fg,
        [varNames.color.badge.icon]: vars.color.badge[tone].icon,
      },
    }),
    {} as Rules,
  ),
}
