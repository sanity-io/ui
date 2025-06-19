import {_responsiveClassName} from '../../_responsiveClassName'
import {options} from './gridAutoFlow.css'
import type {GridAutoFlowStyleProps} from './types'

/** @public */
export function gridAutoFlow(props: GridAutoFlowStyleProps): string | undefined {
  return _responsiveClassName(options, props.gridAutoFlow ?? props.autoFlow)
}
