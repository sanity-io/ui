import {_layers} from '../../layers.css'
import {_style} from '../../lib/css/_style.css'

export const root: string = _style(
  _layers.primitive,
  {
    gridTemplateColumns: 'minmax(0, 1fr)',
  },
  '',
)
