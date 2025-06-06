import {_responsiveClassName} from '../../_responsiveClassName'
import {options} from './textAlign.css'
import type {TextAlignStyleProps} from './types'

/** @public */
export function textAlign(props: TextAlignStyleProps) {
  return _responsiveClassName(options, props.textAlign)
}
