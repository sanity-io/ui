import {_resp} from '../../_resp'
import {_scopeClassNames} from '../../_scopeClassNames'
import type {MinWidthStyleProps} from './types'

/** @internal */
export function minWidth(props: MinWidthStyleProps): string | undefined {
  return _scopeClassNames(_resp('min-w', props.minWidth) ?? '')
}
