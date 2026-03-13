import {_responsiveClassName} from '../../lib/class-names/_responsiveClassName'
import {options} from './flex.css'
import type {FlexPropStyleProps} from './types'

/** @public */
export function flexProp(props: FlexPropStyleProps): string | undefined {
  return _responsiveClassName(options, props.flex)
}
