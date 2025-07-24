import {_responsiveClassName} from '../../_responsiveClassName'
import {options} from './textOverflow.css'
import type {TextOverflowStyleProps} from './types'

/** @public */
export function textOverflow(props: TextOverflowStyleProps): string | undefined {
  return _responsiveClassName(options, props.textOverflow)
}
