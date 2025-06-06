import {THEME_COLOR_STATE_TONES} from '@sanity/ui/theme'

import {_fromEntries} from '../../_fromEntries'
import {_style} from '../../_style.css'
import {layers} from '../../layers.css'
import {vars} from '../../vars.css'

export const root = _style(layers.primitives, {
  backgroundColor: vars.color.bg,
  color: vars.color.fg,
  whiteSpace: 'nowrap',
})

export const tones = {
  ..._fromEntries(
    THEME_COLOR_STATE_TONES.map((t) => [
      t,
      _style(layers.primitives, {
        vars: {
          [vars.color.bg]: vars.color.tinted[t].bg[2],
          [vars.color.border]: vars.color.tinted[t].border[2],
          [vars.color.fg]: vars.color.tinted[t].fg[3],
        },
      }),
    ]),
  ),
}
