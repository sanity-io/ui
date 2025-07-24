import {_responsiveClassName} from '../../_responsiveClassName'
import {options} from './pointerEvents.css'
import type {PointerEventsStyleProps} from './types'

/** @public */
export function pointerEvents(props: PointerEventsStyleProps): string | undefined {
  return _responsiveClassName(options, props.pointerEvents)
}
