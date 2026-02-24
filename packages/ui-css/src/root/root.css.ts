import {_style} from '../_style.css'
import {_layers} from '../layers.css'
import {vars} from '../vars.css'

export const _root: string = _style(
  _layers.primitive,
  {
    backgroundColor: vars.color.bg,
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
  },
  '',
)
