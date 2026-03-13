import {_responsiveClassName} from '../../lib/class-names/_responsiveClassName'
import {options} from './gridColumn.css'
import type {GridColumnStyleProps} from './types'

/** @public */
export function gridColumn(props: GridColumnStyleProps): string | undefined {
  return _responsiveClassName(options, props.gridColumn)
}
