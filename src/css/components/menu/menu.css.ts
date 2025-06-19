import {_style} from '../../_style.css'
import {layers} from '../../layers.css'
import {vars} from '../../vars.css'

export const root: string = _style(layers.components, {
  outline: 'none',
})

export const divider: string = _style(layers.components, {
  height: `1px`,
  border: 0,
  backgroundColor: vars.color.border,
  margin: 0,
})
