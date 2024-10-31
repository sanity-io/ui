import {_resp} from '../../_resp'
import {_scopeClassNames} from '../../_scopeClassNames'
import type {TextAlignStyleProps} from './types'

/** @public */
export function textAlign(props: TextAlignStyleProps): string | undefined {
  return _scopeClassNames(_resp('text-align', props.textAlign))
}
