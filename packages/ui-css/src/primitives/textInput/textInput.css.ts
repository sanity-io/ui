import {globalStyle} from '@vanilla-extract/css'

import {_style} from '../../_style.css'
import {layers} from '../../layers.css'
import {vars} from '../../vars.css'

export const root: string = _style(layers.primitives, {
  selectors: {
    '&:not([hidden])': {
      display: 'flex',
    },
  },
})

export const prefix: string = _style(layers.primitives, {
  borderTop: `${vars.input.border.width} solid ${vars.color.border}`,
  borderLeft: `${vars.input.border.width} solid ${vars.color.border}`,
  borderBottom: `${vars.input.border.width} solid ${vars.color.border}`,
  borderTopLeftRadius: 'inherit',
  borderBottomLeftRadius: 'inherit',
  flex: 'none',
})

globalStyle(`${prefix} > span`, {
  [`@layer ${layers.primitives}`]: {
    display: 'block',
    margin: `calc(0px - ${vars.input.border.width})`,
    marginRight: 0,
  },
})

export const element: string = _style(layers.primitives, {
  display: 'block',
  borderRadius: 'inherit',
  flex: 1,
  position: 'relative',
  width: 'stretch',
})

export const suffix: string = _style(layers.primitives, {
  borderTop: `${vars.input.border.width}solid ${vars.color.border}`,
  borderRight: `${vars.input.border.width}solid ${vars.color.border}`,
  borderBottom: `${vars.input.border.width}solid ${vars.color.border}`,
  borderTopRightRadius: 'inherit',
  borderBottomRightRadius: 'inherit',
  flex: 'none',
})

globalStyle(`${suffix} > span`, {
  [`@layer ${layers.primitives}`]: {
    display: 'block',
    margin: `calc(0px - ${vars.input.border.width})`,
    marginLeft: 0,
  },
})
