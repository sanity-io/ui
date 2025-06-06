import {_responsiveClassName} from '../../_responsiveClassName'
import {options} from './overflow.css'
import type {OverflowStyleProps} from './types'

/** @public */
export function overflow(props: OverflowStyleProps) {
  return _responsiveClassName(options, props.overflow)
}
