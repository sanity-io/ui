import {_resp} from '../../_resp'
import {_scopeClassNames} from '../../_scopeClassNames'
import type {MinHeightStyleProps} from './types'

/** @internal */
export function minHeight(props: MinHeightStyleProps): string | undefined {
  return _scopeClassNames(_resp('min-h', props.minHeight) ?? '')
}
