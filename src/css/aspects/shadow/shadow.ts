import {_resp} from '../../_resp'
import {_scopeClassNames} from '../../_scopeClassNames'
import type {ShadowStyleProps} from './types'

/** @internal */
export function shadow(props: ShadowStyleProps): string | undefined {
  return _scopeClassNames(_resp('shadow', props.shadow))
}
