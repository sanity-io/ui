import {_composeClassNames} from '../../_composeClassNames'
import {_scopeClassNames} from '../../_scopeClassNames'
import {
  border,
  boxSizing,
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
  minHeight,
  minWidth,
  overflow,
  padding,
  pointerEvents,
  position,
  radius,
  textAlign,
  width,
} from '../../aspects'
import type {BoxStyleProps} from './types'

/** @public */
export function box(props: BoxStyleProps): string | undefined {
  return _composeClassNames(
    _scopeClassNames('box', props.muted && 'muted', props.outline && `outline-${props.outline}`),
    border(props),
    boxSizing({boxSizing: props.sizing}),
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
    minHeight(props),
    minWidth(props),
    overflow(props),
    padding(props),
    pointerEvents(props),
    position(props),
    radius(props),
    textAlign(props),
    width(props),
  )
}
