import {_resp} from '../../_resp'
import {_scopeClassNames} from '../../_scopeClassNames'
import type {FlexItemStyleProps} from './types'

/** @public */
export function flexItem(props: FlexItemStyleProps): string | undefined {
  return _scopeClassNames(_resp(`f`, props.flex))
}
