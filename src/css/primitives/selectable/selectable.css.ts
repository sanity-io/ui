import {ELEMENT_TONES, type ElementTone} from '@sanity/ui/theme'

import {_fromEntries} from '../../_fromEntries'
import {_style} from '../../_style.css'
import {layers} from '../../layers.css'
import {vars} from '../../vars.css'

export const root: string = _style(layers.primitives, {
  backgroundColor: vars.color.bg,
  color: vars.color.fg,

  selectors: {
    'button.&': {
      WebkitFontSmoothing: 'inherit',
      appearance: 'none',
      outline: 'none',
      font: 'inherit',
      textAlign: 'inherit',
      border: 0,
      // See https://caniuse.com/?search=width%3A%20stretch
      width: ['-moz-available', '-webkit-fill-available', 'stretch'],
    },

    'a.&': {
      outline: 'none',
      textDecoration: 'none',
    },
  },
})

export const tones: Record<ElementTone, string> = {
  ..._fromEntries(
    ELEMENT_TONES.map((t) => {
      const tinted = vars.color.tinted[t]
      const focused = vars.color.solid.primary
      const disabled = vars.color.tinted.default

      return [
        t,
        _style(layers.primitives, {
          'vars': {
            [vars.color.bg]: tinted.bg[0],
            [vars.color.border]: tinted.border[1],
            [vars.color.fg]: tinted.fg[2],
            [vars.color.muted.bg]: tinted.bg[1],
            [vars.color.muted.fg]: tinted.fg[3],
          },

          '@media': {
            '(hover: hover)': {
              selectors: {
                '&:not([data-pressed]):not([data-selected]):not([data-focused]):not([data-disabled]):not(:active):not(:focus):hover':
                  {
                    vars: {
                      [vars.color.bg]: tinted.bg[1],
                      [vars.color.border]: tinted.border[2],
                      [vars.color.fg]: tinted.fg[1],
                      [vars.color.muted.bg]: tinted.bg[2],
                      [vars.color.muted.fg]: tinted.fg[4],
                    },
                  },
              },
            },
          },

          'selectors': {
            // selected
            '&:not([data-disabled]):active, &:not([data-disabled])[aria-pressed="true"], &:not([data-disabled])[data-selected]':
              {
                vars: {
                  [vars.color.bg]: tinted.bg[2],
                  [vars.color.border]: tinted.border[4],
                  [vars.color.fg]: tinted.fg[0],
                  [vars.color.muted.bg]: tinted.bg[3],
                  [vars.color.muted.fg]: tinted.fg[4],
                },
              },

            // focused
            '&:not([data-disabled]):focus, &:not([data-disabled])[data-focused]': {
              vars: {
                [vars.color.bg]: focused.bg[0],
                [vars.color.border]: focused.border[1],
                [vars.color.fg]: focused.fg[0],
                [vars.color.muted.bg]: focused.bg[1],
                [vars.color.muted.fg]: focused.fg[3],
              },
            },

            // disabled
            '&[data-disabled]': {
              vars: {
                [vars.color.bg]: disabled.bg[0],
                [vars.color.border]: disabled.border[1],
                [vars.color.fg]: disabled.border[4],
                [vars.color.muted.bg]: disabled.bg[1],
                [vars.color.muted.fg]: disabled.border[4],
              },
            },
          },
        }),
      ]
    }),
  ),
}
