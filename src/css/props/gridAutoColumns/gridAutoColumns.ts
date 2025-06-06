import {_responsiveClassName} from '../../_responsiveClassName'
import {options} from './gridAutoColumns.css'
import type {GridAutoColumnsStyleProps} from './types'

/** @public */
export function gridAutoColumns(props: GridAutoColumnsStyleProps) {
  return _responsiveClassName(options, props.gridAutoColumns ?? props.autoCols)
}
