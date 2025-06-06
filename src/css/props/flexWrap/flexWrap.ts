import {_responsiveClassName} from '../../_responsiveClassName'
import {options} from './flexWrap.css'
import type {FlexWrapStyleProps} from './types'

/** @public */
export function flexWrap(props: FlexWrapStyleProps) {
  return _responsiveClassName(options, props.flexWrap)
}
