import {_style} from '../../_style.css'
import {layers} from '../../layers.css'
import {vars} from '../../vars.css'

export const root: string = _style(layers.primitives, {
  boxShadow: `inset 0 0 0 0.5px ${vars.color.border}`,
  backgroundColor: vars.color.muted.bg,
  font: 'inherit',
  verticalAlign: 'top',

  selectors: {
    '&:not([hidden])': {
      display: 'inline-block',
    },
  },
})
