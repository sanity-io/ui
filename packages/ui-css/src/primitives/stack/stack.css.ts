import {_style} from '../../_style.css'
import {layers} from '../../layers.css'

export const root: string = _style(layers.primitives, {
  gridTemplateColumns: 'minmax(0, 1fr)',
})
