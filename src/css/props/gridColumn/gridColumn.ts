import {_responsiveClassName} from '../../_responsiveClassName'
import {options} from './gridColumn.css'
import type {GridColumn, GridColumnStyleProps} from './types'

/** @public */
export function gridColumn(props: GridColumnStyleProps) {
  return _responsiveClassName(options, props.gridColumn ?? (props.column as GridColumn))
}
