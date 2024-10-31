import {_resp} from '../../_resp'
import {_scopeClassNames} from '../../_scopeClassNames'
import type {WidthStyleProps} from './types'

/** @internal */
export function width(props: WidthStyleProps): string | undefined {
  return _scopeClassNames(_resp('w', props.width) ?? '')
}
