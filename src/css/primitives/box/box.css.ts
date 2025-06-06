import {_style} from '../../_style.css'
import {layers} from '../../layers.css'
import {vars} from '../../vars.css'

export const root = _style(layers.primitives, {
  selectors: {
    'iframe.&': {
      border: 'none',
    },

    'ul.&, ol.&': {
      listStyle: 'none',
    },
  },
})

export const muted = _style(layers.primitives, {
  backgroundColor: vars.color.muted.bg,
})
