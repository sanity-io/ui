import {_responsiveClassName} from '../../_responsiveClassName'
import {options} from './minWidth.css'
import type {MinWidthStyleProps} from './types'

/** @public */
export function minWidth(props: MinWidthStyleProps) {
  return _responsiveClassName(options, props.minWidth)
}
