import {_resp} from '../../_resp'
import {_scopeClassNames} from '../../_scopeClassNames'
import type {OverflowStyleProps} from './types'

/** @internal */
export function overflow(props: OverflowStyleProps): string | undefined {
  return _scopeClassNames(
    _resp(`overflow`, props.overflow),
    _resp(`overflow-x`, props.overflowX),
    _resp(`overflow-y`, props.overflowY),
  )
}
