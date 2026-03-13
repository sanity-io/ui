import {_responsiveClassName} from '../../lib/class-names/_responsiveClassName'
import {options} from './gridColumnEnd.css'
import type {GridColumnEndStyleProps} from './types'

/** @public */
export function gridColumnEnd(props: GridColumnEndStyleProps): string | undefined {
  return _responsiveClassName(options, props.gridColumnEnd)
}
