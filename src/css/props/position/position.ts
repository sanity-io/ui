import {_responsiveClassName} from '../../_responsiveClassName'
import {options} from './position.css'
import type {PositionStyleProps} from './types'

/** @public */
export function position(props: PositionStyleProps): string | undefined {
  return _responsiveClassName(options, props.position)
}
