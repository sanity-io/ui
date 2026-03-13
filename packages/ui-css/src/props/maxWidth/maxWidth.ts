import {_responsiveClassName} from '../../lib/class-names/_responsiveClassName'
import {options} from './maxWidth.css'
import type {MaxWidthStyleProps} from './types'

/** @public */
export function maxWidth(props: MaxWidthStyleProps): string | undefined {
  return _responsiveClassName(options, props.maxWidth)
}
