import {_responsiveClassName} from '../../lib/class-names/_responsiveClassName'
import {options} from './gridAutoColumns.css'
import type {GridAutoColumnsStyleProps} from './types'

/** @public */
export function gridAutoColumns(props: GridAutoColumnsStyleProps): string | undefined {
  return _responsiveClassName(options, props.gridAutoColumns)
}
