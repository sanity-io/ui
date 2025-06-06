import {_responsiveClassName} from '../../_responsiveClassName'
import {options} from './gridColumnStart.css'
import type {GridColumnStart, GridColumnStartStyleProps} from './types'

/** @public */
export function gridColumnStart(props: GridColumnStartStyleProps) {
  return _responsiveClassName(
    options,
    props.gridColumnStart ?? (props.columnStart as GridColumnStart),
  )
}
