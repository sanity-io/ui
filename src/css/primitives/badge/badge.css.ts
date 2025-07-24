import {ELEMENT_TONES} from '@sanity/ui/theme'
import {createSprinkles, defineProperties} from '@vanilla-extract/sprinkles'

import {_fromEntries} from '../../_fromEntries'
import {_style} from '../../_style.css'
import {layers} from '../../layers.css'
import {vars} from '../../vars.css'

export const root: string = _style(layers.primitives, {
  backgroundColor: vars.color.bg,
  color: vars.color.fg,
  whiteSpace: 'nowrap',
})

const colorProperties = defineProperties({
  'properties': {
    tone: _fromEntries(
      ELEMENT_TONES.map((t) => [
        t,
        {
          vars: {
            [vars.color.bg]: vars.color.tinted[t].bg[2],
            [vars.color.border]: vars.color.tinted[t].border[2],
            [vars.color.fg]: vars.color.tinted[t].fg[3],
          },
        },
      ]),
    ),
  },
  '@layer': layers.primitives,
})

export const sprinkles = createSprinkles(colorProperties)
