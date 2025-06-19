import {_style} from '../../_style.css'
import {layers} from '../../layers.css'

export const root: string = _style(layers.primitives, {
  display: 'block',
  width: 0,
  height: 0,
  position: 'absolute',
  overflow: ['hidden', 'clip'],
})
