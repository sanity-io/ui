import {_responsiveClassName} from '../../_responsiveClassName'
import {options} from './gridTemplateColumns.css'
import type {GridTemplateColumnsStyleProps} from './types'

/** @public */
export function gridTemplateColumns(props: GridTemplateColumnsStyleProps) {
  return _responsiveClassName(options, props.gridTemplateColumns ?? props.columns)
}
