import {_layers} from '../../layers.css'
import {_style} from '../../lib/css/_style.css'
import {vars} from '../../vars'
import {root as buttonRoot} from '../button/button.css'
import {root as selectableRoot} from '../selectable/selectable.css'

export const root: string = _style(
  _layers.primitive,
  {
    backgroundColor: vars.color.muted.bg,
    color: vars.color.muted.fg,
    whiteSpace: 'nowrap',

    vars: {
      [vars.color.bg]: vars.color.muted.bg,
      [vars.color.border]: vars.color.muted.border,
      [vars.color.fg]: vars.color.muted.fg,
      [vars.color.muted.bg]: vars.color.tinted.bg[2],
      [vars.color.muted.border]: vars.color.tinted.border[2],
      [vars.color.muted.fg]: vars.color.tinted.fg[3],
    },

    selectors: {
      [`:where(${buttonRoot}, ${selectableRoot}) &`]: {
        vars: {
          [vars.color.bg]: 'inherit',
          [vars.color.border]: 'inherit',
          [vars.color.fg]: 'inherit',
          [vars.color.muted.bg]: 'inherit',
          [vars.color.muted.border]: 'inherit',
          [vars.color.muted.fg]: 'inherit',
        },
      },
    },
  },
  '',
)
