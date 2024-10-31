import {composeClassNames} from '../../composeClassNames'
import {PointerEventsStyleProps} from './types'

export function pointerEvents(props: PointerEventsStyleProps): string | undefined {
  return composeClassNames(props.pointerEvents && `pointer-events-${props.pointerEvents}`)
}
