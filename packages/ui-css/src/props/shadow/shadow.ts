import {_responsiveClassName} from '../../_responsiveClassName'
import {options} from './shadow.css'
import type {ShadowStyleProps} from './types'

/** @public */
export function shadow(props: ShadowStyleProps): string | undefined {
  return _responsiveClassName(options, props.shadow)
}
