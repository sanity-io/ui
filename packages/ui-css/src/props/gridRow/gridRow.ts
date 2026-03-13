import {_responsiveClassName} from '../../lib/class-names/_responsiveClassName'
import {options} from './gridRow.css'
import type {GridRowStyleProps} from './types'

/** @public */
export function gridRow(props: GridRowStyleProps): string | undefined {
  return _responsiveClassName(options, props.gridRow)
}
