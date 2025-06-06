import {_responsiveClassName} from '../../_responsiveClassName'
import {options} from './radius.css'
import type {RadiusStyleProps} from './types'

/** @public */
export function radius(props: RadiusStyleProps) {
  return _responsiveClassName(options, props.radius)
}
