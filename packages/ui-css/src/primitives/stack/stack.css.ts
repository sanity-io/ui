import {_style} from '../../_style.css'
import {_layers} from '../../layers.css'

export const root: string = _style(
  _layers.primitive,
  {
    gridTemplateColumns: 'minmax(0, 1fr)',
  },
  '',
)
