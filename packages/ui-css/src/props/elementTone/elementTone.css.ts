import {COLOR_VARIANTS, ELEMENT_TONES, type ElementTone} from '@sanity/ui-tokens/system'

import {_fromEntries} from '../../_fromEntries'
import {_style} from '../../_style.css'
import {_layers} from '../../layers.css'
import {_cardToneVars} from '../../system/_cardTone.css'
import {vars} from '../../vars.css'

export const root = _style(
  _layers.prop,
  {
    // vars: {
    //   [vars.color.fg]: vars.color.tinted.fg[0],
    //   [vars.color.bg]: vars.color.tinted.bg[0],
    //   [vars.color.border]: vars.color.tinted.border[2],
    //   [vars.color.muted.bg]: vars.color.tinted.bg[1],
    //   [vars.color.muted.border]: vars.color.tinted.border[1],
    //   [vars.color.muted.fg]: vars.color.tinted.fg[4],
    // },
    // selectors: {
    //   [`&:not(& &)`]: {
    //     vars: {
    //       [vars.color.fg]: vars.color.tinted.fg[0],
    //       [vars.color.bg]: vars.color.tinted.bg[0],
    //       [vars.color.border]: vars.color.tinted.border[2],
    //       [vars.color.muted.bg]: vars.color.tinted.bg[1],
    //       [vars.color.muted.border]: vars.color.tinted.border[1],
    //       [vars.color.muted.fg]: vars.color.tinted.fg[4],
    //     },
    //   },
    // },
  },
  'elem',
)

export const options: Record<ElementTone, string | undefined> = {
  ..._fromEntries(
    ELEMENT_TONES.map((t) => {
      if (t === 'default') {
        // default element tone's vars are already defined by `system/color` vars
        return [t, undefined]
      }

      return [
        t,
        _style(
          _layers.vars,
          {
            selectors: {
              [`&:not(${root} &)`]: {
                vars: {
                  [vars.color.fg]: vars.color.tinted.fg[0],
                  [vars.color.bg]: vars.color.tinted.bg[0],
                  [vars.color.border]: vars.color.tinted.border[2],
                  [vars.color.muted.bg]: vars.color.tinted.bg[1],
                  [vars.color.muted.border]: vars.color.tinted.border[1],
                  [vars.color.muted.fg]: vars.color.tinted.fg[4],

                  ...COLOR_VARIANTS.reduce(
                    (acc, v) => ({
                      ...acc,
                      [vars.color[v].bg[0]]: vars.color[v][t].bg[0],
                      [vars.color[v].bg[1]]: vars.color[v][t].bg[1],
                      [vars.color[v].bg[2]]: vars.color[v][t].bg[2],
                      [vars.color[v].bg[3]]: vars.color[v][t].bg[3],
                      [vars.color[v].bg[4]]: vars.color[v][t].bg[4],
                      [vars.color[v].border[0]]: vars.color[v][t].border[0],
                      [vars.color[v].border[1]]: vars.color[v][t].border[1],
                      [vars.color[v].border[2]]: vars.color[v][t].border[2],
                      [vars.color[v].border[3]]: vars.color[v][t].border[3],
                      [vars.color[v].border[4]]: vars.color[v][t].border[4],
                      [vars.color[v].fg[0]]: vars.color[v][t].fg[0],
                      [vars.color[v].fg[1]]: vars.color[v][t].fg[1],
                      [vars.color[v].fg[2]]: vars.color[v][t].fg[2],
                      [vars.color[v].fg[3]]: vars.color[v][t].fg[3],
                      [vars.color[v].fg[4]]: vars.color[v][t].fg[4],
                    }),
                    {},
                  ),
                },
              },
            },
          },
          `${t}-vars`,
        ),
      ]
    }),
  ),
}
