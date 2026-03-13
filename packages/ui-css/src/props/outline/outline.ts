import {_responsiveClassName} from '../../lib/class-names/_responsiveClassName'
import {options} from './outline.css'
import type {OutlineStyleProps} from './types'

/** @public */
export function outline(props: OutlineStyleProps): string | undefined {
  return _responsiveClassName(options, props.outline)
}
