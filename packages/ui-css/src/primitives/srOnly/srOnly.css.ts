import {_style} from '../../_style.css'
import {_layers} from '../../layers.css'

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
