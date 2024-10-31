import {_resp} from '../../_resp'
import {_scopeClassNames} from '../../_scopeClassNames'
import type {MaxWidthStyleProps} from './types'

/** @internal */
export function maxWidth(props: MaxWidthStyleProps): string | undefined {
  return _scopeClassNames(_resp('max-w', props.maxWidth) ?? '')
}
