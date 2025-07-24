import {_style} from '../../_style.css'
import {layers} from '../../layers.css'
import type {BoxSizing} from './types'

export const options: Record<BoxSizing, string> = {
  border: _style(layers.props, {
    boxSizing: 'border-box',
  }),
  content: _style(layers.props, {
    boxSizing: 'content-box',
  }),
} as const
