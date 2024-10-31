import {_resp} from '../../_resp'
import {_scopeClassNames} from '../../_scopeClassNames'
import type {PositionStyleProps} from './types'

/** @internal */
export function position(props: PositionStyleProps): string | undefined {
  return _scopeClassNames(_resp('position', props.position))
}
