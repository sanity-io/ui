import {_responsiveClassName} from '../../lib/class-names/_responsiveClassName'
import {options} from './textAlign.css'
import type {TextAlignStyleProps} from './types'

/** @public */
export function textAlign(props: TextAlignStyleProps): string | undefined {
  return _responsiveClassName(options, props.textAlign)
}
