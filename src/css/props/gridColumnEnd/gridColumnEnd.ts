import {_responsiveClassName} from '../../_responsiveClassName'
import {options} from './gridColumnEnd.css'
import type {GridColumnEnd, GridColumnEndStyleProps} from './types'

/** @public */
export function gridColumnEnd(props: GridColumnEndStyleProps): string | undefined {
  return _responsiveClassName(options, props.gridColumnEnd ?? (props.columnEnd as GridColumnEnd))
}
