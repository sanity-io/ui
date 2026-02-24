import {_style} from '../../_style.css'
import {spin} from '../../keyframes/spinner.css'
import {_layers} from '../../layers.css'

export const root: string = _style(_layers.primitive, {}, '')

export const spinnerIcon: string = _style(
  _layers.primitive,
  {
    animation: `${spin} 500ms linear infinite`,
  },
  'icon',
)
