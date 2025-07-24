import {keyframes} from '@vanilla-extract/css'

import {_style} from '../../_style.css'
import {layers} from '../../layers.css'

const spin = keyframes({
  from: {
    transform: 'rotate(0deg)',
  },
  to: {
    transform: 'rotate(360deg)',
  },
})

export const root: string = _style(layers.primitives, {})

export const spinnerIcon: string = _style(layers.primitives, {
  animation: `${spin} 500ms linear infinite`,
})
