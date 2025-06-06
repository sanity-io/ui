import {_responsiveClassName} from '../../_responsiveClassName'
import {options} from './flex.css'
import type {FlexStyleProps} from './types'

/** @public */
export function flex(props: FlexStyleProps) {
  return _responsiveClassName(options, props.flex)
}
