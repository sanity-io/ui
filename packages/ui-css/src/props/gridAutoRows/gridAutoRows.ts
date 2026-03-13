import {_responsiveClassName} from '../../lib/class-names/_responsiveClassName'
import {options} from './gridAutoRows.css'
import type {GridAutoRowsStyleProps} from './types'

/** @public */
export function gridAutoRows(props: GridAutoRowsStyleProps): string | undefined {
  return _responsiveClassName(options, props.gridAutoRows)
}
