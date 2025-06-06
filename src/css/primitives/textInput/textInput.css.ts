import {globalStyle} from '@vanilla-extract/css'

import {_style} from '../../_style.css'
import {layers} from '../../layers.css'
import {vars} from '../../vars.css'

export const root = _style(layers.primitives, {})

export const prefix = _style(layers.primitives, {
  borderTop: `1px solid ${vars.color.border}`,
  borderLeft: `1px solid ${vars.color.border}`,
  borderBottom: `1px solid ${vars.color.border}`,
  borderTopLeftRadius: 'inherit',
  borderBottomLeftRadius: 'inherit',
})

globalStyle(`${prefix} > span`, {
  [`@layer ${layers.primitives}`]: {
    display: 'block',
    margin: '-1px',
  },
})

export const element = _style(layers.primitives, {
  borderRadius: 'inherit',
})

export const suffix = _style(layers.primitives, {
  borderTop: `1px solid ${vars.color.border}`,
  borderRight: `1px solid ${vars.color.border}`,
  borderBottom: `1px solid ${vars.color.border}`,
  borderTopRightRadius: 'inherit',
  borderBottomRightRadius: 'inherit',
})

globalStyle(`${suffix} > span`, {
  [`@layer ${layers.primitives}`]: {
    display: 'block',
    margin: '-1px',
  },
})
