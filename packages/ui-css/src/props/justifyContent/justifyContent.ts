import {_responsiveClassName} from '../../lib/class-names/_responsiveClassName'
import {options} from './justifyContent.css'
import type {JustifyContentStyleProps} from './types'

/** @public */
export function justifyContent(props: JustifyContentStyleProps): string | undefined {
  return _responsiveClassName(options, props.justifyContent)
}
