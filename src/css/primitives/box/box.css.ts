import {_style} from '../../_style.css'
import {layers} from '../../layers.css'
import {vars} from '../../vars.css'

export const root: string = _style(layers.primitives, {
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
})

export const muted: string = _style(layers.primitives, {
  backgroundColor: vars.color.bg,

  transition: 'background-color 100ms ease-in-out',

  selectors: {
    '&&': {
      vars: {
        [vars.color.bg]: vars.color.muted.bg,
      },
    },
  },
})
