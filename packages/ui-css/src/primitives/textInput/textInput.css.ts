import {_layers} from '../../layers.css'
import {_globalStyle} from '../../lib/css/_globalStyle.css'
import {_style} from '../../lib/css/_style.css'
import {vars} from '../../vars'

export const root: string = _style(_layers.primitive, {}, '')

export const element: string = _style(
  _layers.primitive,
  {
    display: 'block',
    borderRadius: 'inherit',
    flex: 1,
    position: 'relative',
    width: 'stretch',
  },
  'element',
)

export const prefix: string = _style(
  _layers.primitive,
  {
    backgroundColor: vars.color.bg,
    borderTop: `${vars.input.border.width} solid ${vars.color.border}`,
    borderLeft: `${vars.input.border.width} solid ${vars.color.border}`,
    borderBottom: `${vars.input.border.width} solid ${vars.color.border}`,
    borderTopLeftRadius: 'inherit',
    borderBottomLeftRadius: 'inherit',
    flex: 'none',
  },
  'prefix',
)

_globalStyle(_layers.primitive, `${prefix} > span`, {
  display: 'block',
  margin: `calc(0px - ${vars.input.border.width})`,
  marginRight: 0,
})

export const suffix: string = _style(
  _layers.primitive,
  {
    backgroundColor: vars.color.bg,
    borderTop: `${vars.input.border.width}solid ${vars.color.border}`,
    borderRight: `${vars.input.border.width}solid ${vars.color.border}`,
    borderBottom: `${vars.input.border.width}solid ${vars.color.border}`,
    borderTopRightRadius: 'inherit',
    borderBottomRightRadius: 'inherit',
    flex: 'none',
  },
  'suffix',
)

_globalStyle(_layers.primitive, `${suffix} > span`, {
  display: 'block',
  margin: `calc(0px - ${vars.input.border.width})`,
  marginLeft: 0,
})
