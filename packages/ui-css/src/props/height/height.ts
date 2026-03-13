import {_responsiveClassName} from '../../lib/class-names/_responsiveClassName'
import {options} from './height.css'
import type {HeightStyleProps} from './types'

/** @public */
export function height(props: HeightStyleProps): string | undefined {
  return _responsiveClassName(options, props.height)
}
