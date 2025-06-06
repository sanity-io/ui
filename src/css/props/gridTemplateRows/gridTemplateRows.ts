import {_responsiveClassName} from '../../_responsiveClassName'
import {options} from './gridTemplateRows.css'
import type {GridTemplateRowsStyleProps} from './types'

/** @public */
export function gridTemplateRows(props: GridTemplateRowsStyleProps) {
  return _responsiveClassName(options, props.gridTemplateRows ?? props.rows)
}
