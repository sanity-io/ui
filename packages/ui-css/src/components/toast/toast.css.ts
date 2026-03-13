import {_layers} from '../../layers.css'
import {_style} from '../../lib/css/_style.css'

export const layer: string = _style(
  _layers.component,
  {
    position: 'absolute',
    right: 0,
    bottom: 0,
    pointerEvents: 'none',
    // minWidth: `${320 / 16}rem`, // 320px
    maxWidth: `${420 / 16}rem`, // 420px
    width: '100%',
  },
  'layer',
)

export const root: string = _style(
  _layers.component,
  {
    pointerEvents: 'all',
    overflow: ['hidden', 'clip'],
  },
  '',
)
