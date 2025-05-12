import {_comp} from '../../_comp'
import {_resp} from '../../_resp'
import {
  border,
  display,
  flex,
  flexItem,
  gap,
  grid,
  gridItem,
  height,
  inset,
  margin,
  maxWidth,
  overflow,
  padding,
  pointerEvents,
  position,
  radius,
  width,
} from '../../aspects'
import {BoxStyleProps} from './types'

/** @public */
export function box(props: BoxStyleProps): string | undefined {
  return _comp(
    'box',
    props.muted && 'muted', // todo: consider this naming

    _resp(`box`, props.sizing),
    border(props),
    display(props),
    height(props),
    flex(props),
    flexItem(props),
    grid(props),
    gridItem(props),
    gap(props),
    inset(props),
    margin(props),
    maxWidth(props),
    props.outline && `outline-${props.outline}`,
    overflow(props),
    padding(props),
    pointerEvents(props),
    position(props),
    radius(props),
    width(props),
  )
}
