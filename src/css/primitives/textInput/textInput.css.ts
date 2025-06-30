import {globalStyle} from '@vanilla-extract/css'

import {_style} from '../../_style.css'
import {layers} from '../../layers.css'
import {vars} from '../../vars.css'

export const root: string = _style(layers.primitives, {})

export const prefix: string = _style(layers.primitives, {
  borderTop: `${vars.input.border.width} solid ${vars.color.border}`,
  borderLeft: `${vars.input.border.width} solid ${vars.color.border}`,
  borderBottom: `${vars.input.border.width} solid ${vars.color.border}`,
  borderTopLeftRadius: 'inherit',
  borderBottomLeftRadius: 'inherit',
})

globalStyle(`${prefix} > span`, {
  [`@layer ${layers.primitives}`]: {
    display: 'block',
    margin: `calc(0 - ${vars.input.border.width})`,
    marginRight: 0,
  },
})

export const element: string = _style(layers.primitives, {
  borderRadius: 'inherit',
})

export const suffix: string = _style(layers.primitives, {
  borderTop: `${vars.input.border.width}solid ${vars.color.border}`,
  borderRight: `${vars.input.border.width}solid ${vars.color.border}`,
  borderBottom: `${vars.input.border.width}solid ${vars.color.border}`,
  borderTopRightRadius: 'inherit',
  borderBottomRightRadius: 'inherit',
})

globalStyle(`${suffix} > span`, {
  [`@layer ${layers.primitives}`]: {
    display: 'block',
    margin: `calc(0 - ${vars.input.border.width})`,
    marginLeft: 0,
  },
})
