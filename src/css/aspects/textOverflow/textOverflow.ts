import {_scopeClassNames} from '../../_scopeClassNames'
import type {TextOverflowStyleProps} from './types'

/** @internal */
export function textOverflow(props: TextOverflowStyleProps): string | undefined {
  return _scopeClassNames(props.textOverflow && `text-overflow-${props.textOverflow}`)
}
