import {type ExactKeyTuple} from '../../_keys'

/** @public */
export type PointerEvents = 'auto' | 'none'

/** @public */
export interface PointerEventsStyleProps {
  pointerEvents?: PointerEvents
}

/** @internal */
export const POINTER_EVENTS_STYLE_PROP_KEYS = ['pointerEvents'] as const

// assert exact keys
POINTER_EVENTS_STYLE_PROP_KEYS satisfies ExactKeyTuple<
  PointerEventsStyleProps,
  typeof POINTER_EVENTS_STYLE_PROP_KEYS
>
