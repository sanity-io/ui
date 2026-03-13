import {spin} from '../../keyframes/spinner.css'
import {_layers} from '../../layers.css'
import {_style} from '../../lib/css/_style.css'

export const root: string = _style(_layers.primitive, {}, '')

export const spinnerIcon: string = _style(
  _layers.primitive,
  {
    animation: `${spin} 500ms linear infinite`,
  },
  'icon',
)
