import {_layers} from '../../layers.css'
import {_style} from '../../lib/css/_style.css'
import {vars} from '../../vars'

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
    height: vars.border[1],
    border: 0,
    backgroundColor: vars.color.border,
    margin: `0 calc(0px - ${vars.space[1]})`,
  },
  'divider',
)
