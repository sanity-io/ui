import {_style} from '../../_style.css'
import {_layers} from '../../layers.css'
import {vars} from '../../vars.css'

export const root = _style(
  _layers.primitive,
  {
    selectors: {
      'button.&': {
        WebkitFontSmoothing: 'inherit',
        appearance: 'none',
        outline: 'none',
        font: 'inherit',
        textAlign: 'inherit',
        border: 'none',
        inlineSize: 'stretch',
      },

      'iframe.&': {
        border: 'none',
      },

      'ul.&, ol.&': {
        listStyle: 'none',
      },
    },
  },
  '',
)

export const muted = _style(
  _layers.primitive,
  {
    backgroundColor: vars.color.bg,

    selectors: {
      '&&': {
        vars: {
          [vars.color.bg]: vars.color.muted.bg,
        },
      },
    },
  },
  'muted',
)
