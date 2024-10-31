import {_resp} from '../../_resp'
import {_scopeClassNames} from '../../_scopeClassNames'
import type {RadiusStyleProps} from './types'

/** @public */
export function radius(props: RadiusStyleProps): string | undefined {
  return _scopeClassNames(_resp('r', props.radius))
}
