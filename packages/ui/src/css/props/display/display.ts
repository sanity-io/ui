import {_responsiveClassName} from '../../_responsiveClassName'
import {options} from './display.css'
import type {DisplayStyleProps} from './types'

/** @public */
export function display(props: DisplayStyleProps): string | undefined {
  return _responsiveClassName(options, props.display)
}
