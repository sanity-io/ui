import {_style} from '../../_style.css'
import {_layers} from '../../layers.css'
import type {BoxSizing} from './types'

export const options: Record<BoxSizing, string> = {
  border: _style(_layers.prop, {boxSizing: 'border-box'}, 'border'),
  content: _style(_layers.prop, {boxSizing: 'content-box'}, 'content'),
} as const
