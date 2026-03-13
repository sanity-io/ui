import {_layers} from '../../layers.css'
import {_style} from '../../lib/css/_style.css'
// import {root as elementToneRoot} from '../../props/elementTone/elementTone.css'
import {vars} from '../../vars'

export const root: string = _style(
  _layers.primitive,
  {
    backgroundColor: vars.color.muted.bg,
    color: vars.color.muted.fg,
    whiteSpace: 'nowrap',

    // selectors: {
    //   [`&:not(${elementToneRoot} &)`]: {
    //     vars: {
    //       [vars.color.muted.bg]: vars.color.tinted.bg[2],
    //       [vars.color.muted.border]: vars.color.tinted.border[2],
    //       [vars.color.muted.fg]: vars.color.tinted.fg[3],
    //     },
    //   },
    // },

    vars: {
      // [vars.color.bg]: vars.color.muted.bg,
      [vars.color.border]: vars.color.muted.border,
      [vars.color.fg]: vars.color.muted.fg,
    },
  },
  '',
)
