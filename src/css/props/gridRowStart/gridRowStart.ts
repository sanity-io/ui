import {_responsiveClassName} from '../../_responsiveClassName'
import {options} from './gridRowStart.css'
import type {GridRowStart, GridRowStartStyleProps} from './types'

/** @public */
export function gridRowStart(props: GridRowStartStyleProps) {
  return _responsiveClassName(options, props.gridRowStart ?? (props.rowStart as GridRowStart))
}
