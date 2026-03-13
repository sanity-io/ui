import {_layers} from '../../layers.css'
import {_style} from '../../lib/css/_style.css'
import {vars} from '../../vars'

export const root: string = _style(
  _layers.primitive,
  {
    backgroundColor: vars.color.bg,
    verticalAlign: 'top',
  },
  '',
)
