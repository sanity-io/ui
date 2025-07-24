import {_responsiveClassName} from '../../_responsiveClassName'
import {options} from './minWidth.css'
import type {MinWidthStyleProps} from './types'

/** @public */
export function minWidth(props: MinWidthStyleProps): string | undefined {
  return _responsiveClassName(options, props.minWidth)
}
