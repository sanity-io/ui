import {_responsiveClassName} from '../../_responsiveClassName'
import {options} from './gridRowEnd.css'
import type {GridRowEndStyleProps} from './types'

/** @public */
export function gridRowEnd(props: GridRowEndStyleProps): string | undefined {
  return _responsiveClassName(options, props.gridRowEnd)
}
