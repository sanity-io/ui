import {_responsiveClassName} from '../../lib/class-names/_responsiveClassName'
import {options} from './minHeight.css'
import type {MinHeightStyleProps} from './types'

/** @public */
export function minHeight(props: MinHeightStyleProps): string | undefined {
  return _responsiveClassName(options, props.minHeight)
}
