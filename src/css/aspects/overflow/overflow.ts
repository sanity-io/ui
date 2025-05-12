import {_resp} from '../../_resp'
import {composeClassNames} from '../../composeClassNames'
import {OverflowStyleProps} from './types'

export function overflow(props: OverflowStyleProps): string | undefined {
  return composeClassNames(
    _resp(`overflow`, props.overflow),
    _resp(`overflow-x`, props.overflowX),
    _resp(`overflow-y`, props.overflowY),
  )
}
