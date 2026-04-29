import {globalStyle} from '@vanilla-extract/css'

import {_layers} from '../../layers.css'
import {_style} from '../../lib/css/_style.css'
import {vars} from '../../vars'

export const root = _style(
  _layers.primitive,
  {
    selectors: {'&:not([hidden])': {display: 'block'}},
  },
  '',
)

export const input = _style(_layers.primitive, {':disabled': {opacity: 1}}, 'input')

export const presentation = _style(_layers.primitive, {}, 'presentation')

globalStyle(`${presentation} > span`, {
  '@layer': {
    [_layers.primitive]: {
      display: 'flex',
      position: 'absolute',
      top: vars.input.padding,
      right: vars.input.padding,
    },
  },
})
