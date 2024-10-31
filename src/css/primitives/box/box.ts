import {_resp} from '../../_resp'
import {composeClassNames} from '../../composeClassNames'
import {
  border,
  display,
  flex,
  flexItem,
  gap,
  grid,
  gridItem,
  inset,
  margin,
  maxWidth,
  overflow,
  padding,
  pointerEvents,
  position,
  radius,
  width,
} from '../../styles'
import {BoxStyleProps} from './types'

/** @public */
export function box(props: BoxStyleProps): string | undefined {
  return composeClassNames(
    'box',
    props.muted && 'muted',
    border(props),
    display(props),
    _resp(`h`, props.height),
    _resp(`box`, props.sizing),
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
