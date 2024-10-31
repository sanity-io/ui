import {_resp} from '../../_resp'
import {_scopeClassNames} from '../../_scopeClassNames'
import type {GapStyleProps} from './types'

/** @public */
export function gap(props: GapStyleProps): string | undefined {
  return _scopeClassNames(_resp(`g`, props.gap), _resp(`gx`, props.gapX), _resp(`gy`, props.gapY))
}
