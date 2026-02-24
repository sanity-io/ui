import {_style} from '../../_style.css'
import {_layers} from '../../layers.css'
import {vars} from '../../vars.css'

export const root: string = _style(
  _layers.component,
  {
    outline: 'none',
  },
  '',
)

export const divider: string = _style(
  _layers.component,
  {
    // height: vars.card.border.width,
    height: vars.border[1],
    border: 0,
    backgroundColor: vars.color.border,
    margin: 0,
  },
  'divider',
)
