import {_layers} from '../../layers.css'
import {_style} from '../../lib/css/_style.css'
import {vars} from '../../vars'

export const panel = _style(
  _layers.component,
  {
    outline: 'none',

    selectors: {
      '&:focus:focus-visible': {
        boxShadow: vars.focus.ring.inset,
      },
    },
  },
  'panel',
)
