import {_layers} from '../../layers.css'
import {_style} from '../../lib/css/_style.css'

export const root: string = _style(
  _layers.primitive,
  {
    display: 'block',
    width: 0,
    height: 0,
    position: 'absolute',
    overflow: ['hidden', 'clip'],
  },
  '',
)
