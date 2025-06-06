import {_responsiveClassName} from '../../_responsiveClassName'
import {options} from './gridRowEnd.css'
import type {GridRowEnd, GridRowEndStyleProps} from './types'

/** @public */
export function gridRowEnd(props: GridRowEndStyleProps) {
  return _responsiveClassName(options, props.gridRowEnd ?? (props.rowEnd as GridRowEnd))
}
