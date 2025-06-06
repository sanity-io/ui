import {_style} from '../../_style.css'
import {layers} from '../../layers.css'

export const options = {
  border: _style(layers.props, {
    boxSizing: 'border-box',
  }),
  content: _style(layers.props, {
    boxSizing: 'content-box',
  }),
} as const
