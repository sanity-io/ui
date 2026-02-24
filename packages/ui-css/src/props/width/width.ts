import {_responsiveClassName} from '../../_responsiveClassName'
import type {WidthStyleProps} from './types'
import {options} from './width.css'

/** @public */
export function width(props: WidthStyleProps): string | undefined {
  return _responsiveClassName(options, props.width)
}
