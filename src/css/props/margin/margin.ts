import {_composeClassNames} from '../../_composeClassNames'
import {_responsiveClassName} from '../../_responsiveClassName'
import {
  marginBottomOptions,
  marginLeftOptions,
  marginOptions,
  marginRightOptions,
  marginTopOptions,
  marginXOptions,
  marginYOptions,
} from './margin.css'
import type {MarginStyleProps} from './types'

/** @public */
export function margin(props: MarginStyleProps) {
  return _composeClassNames(
    _responsiveClassName(marginOptions, props.margin),
    _responsiveClassName(marginXOptions, props.marginX),
    _responsiveClassName(marginYOptions, props.marginY),
    _responsiveClassName(marginTopOptions, props.marginTop),
    _responsiveClassName(marginRightOptions, props.marginRight),
    _responsiveClassName(marginBottomOptions, props.marginBottom),
    _responsiveClassName(marginLeftOptions, props.marginLeft),
  )
}
