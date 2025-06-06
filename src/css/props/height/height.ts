import {_responsiveClassName} from '../../_responsiveClassName'
import {options} from './height.css'
import type {HeightStyleProps} from './types'

/** @public */
export function height(props: HeightStyleProps) {
  return _responsiveClassName(options, props.height)
}
