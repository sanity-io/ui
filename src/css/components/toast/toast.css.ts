import {_style} from '../../_style.css'
import {layers} from '../../layers.css'

export const layer: string = _style(layers.components, {
  position: 'absolute',
  right: 0,
  bottom: 0,
  pointerEvents: 'none',
  // minWidth: `${320 / 16}rem`, // 320px
  maxWidth: `${420 / 16}rem`, // 420px
  width: '100%',
})

export const root: string = _style(layers.components, {
  pointerEvents: 'all',
  overflow: ['hidden', 'clip'],
})
