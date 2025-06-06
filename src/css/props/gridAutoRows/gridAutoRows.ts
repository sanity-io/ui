import {_responsiveClassName} from '../../_responsiveClassName'
import {options} from './gridAutoRows.css'
import type {GridAutoRowsStyleProps} from './types'

/** @public */
export function gridAutoRows(props: GridAutoRowsStyleProps) {
  return _responsiveClassName(options, props.gridAutoRows ?? props.autoRows)
}
