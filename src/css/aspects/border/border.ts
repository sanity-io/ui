import {_resp} from '../../_resp'
import {_scopeClassNames} from '../../_scopeClassNames'
import type {BorderStyleProps} from './types'

/** @public */
export function border(props: BorderStyleProps): string | undefined {
  return _scopeClassNames(
    _resp('border', props.border),
    _resp('border-t', props.borderTop),
    _resp('border-r', props.borderRight),
    _resp('border-b', props.borderBottom),
    _resp('border-l', props.borderLeft),
  )
}
