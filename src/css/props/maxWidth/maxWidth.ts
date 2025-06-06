import {_responsiveClassName} from '../../_responsiveClassName'
import {options} from './maxWidth.css'
import type {MaxWidthStyleProps} from './types'

/** @public */
export function maxWidth(props: MaxWidthStyleProps) {
  return _responsiveClassName(options, props.maxWidth)
}
