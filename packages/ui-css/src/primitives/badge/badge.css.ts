import {createVar, fallbackVar} from '@vanilla-extract/css'

import {_layers} from '../../layers.css'
import {_style} from '../../lib/css/_style.css'
import {vars} from '../../vars'
import {_fontVars} from '../_font/_font.css'
import {root as buttonRoot} from '../button/button.css'
import {root as selectableRoot} from '../selectable/selectable.css'

const _vars = {
  color: {
    bg: createVar('badge-color-bg'),
    fg: createVar('badge-color-fg'),
  },
}

export const root: string = _style(
  _layers.primitive,
  {
    backgroundColor: _vars.color.bg,
    color: _vars.color.fg,
    whiteSpace: 'nowrap',

    vars: {
      [_vars.color.bg]: vars.color.tinted.bg[2],
      [_vars.color.fg]: vars.color.tinted.fg[3],

      // Text override slots
      [_fontVars.color.fg]: _vars.color.fg,
      [_fontVars.color.muted.bg]: _vars.color.bg,
      [_fontVars.color.muted.fg]: _vars.color.fg,
    },

    selectors: {
      [`:where(${buttonRoot}, ${selectableRoot}) &`]: {
        vars: {
          [_fontVars.color.fg]: 'inherit',
          [_fontVars.color.muted.bg]: 'inherit',
          [_fontVars.color.muted.fg]: 'inherit',

          [_vars.color.bg]: fallbackVar(_fontVars.color.muted.bg, vars.color.muted.bg),
          [_vars.color.fg]: fallbackVar(_fontVars.color.muted.fg, vars.color.muted.fg),
        },
      },
    },
  },
  '',
)
