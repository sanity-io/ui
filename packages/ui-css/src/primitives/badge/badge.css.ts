import {fallbackVar} from '@vanilla-extract/css'

import {_layers} from '../../layers.css'
import {_style} from '../../lib/css/_style.css'
import {vars} from '../../vars'
import {root as buttonRoot} from '../button/button.css'
import {root as selectableRoot} from '../selectable/selectable.css'

export const root: string = _style(
  _layers.primitive,
  {
    backgroundColor: vars.badge.color.bg,
    color: vars.badge.color.fg,
    whiteSpace: 'nowrap',

    vars: {
      [vars.badge.color.bg]: vars.color.tinted.bg[2],
      [vars.badge.color.fg]: vars.color.tinted.fg[3],

      // Text override slots
      [vars.font.color.fg]: vars.badge.color.fg,
      [vars.font.color.muted.bg]: vars.badge.color.bg,
      [vars.font.color.muted.fg]: vars.badge.color.fg,
    },

    selectors: {
      [`:where(${buttonRoot}, ${selectableRoot}) &`]: {
        vars: {
          [vars.font.color.fg]: 'inherit',
          [vars.font.color.muted.bg]: 'inherit',
          [vars.font.color.muted.fg]: 'inherit',

          [vars.badge.color.bg]: fallbackVar(vars.font.color.muted.bg, vars.color.muted.bg),
          [vars.badge.color.fg]: fallbackVar(vars.font.color.muted.fg, vars.color.muted.fg),
        },
      },
    },
  },
  '',
)
