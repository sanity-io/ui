import {_responsiveClassName} from '../../_responsiveClassName'
import {options} from './gridRow.css'
import type {GridRow, GridRowStyleProps} from './types'

/** @public */
export function gridRow(props: GridRowStyleProps): string | undefined {
  return _responsiveClassName(options, props.gridRow ?? (props.row as GridRow))
}
