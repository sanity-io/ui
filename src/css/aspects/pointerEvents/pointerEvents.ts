import {_scopeClassNames} from '../../_scopeClassNames'
import type {PointerEventsStyleProps} from './types'

/** @internal */
export function pointerEvents(props: PointerEventsStyleProps): string | undefined {
  return _scopeClassNames(props.pointerEvents && `pointer-events-${props.pointerEvents}`)
}
