import {_responsiveClassName} from '../../lib/class-names/_responsiveClassName'
import {options} from './gridRowStart.css'
import type {GridRowStartStyleProps} from './types'

/** @public */
export function gridRowStart(props: GridRowStartStyleProps): string | undefined {
  return _responsiveClassName(options, props.gridRowStart)
}
