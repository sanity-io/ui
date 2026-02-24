import {_style} from '../../_style.css'
import {_layers} from '../../layers.css'
import {vars} from '../../vars.css'

export const panel = _style(
  _layers.component,
  {
    outline: 'none',

    selectors: {
      '&:focus:focus-visible': {
        boxShadow: vars.focusRing.inset,
      },
    },
  },
  'panel',
)
