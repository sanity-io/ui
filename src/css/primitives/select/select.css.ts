import {globalStyle} from '@vanilla-extract/css'

import {_style} from '../../_style.css'
import {layers} from '../../layers.css'

export const root = _style(layers.primitives, {})

export const input = _style(layers.primitives, {
  ':disabled': {
    opacity: 1,
  },
})

export const presentation = _style(layers.primitives, {})

globalStyle(`${presentation} > span`, {
  '@layer': {
    [layers.primitives]: {
      position: 'absolute',
      top: 0,
      right: 0,
    },
  },
})
