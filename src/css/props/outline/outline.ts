import {_responsiveClassName} from '../../_responsiveClassName'
import {options} from './outline.css'
import type {OutlineStyleProps} from './types'

/** @public */
export function outline(props: OutlineStyleProps) {
  return _responsiveClassName(options, props.outline)
}
