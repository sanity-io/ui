import {keyframes} from '@vanilla-extract/css'

import {_style} from '../../_style.css'
import {layers} from '../../layers.css'

const spin = keyframes({
  // '@layer': {
  //   [layers.primitives]: {
  from: {
    transform: 'rotate(0deg)',
  },
  to: {
    transform: 'rotate(360deg)',
  },
  //   },
  // },
})

export const root = _style(layers.primitives, {})

export const spinnerIcon = _style(layers.primitives, {
  animation: `${spin} 500ms linear infinite`,
})
