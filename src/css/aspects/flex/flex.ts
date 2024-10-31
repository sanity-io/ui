import {_resp} from '../../_resp'
import {_scopeClassNames} from '../../_scopeClassNames'
import type {FlexStyleProps} from './types'

/** @public */
export function flex(props: FlexStyleProps): string | undefined {
  return _scopeClassNames(
    _resp('flex-align', props.align),
    _resp('f', props.direction),
    _resp('flex-justify', props.justify),
    _resp('flex', props.wrap),
  )
}
