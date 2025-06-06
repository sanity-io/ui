import {_style} from '../../_style.css'
import {layers} from '../../layers.css'

export const _root = _style(layers.primitives, {
  WebkitFontSmoothing: 'antialiased',
  // minWidth: `${320 / 16}rem`, // 320px

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
