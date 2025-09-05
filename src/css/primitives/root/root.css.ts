import {_style} from '../../_style.css'
import {layers} from '../../layers.css'

export const _root: string = _style(layers.primitives, {
  containerType: 'inline-size',
  WebkitFontSmoothing: 'antialiased',

  selectors: {
    'html.&': {
      MozTextSizeAdjust: 'none',
      WebkitTextSizeAdjust: 'none',
      textSizeAdjust: 'none',
    },

    'div.&': {
      position: 'relative',
    },
  },
})
