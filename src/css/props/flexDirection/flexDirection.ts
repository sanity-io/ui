import {_responsiveClassName} from '../../_responsiveClassName'
import {options} from './flexDirection.css'
import type {FlexDirectionStyleProps} from './types'

/** @public */
export function flexDirection(props: FlexDirectionStyleProps) {
  return _responsiveClassName(options, props.flexDirection)
}
