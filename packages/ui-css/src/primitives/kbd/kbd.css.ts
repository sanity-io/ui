import {_style} from '../../_style.css'
import {_layers} from '../../layers.css'
import {vars} from '../../vars.css'

export const root: string = _style(
  _layers.primitive,
  {
    backgroundColor: vars.color.bg,
    // font: 'inherit',
    verticalAlign: 'top',
  },
  '',
)
