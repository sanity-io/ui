import {_comp} from '../../_comp'
import {TextOverflowStyleProps} from './types'

/** @internal */
export function textOverflow(props: TextOverflowStyleProps): string | undefined {
  return _comp(props.textOverflow && `text-overflow-${props.textOverflow}`)
}
