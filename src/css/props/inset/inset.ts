import {_composeClassNames} from '../../_composeClassNames'
import {_responsiveClassName} from '../../_responsiveClassName'
import {
  insetBottomOptions,
  insetLeftOptions,
  insetOptions,
  insetRightOptions,
  insetTopOptions,
} from './inset.css'
import type {InsetStyleProps} from './types'

/** @public */
export function inset(props: InsetStyleProps) {
  return _composeClassNames(
    _responsiveClassName(insetOptions, props.inset),
    _responsiveClassName(insetTopOptions, props.insetTop),
    _responsiveClassName(insetRightOptions, props.insetRight),
    _responsiveClassName(insetBottomOptions, props.insetBottom),
    _responsiveClassName(insetLeftOptions, props.insetLeft),
  )
}
