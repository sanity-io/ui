import {_responsiveClassName} from '../../_responsiveClassName'
import {options} from './minHeight.css'
import type {MinHeightStyleProps} from './types'

/** @public */
export function minHeight(props: MinHeightStyleProps) {
  return _responsiveClassName(options, props.minHeight)
}
